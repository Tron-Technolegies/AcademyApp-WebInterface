import { useCallback, useRef, useState } from "react";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import AgoraRTC from "agora-rtc-sdk-ng";

export const useAgoraClass = (classId) => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const screenTrackRef = useRef(null);
  const clientRef = useRef(null);
  const localTracksRef = useRef({ audio: null, video: null });

  const startScreenShare = useCallback(async () => {
    if (isScreenSharing) return;
    try {
      const screenTrack = await AgoraRTC.createScreenVideoTrack(
        {
          encoderConfig: "1080p_1",
        },
        "auto", // "auto" | "disable" — whether to also capture system audio if the browser offers it
      );
      // createScreenVideoTrack can return [videoTrack, audioTrack] if audio was included
      const screenVideoTrack = Array.isArray(screenTrack)
        ? screenTrack[0]
        : screenTrack;
      const screenAudioTrack = Array.isArray(screenTrack)
        ? screenTrack[1]
        : null;
      // Unpublish the camera track (if any) so we don't have two video tracks live
      const { video: cameraTrack } = localTracksRef.current;
      if (cameraTrack) {
        await clientRef.current?.unpublish([cameraTrack]);
      }
      await clientRef?.current?.publish(
        screenAudioTrack
          ? [screenVideoTrack, screenAudioTrack]
          : [screenVideoTrack],
      );
      screenTrackRef.current = {
        video: screenVideoTrack,
        audio: screenAudioTrack,
      };
      setIsScreenSharing(true);
      screenVideoTrack.on("track-ended", () => {
        stopScreenShare();
      });
    } catch (error) {
      console.error("Screen share failed:", error);
      // Most common cause: user cancelled the share picker — not a real error, skip toast
      if (error.message !== "Permission denied") {
        toast.error("Couldn't start screen sharing.");
      }
    }
  }, [isScreenSharing]);

  const stopScreenShare = useCallback(async () => {
    const { video, audio } = screenTrackRef.current || {};
    if (!video) return;

    await clientRef.current?.unpublish(audio ? [video, audio] : [video]);
    video.close();
    audio?.close();
    screenTrackRef.current = null;
    setIsScreenSharing(false);

    // Republish the camera track if the user still has video enabled
    const { video: cameraTrack } = localTracksRef.current;
    if (cameraTrack) {
      await clientRef.current?.publish([cameraTrack]);
    }
  }, []);

  const join = useCallback(
    async (mediaPrefs = { audio: true, video: true }) => {
      setStatus("joining");
      setError(null);
      let sessionData;
      try {
        const res = await api.post(`/class/joinClass/${classId}`);
        sessionData = res.data;
      } catch (error) {
        const msg =
          error.response.data.error ||
          error.response.data.msg ||
          error.response.data.message ||
          "Failed to join class";
        toast.error(msg);
        setError(msg);
        setStatus("error");
        return;
      }
      const { token, channelName, account, role } = sessionData;
      const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      clientRef.current = client;

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        setRemoteUsers((prev) => {
          const exists = prev.find((u) => u.uid === user.uid);
          return exists
            ? prev.map((u) => (u.uid === user.uid ? user : u))
            : [...prev, user];
        });
      });

      client.on("user-unpublished", (user) => {
        setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
      });

      client.on("user-left", (user) => {
        setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
      });

      try {
        const appID = import.meta.env.VITE_AGORA_APP_ID;
        await client.join(appID, channelName, token, account);
        const tracksToPublish = [];

        if (mediaPrefs.audio) {
          const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
          localTracksRef.current.audio = audioTrack;
          tracksToPublish.push(audioTrack);
        }
        if (mediaPrefs.video) {
          const videoTrack = await AgoraRTC.createCameraVideoTrack();
          localTracksRef.current.video = videoTrack;
          tracksToPublish.push(videoTrack);
        }
        if (tracksToPublish.length > 0) {
          await client.publish(tracksToPublish);
        }
        setStatus("joined");
      } catch (error) {
        console.log("Agora join failed:", error);
        const msg =
          "Could not connect to the class. Check your camera/mic permissions and try again";
        toast.error(msg);
        setError(error);
      }
    },
    [classId],
  );
  const toggleAudio = useCallback(async (enabled) => {
    const { audio } = localTracksRef.current;
    if (enabled && !audio) {
      const newTrack = await AgoraRTC.createMicrophoneAudioTrack();
      localTracksRef.current.audio = newTrack;
      await clientRef.current?.publish([newTrack]);
    } else if (!enabled && audio) {
      await clientRef.current?.unpublish([audio]);
      audio.close();
      localTracksRef.current.audio = null;
    }
  }, []);

  const toggleVideo = useCallback(async (enabled) => {
    const { video } = localTracksRef.current;
    if (enabled && !video) {
      const newTrack = await AgoraRTC.createCameraVideoTrack();
      localTracksRef.current.video = newTrack;
      await clientRef.current?.publish([newTrack]);
    } else if (!enabled && video) {
      await clientRef.current?.unpublish([video]);
      video.close();
      localTracksRef.current.video = null;
    }
  }, []);

  const leave = useCallback(async () => {
    const { audio, video } = localTracksRef.current;
    audio?.close();
    video?.close();
    screenTrackRef.current?.video?.close();
    screenTrackRef.current?.audio?.close();
    localTracksRef.current = { audio: null, video: null };
    screenTrackRef.current = null;
    setIsScreenSharing(false);
    await clientRef.current?.leave();
    setRemoteUsers([]);
    setStatus("idle");
  }, []);

  return {
    status,
    error,
    remoteUsers,
    localAudioTrack: localTracksRef.current.audio,
    localVideoTrack: localTracksRef.current.video,
    join,
    leave,
    toggleAudio,
    toggleVideo,
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
  };
};
