import React, { useState } from "react";
import CommunityCard from "../components/community/CommunityCard";
import ChatContainer from "../components/community/ChatContainer";
import { useGetAllCommunities } from "../../hooks/community/useCommunity";
import Skeleton from "@mui/material/Skeleton";
import { MdOutlineChat } from "react-icons/md";

export default function CommunityPage() {
  const [active, setActive] = useState(null);
  const { isLoading, error, data } = useGetAllCommunities();
  return (
    <div className="bg-white h-[80vh] flex justify-between">
      <div className="w-1/3 border-r border-[#E5E5EA] flex flex-col gap-2">
        <p className="p-5 border-b border-[#E5E5EA] text-xl font-semibold">
          My Community
        </p>
        <div className="p-5 flex flex-col gap-2 overflow-scroll scrollbar-none">
          {isLoading ? (
            <Skeleton />
          ) : error ? (
            <p>Something went wrong</p>
          ) : (
            <>
              {data?.map((item) => (
                <CommunityCard
                  key={item._id}
                  item={item}
                  active={active}
                  setActive={setActive}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="w-2/3 ">
        <p className="p-5 border-b border-[#E5E5EA] text-xl font-semibold">
          Chat Room
        </p>
        {!active ? (
          <div className="p-3 flex flex-col gap-5 justify-center font-plus items-center h-full">
            <MdOutlineChat size={40} />
            <p>Explore our Communities and involve in discussions and learn</p>
          </div>
        ) : (
          <ChatContainer active={active} />
        )}
      </div>
    </div>
  );
}
