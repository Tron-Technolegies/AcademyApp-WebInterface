import React, { useState } from "react";
import ChatElement from "./ChatElement";
import {
  useGetChatRoomsBySubCommunity,
  useGetSubcommunityByCommunity,
} from "../../../hooks/community/useCommunity";
import { Skeleton } from "@mui/material";
import ChatSection from "./ChatSection";

export default function ChatContainer({ active }) {
  const { isLoading, error, data } = useGetSubcommunityByCommunity({
    id: active?._id,
  });
  const [selectedSubCommunity, setSelectedSubCommunity] = useState(null);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const {
    isLoading: loading2,
    error: error2,
    data: chatRooms,
  } = useGetChatRoomsBySubCommunity({ id: selectedSubCommunity?._id });
  return (
    <div className="overflow-scroll scrollbar-none">
      <div className="p-3 text-center shadow font-medium">
        {active?.communityName}
      </div>
      <div className="p-5 shadow flex overflow-x-scroll items-center gap-3 scrollbar-none">
        {isLoading ? (
          <Skeleton />
        ) : error ? (
          <p>Something went wrong</p>
        ) : (
          <>
            {data.length === 0 && <p>No Subcommunities</p>}
            {data?.map((item) => (
              <button
                onClick={() => setSelectedSubCommunity(item)}
                className={`px-4 py-1 cursor-pointer ${selectedSubCommunity?._id === item._id ? "bg-[#FBA3FF]" : "bg-gray-200"} rounded text-[#252525]`}
                key={item._id}
              >
                {item.subCommunityName}
              </button>
            ))}
          </>
        )}
      </div>

      <div className="p-5 shadow flex overflow-x-scroll items-center gap-3 scrollbar-none">
        {loading2 ? (
          <Skeleton />
        ) : (
          <>
            {chatRooms.length === 0 && <p>No Chat Rooms</p>}
            {chatRooms?.map((item) => (
              <button
                onClick={() => setSelectedChatRoom(item)}
                className={`px-4 py-1 cursor-pointer ${selectedChatRoom?._id === item._id ? "bg-[#FBA3FF]" : "bg-gray-200"} rounded text-[#252525]`}
                key={item._id}
              >
                {item.chatRoomName}
              </button>
            ))}
          </>
        )}
      </div>
      <ChatSection />
    </div>
  );
}
