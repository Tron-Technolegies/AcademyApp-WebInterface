import { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "../../src/utils/socket";

export const useChatSocket = ({ chatRoomId, user }) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastReadMessageId, setLastReadMessageId] = useState(null);

  useEffect(() => {
    if (!chatRoomId) return;
    if (!socket.connected) socket.connect();

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit("joinChatRoom", { chatRoomId, userId: user?._id });
    };

    const handlePreviousMessages = ({ messages, lastReadMessageId }) => {
      setMessages(messages);
      setLastReadMessageId(lastReadMessageId);
    };

    const handleReceiveMessage = (msg) => {
      if (msg.chatRoomId && msg.chatRoomId !== chatRoomId) return;
      setMessages((prev) => [...prev, msg]);
    };

    const handleError = (err) => console.error("Socket error:", err);

    socket.on("connect", handleConnect);
    socket.on("previousMessages", handlePreviousMessages);
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("previousMessages", handlePreviousMessages);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("error", handleError);
      setMessages([]);
      setLastReadMessageId(null);
    };
  }, [chatRoomId, user?._id]);

  const markAsRead = useCallback(
    (lastMessageId) => {
      if (!chatRoomId || !user?._id || !lastMessageId) return;
      socket.emit("markAsRead", {
        chatRoomId,
        userId: user?._id,
        lastMessageId,
      });
    },
    [chatRoomId, user?._id],
  );

  const sendText = useCallback(
    (message) => {
      if (!message.trim() || chatRoomId) return;
      socket.emit("sendMessage", { chatRoomId, user: user?._id, message });
    },
    [chatRoomId, user?._id],
  );

  const sendImage = useCallback(
    async (file) => {
      if (!file || !chatRoomId) return;
      const arrayBuffer = await file.arrayBuffer();
      socket.emit("sendImage", {
        chatRoomId,
        user: user?._id,
        imageBuffer: arrayBuffer,
        imageName: file.name,
      });
    },
    [chatRoomId, user?._id],
  );

  const sendVoice = useCallback(
    async (blob, fileName = `voice_${Date.now()}.webm`) => {
      if (!blob || !chatRoomId) return;
      const arrayBuffer = await blob.arrayBuffer();
      socket.emit("sendVoice", {
        chatRoomId,
        user: user?._id,
        audioBuffer: arrayBuffer,
        audioName: fileName,
      });
    },
    [chatRoomId, user?._id],
  );

  const sendFile = useCallback(
    async (file) => {
      if (!file || !chatRoomId) return;
      const arrayBuffer = await file.arrayBuffer();
      socket.emit("sendFile", {
        chatRoomId,
        user: user?._id,
        fileBuffer: arrayBuffer,
        fileName: file.name,
        mimeType: file.type,
      });
    },
    [chatRoomId, user?._id],
  );

  return {
    messages,
    lastReadMessageId,
    isConnected,
    sendText,
    sendImage,
    sendVoice,
    sendFile,
    markAsRead,
  };
};
