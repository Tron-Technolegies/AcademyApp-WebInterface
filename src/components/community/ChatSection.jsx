import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  MdAttachFile,
  MdImage,
  MdMic,
  MdOutlineChat,
  MdSend,
  MdStop,
} from "react-icons/md";
import { UserContext } from "../../UserContext";
import { useChatSocket } from "../../../hooks/community/useChatSocket";
import { useVoiceRecorder } from "../../../hooks/community/useVoiceRecorder";

export default function ChatSection({ chatRoom, onOpen }) {
  const { user } = useContext(UserContext);
  const chatRoomId = chatRoom?._id;
  const {
    messages,
    sendFile,
    sendImage,
    sendText,
    sendVoice,
    lastReadMessageId,
    markAsRead,
  } = useChatSocket({
    chatRoomId,
    user,
  });
  const { isRecording, startRecording, stopRecording } = useVoiceRecorder();
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const unreadDividerRef = useRef(null);
  const hasScrolledRef = useRef(false);

  const firstUnreadIndex = useMemo(() => {
    if (!lastReadMessageId) return messages.length === 0 ? -1 : 0;
    const idx = messages.findIndex((m) => m._id === lastReadMessageId);
    return idx === -1 ? -1 : idx + 1;
  }, [messages, lastReadMessageId]);

  useEffect(() => {
    hasScrolledRef.current = false;
  }, [chatRoomId]);
  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ behaviour: "smooth" });
  // }, [messages]);

  useEffect(() => {
    if (hasScrolledRef.current || messages.length === 0) return;
    hasScrolledRef.current = true;
    const target =
      firstUnreadIndex > 0 ? unreadDividerRef.current : bottomRef.current;
    target?.scrollIntoView({ behavior: "auto", block: "start" });
  }, [messages, firstUnreadIndex]);

  useEffect(() => {
    if (!messages.length) return;
    const lastMsg = messages[messages.length - 1];
    markAsRead(lastMsg._id);
    onOpen?.();
  }, [messages, markAsRead, onOpen]);

  // ChatSection.jsx — helper functions (add above the component or inside, before return)

  const getSenderName = (user) => {
    if (!user || typeof user !== "object") return "Unknown";
    return user.firstName || user.name || user.username || "Unknown";
  };

  const getInitial = (user) => {
    const name = getSenderName(user);
    return name.charAt(0).toUpperCase();
  };

  const formatTime = (msg) => {
    const raw = msg.timestamp || msg.createdAt || msg.timeStamp;
    if (!raw) return "";
    const date = new Date(raw);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // deterministic color per user so avatars aren't all the same color
  const avatarColors = [
    "bg-pink-400",
    "bg-purple-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-500",
    "bg-orange-400",
    "bg-teal-400",
    "bg-red-400",
  ];
  const getAvatarColor = (user) => {
    const name = getSenderName(user);
    const idx = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[idx];
  };

  if (!chatRoom) {
    return (
      <div>
        <div className="p-3 flex flex-col gap-5 justify-center font-plus items-center h-full">
          <MdOutlineChat size={40} />
          <p>Enter a Chat Room</p>
        </div>
      </div>
    );
  }

  const handleSendText = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendText(text.trim());
    setText("");
  };

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (file) sendImage(file);
    e.target.value = "";
  };

  const handleFilePick = (e) => {
    const file = e.target.files?.[0];
    if (file) sendFile(file);
    e.target.value = "";
  };

  const handleMicClick = async () => {
    if (!isRecording) {
      await startRecording();
    } else {
      const blob = await stopRecording();
      if (blob) sendVoice(blob);
    }
  };

  const isMine = (msg) => msg.user?._id === user?._id || msg.user === user?._id;
  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto scrollbar-none p-5 flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-center text-gray-400">No Messages yet</p>
        )}
        {messages.map((msg, i) => (
          <React.Fragment key={msg._id}>
            {i === firstUnreadIndex && i !== 0 && (
              <div
                ref={unreadDividerRef}
                className="flex items-center gap-2 my-2"
              >
                <div className="flex-1 h-px bg-red-300"></div>
                <span className="text-xs text-red-500 font-medium">
                  Unread Messages
                </span>
                <div className="flex-1 h-px bg-red-300"></div>
              </div>
            )}

            <div
              className={`flex items-end gap-2 max-w-[70%] ${isMine(msg) ? "self-end flex-row-reverse" : "self-start"}`}
            >
              {/* Avatar - only for others' messages */}
              {!isMine(msg) && (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0 ${getAvatarColor(msg.user)}`}
                >
                  {getInitial(msg.user)}
                </div>
              )}

              <div className="flex flex-col gap-1">
                {/* Name - only for others' messages */}
                {!isMine(msg) && (
                  <span className="text-xs font-medium text-gray-500 px-1">
                    {getSenderName(msg.user)}
                  </span>
                )}

                <div
                  className={`px-4 py-2 rounded-lg ${isMine(msg) ? "bg-[#FBA3FF] text-[#252525]" : "bg-gray-100 text-[#252525]"}`}
                >
                  {msg.type === "text" && <p>{msg.message}</p>}
                  {msg.type === "image" && (
                    <img
                      src={msg.imageUrl}
                      alt="chat-img"
                      className="max-w-55 object-cover rounded"
                    />
                  )}
                  {msg.type === "audio" && (
                    <audio controls src={msg.audioUrl} className="max-w-55" />
                  )}
                  {msg.type === "file" && (
                    <a
                      href={msg.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline flex items-center gap-2"
                    >
                      <MdAttachFile /> {msg.fileName}
                    </a>
                  )}
                </div>

                {/* Timestamp */}
                <span
                  className={`text-[10px] text-gray-400 px-1 ${isMine(msg) ? "text-right" : "text-left"}`}
                >
                  {formatTime(msg)}
                </span>
              </div>
            </div>
          </React.Fragment>
        ))}
        <div ref={bottomRef}></div>
      </div>
      {/* Input Bar */}
      <form
        className="p-3 border-t border-[#E5E5EA] flex items-center gap-2"
        onSubmit={handleSendText}
      >
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className="p-2 cursor-pointer text-gray-500"
        >
          <MdImage size={22} />
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImagePick}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 cursor-pointer text-gray-500"
        >
          <MdAttachFile size={22} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFilePick}
        />
        <button
          type="button"
          onClick={handleMicClick}
          className={`p-2 cursor-pointer ${isRecording ? "text-red-500" : "text-gray-500"}`}
        >
          {isRecording ? <MdStop size={22} /> : <MdMic size={22} />}
        </button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border border-[#E5E5EA] rounded-full px-4 py-2 outline-none"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="p-2 cursor-pointer text-[#FBA3FF]"
        >
          <MdSend size={22} />
        </button>
      </form>
    </div>
  );
}
