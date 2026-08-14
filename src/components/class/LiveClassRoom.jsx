import React, { useEffect, useRef, useState } from "react";
import { useAgoraClass } from "../../../hooks/class/useAgoraClass";
import PreJoinSetup from "./PreJoinSetup";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useParams } from "react-router-dom";

export default function LiveClassRoom() {
  const { classId } = useParams();
  const {
    status,
    error,
    remoteUsers,
    localAudioTrack,
    localVideoTrack,
    join,
    leave,
    toggleAudio,
    toggleVideo,
  } = useAgoraClass(classId);
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const localVideoRef = useRef(null);

  useEffect(() => {
    if (localVideoTrack && localVideoRef.current) {
      localVideoTrack.play(localVideoRef.current);
    }
  }, [localVideoTrack]);

  useEffect(() => {
    return () => {
      if (status === "joined") leave();
    };
  }, []);

  const handleJoin = async (prefs) => {
    setAudioOn(prefs.audio);
    setVideoOn(prefs.video);
    await join(prefs);
  };

  const handleToggleAudio = async () => {
    await toggleAudio(!audioOn);
    setAudioOn((v) => !v);
  };

  const handleToggleVideo = async () => {
    await toggleVideo(!videoOn);
    setVideoOn((v) => !v);
  };

  if (status === "idle") {
    return <PreJoinSetup onJoin={handleJoin} />;
  }

  if (status === "joining") {
    return <p>Connecting to class..</p>;
  }

  if (status === "error") {
    return (
      <div className="text-red-600">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 underline"
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative aspect-video bg-black rounded overflow-hidden">
          {videoOn ? (
            <div ref={localVideoRef} className="w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <VideoOff size={32} />
            </div>
          )}
        </div>
        {remoteUsers.map((user) => (
          <RemoteVideo key={user.uid} user={user} />
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <button onClick={handleToggleAudio} className="p-2 rounded border">
          {audioOn ? <Mic size={18} /> : <MicOff size={18} />}
        </button>
        <button onClick={handleToggleVideo} className="p-2 rounded border">
          {videoOn ? <Video size={18} /> : <VideoOff size={18} />}
        </button>
        <button
          onClick={leave}
          className="ml-auto px-4 py-2 rounded bg-red-600 text-white"
        >
          Leave Class
        </button>
      </div>
    </div>
  );
}

function RemoteVideo({ user }) {
  const ref = useRef(null);

  useEffect(() => {
    if (user.videoTrack && ref.current) {
      user.videoTrack.play(ref.current);
    }
    if (user.audioTrack) {
      user.audioTrack.play();
    }
  }, [user]);

  return <div ref={ref} className="aspect-video bg-black rounded" />;
}
