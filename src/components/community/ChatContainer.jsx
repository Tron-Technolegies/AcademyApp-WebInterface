import React, { useCallback, useContext, useEffect, useState } from "react";
import ChatElement from "./ChatElement";
import {
  useGetChatRoomsBySubCommunity,
  useGetSubcommunityByCommunity,
  useJoinCommunity,
} from "../../../hooks/community/useCommunity";
import { Skeleton } from "@mui/material";
import ChatSection from "./ChatSection";
import { UserContext } from "../../UserContext";
import { useUnreadCounts } from "../../../hooks/community/useUnreadCounts";
import { socket } from "../../utils/socket";
import { MdGroupAdd } from "react-icons/md";

export default function ChatContainer({ active, isMember, onBack }) {
  const { user } = useContext(UserContext);
  const { isPending, mutateAsync } = useJoinCommunity();
  const [selectedSubCommunity, setSelectedSubCommunity] = useState(null);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const { isLoading, error, data } = useGetSubcommunityByCommunity({
    id: isMember ? active?._id : null,
  });
  const {
    isLoading: loading2,
    error: error2,
    data: chatRooms,
  } = useGetChatRoomsBySubCommunity({
    id: isMember ? selectedSubCommunity?._id : null,
  });

  const chatRoomIds = (isMember && chatRooms?.map((c) => c._id)) || [];
  const { unreadCounts, bumpUnread, clearUnread } = useUnreadCounts({
    userId: user?._id,
    chatRoomIds,
  });

  // Subscribe (silently) to all rooms in this subcommunity so badges
  // update live even for rooms that aren't currently open.

  useEffect(() => {
    if (!isMember || !chatRoomIds.length) return;
    if (!socket.connected) socket.connect();

    socket.emit("subscribeRooms", chatRoomIds);

    const handleReceiveMessage = (msg) => {
      const isOwnMessage =
        msg.user?._id === user?._id || msg.user === user?._id;
      const isActiveRoom = msg.chatRoomId === selectedChatRoom?._id;
      if (!isOwnMessage && !isActiveRoom && msg.chatRoomId) {
        bumpUnread(msg.chatRoomId);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.emit("unsubscribeRooms", chatRoomIds);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [chatRoomIds.join(","), selectedChatRoom?._id]);

  const handleChatOpen = useCallback(() => {
    clearUnread(selectedChatRoom?._id);
  }, [clearUnread, selectedChatRoom?._id]);

  useEffect(() => {
    setSelectedChatRoom(null);
    setSelectedSubCommunity(null);
  }, [active?._id]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-3 text-center shadow font-medium relative shrink-0">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-3 top-1/2 -translate-y-1/2 md:hidden text-gray-500 hover:text-black font-semibold flex items-center gap-1 focus:outline-none cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
        {active?.communityName}
      </div>
      {!isMember ? (
        <div className="p-5 flex flex-col gap-4 justify-center items-center flex-1 text-center">
          <MdGroupAdd size={40} className="text-[#FBA3FF]" />
          <p className="text-center text-gray-600">
            Join <span className="font-semibold">{active?.communityName}</span>{" "}
            to see subcommunities and chat rooms
          </p>
          <button
            onClick={() => mutateAsync(active?._id)}
            disabled={isPending}
            className="px-6 py-2 bg-[#FBA3FF] text-[#252525] rounded-full font-medium cursor-pointer disabled:opacity-60 transition shadow hover:shadow-md"
          >
            {isPending ? "Joining..." : "Join Community"}
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-5 shadow flex overflow-x-scroll items-center gap-3 shrink-0 scrollbar-none">
            {isLoading ? (
              <Skeleton />
            ) : error ? (
              <p>Something went wrong</p>
            ) : (
              <>
                {data?.length === 0 && <p>No Subcommunities</p>}
                {data?.map((item) => (
                  <button
                    onClick={() => setSelectedSubCommunity(item)}
                    className={`px-4 py-1 cursor-pointer shrink-0 ${selectedSubCommunity?._id === item._id ? "bg-[#FBA3FF]" : "bg-gray-200"} rounded text-[#252525] transition`}
                    key={item._id}
                  >
                    {item.subCommunityName}
                  </button>
                ))}
              </>
            )}
          </div>

          <div className="p-5 shadow flex overflow-x-scroll items-center gap-3 shrink-0 scrollbar-none">
            {loading2 ? (
              <Skeleton />
            ) : (
              <>
                {chatRooms?.length === 0 && <p>No Chat Rooms</p>}
                {chatRooms?.map((item) => {
                  const unread = unreadCounts[item._id] || 0;
                  return (
                    <button
                      onClick={() => {
                        setSelectedChatRoom(item);
                        clearUnread(item._id);
                      }}
                      className={`relative px-4 py-1 cursor-pointer shrink-0 ${selectedChatRoom?._id === item._id ? "bg-[#FBA3FF]" : "bg-gray-200"} rounded text-[#252525] transition`}
                      key={item._id}
                    >
                      {item.chatRoomName}
                      {unread > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1">
                          {unread > 99 ? "99+" : unread}
                        </span>
                      )}
                    </button>
                  );
                })}
              </>
            )}
          </div>
          <ChatSection chatRoom={selectedChatRoom} onOpen={handleChatOpen} />
        </div>
      )}
    </div>
  );
}
