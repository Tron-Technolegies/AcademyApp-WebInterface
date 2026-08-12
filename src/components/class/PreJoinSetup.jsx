import AgoraRTC from "agora-rtc-sdk-ng";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function PreJoinSetup({ onJoin }) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [previewTrack, setPreviewTrack] = useState(null);
  const [permissionError, setPermissionError] = useState(null);

  const videoRef = useRef(null);

  //start a camera preview only
  useEffect(() => {
    let track;
    let cancelled = false;
    async function startPreview() {
      if (!videoEnabled) {
        setPreviewTrack((prev) => {
          prev?.close();
          return null;
        });
        return;
      }
      try {
        track = await AgoraRTC.createCameraVideoTrack();
        if (cancelled) {
          track.close();
          return;
        }
        setPreviewTrack(track);
        setPermissionError(null);
      } catch (error) {
        console.log("Camera Preview failed:", error);
        const msg = "Couldn't access camera. Check browser permissions.";
        toast.error(msg);
        setPermissionError(msg);
        setVideoEnabled(false);
      }
    }
    startPreview();
    return () => {
      cancelled = true;
      track?.close();
    };
  }, [videoEnabled]);

  useEffect(() => {
    if (previewTrack && videoRef.current) {
      previewTrack.play(videoRef.current);
    }
  }, [previewTrack]);

  const handleJoin = () => {
    previewTrack?.close();
    onJoin({ audio: audioEnabled, video: videoEnabled });
  };
  return (
    <div className="max-w-md mx-auto p-6 rounded-lg border">
      <h2 className="text-lg font-semibold mb-4">Ready to join?</h2>
      <div className="aspect-video bg-gray-900 rounded mb-4 flex items-center justify-center overflow-hidden">
        {videoEnabled ? (
          <div ref={videoRef} className="w-full h-full" />
        ) : (
          <VideoOff className="text-gray-500" size={32} />
        )}
      </div>

      {permissionError && (
        <p className="text-sm text-red-600 mb-3">{permissionError}</p>
      )}

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setAudioEnabled((v) => !v)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded border ${
            audioEnabled
              ? "bg-blue-50 border-blue-500 text-blue-700"
              : "bg-gray-50 border-gray-300 text-gray-500"
          }`}
        >
          {audioEnabled ? <Mic size={18} /> : <MicOff size={18} />}
          {audioEnabled ? "Mic on" : "Mic off"}
        </button>

        <button
          onClick={() => setVideoEnabled((v) => !v)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded border ${
            videoEnabled
              ? "bg-blue-50 border-blue-500 text-blue-700"
              : "bg-gray-50 border-gray-300 text-gray-500"
          }`}
        >
          {videoEnabled ? <Video size={18} /> : <VideoOff size={18} />}
          {videoEnabled ? "Camera on" : "Camera off"}
        </button>
      </div>

      <button
        onClick={handleJoin}
        className="w-full py-2 rounded bg-blue-600 text-white font-medium"
      >
        Join Class
      </button>
    </div>
  );
}
