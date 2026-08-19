import React, { useContext, useEffect, useRef, useState } from "react";
import { useAgoraClass } from "../../../hooks/class/useAgoraClass";
import PreJoinSetup from "./PreJoinSetup";
import {
  Maximize,
  Mic,
  MicOff,
  Minimize,
  MonitorUp,
  MonitorX,
  Video,
  VideoOff,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useEndClass } from "../../../hooks/class/useClass";
import useFullScreen from "../../../hooks/class/useFullScreen";

export default function LiveClassRoom() {
  const { classId } = useParams();
  const { user } = useContext(UserContext);
  const { isPending, mutateAsync } = useEndClass();
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
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
  } = useAgoraClass(classId);
  const [audioOn, setAudioOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const localVideoRef = useRef(null);
  const roomContainerRef = useRef(null);

  const { isFullscreen, toggleFullScreen } = useFullScreen(roomContainerRef);

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

  const handleToggleScreenShare = () => {
    isScreenSharing ? stopScreenShare() : startScreenShare();
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
    <div className="bg-white p-4" ref={roomContainerRef}>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative aspect-video bg-black rounded overflow-hidden">
          {videoOn ? (
            <div ref={localVideoRef} className="w-full h-full" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <VideoOff size={32} />
            </div>
          )}
          {isScreenSharing && (
            <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              Sharing screen
            </span>
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
        <div className="ml-auto flex gap-2 items-center">
          {user?.role === "teacher" && (
            <button
              onClick={async () => {
                await mutateAsync(classId);
                leave();
              }}
              disabled={isPending}
              className=" px-4 py-2 rounded bg-red-600 text-white"
            >
              End Class
            </button>
          )}
          <button
            onClick={handleToggleScreenShare}
            className={`p-2 rounded border ${isScreenSharing ? "bg-blue-50 border-blue-500 text-blue-700" : ""}`}
          >
            {isScreenSharing ? <MonitorX size={18} /> : <MonitorUp size={18} />}
          </button>
          <button onClick={toggleFullScreen} className="p-2 rounded border">
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
          <button
            onClick={leave}
            className=" px-4 py-2 rounded bg-red-600 text-white"
          >
            Leave Class
          </button>
        </div>
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
