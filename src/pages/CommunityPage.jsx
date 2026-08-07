import React, { useContext, useState } from "react";
import CommunityCard from "../components/community/CommunityCard";
import ChatContainer from "../components/community/ChatContainer";
import { useGetAllCommunities } from "../../hooks/community/useCommunity";
import Skeleton from "@mui/material/Skeleton";
import { MdOutlineChat } from "react-icons/md";
import { UserContext } from "../UserContext";
import { isUserInCommunity } from "../utils/community";

export default function CommunityPage() {
  const { user } = useContext(UserContext);
  const [active, setActive] = useState(null);
  const { isLoading, error, data } = useGetAllCommunities();

  // keep `active` in sync with the latest fetched community data
  // (important after joining, since `data` refetches but `active` was a stale snapshot)
  const activeCommunity = data?.find((c) => c._id === active?._id) || active;
  return (
    <div className="bg-white h-[80vh] flex rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Sidebar - Community List */}
      <div className={`${active ? "hidden md:flex" : "flex"} w-full md:w-1/3 border-r border-[#E5E5EA] flex-col gap-2 h-full`}>
        <p className="p-5 border-b border-[#E5E5EA] text-xl font-semibold">
          My Community
        </p>
        <div className="p-5 flex flex-col gap-2 overflow-scroll scrollbar-none flex-1">
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

      {/* Chat Room */}
      <div className={`${!active ? "hidden md:flex" : "flex"} w-full md:w-2/3 flex-col h-full`}>
        <p className="p-5 border-b border-[#E5E5EA] text-xl font-semibold flex items-center gap-3">
          {active && (
            <button
              onClick={() => setActive(null)}
              className="md:hidden text-gray-500 hover:text-black focus:outline-none cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          Chat Room
        </p>
        <div className="flex-1 min-h-0">
          {!activeCommunity ? (
            <div className="p-3 flex flex-col gap-5 justify-center font-plus items-center h-full text-center">
              <MdOutlineChat size={40} className="text-[#FBA3FF]" />
              <p className="px-4 text-gray-500">Explore our Communities and involve in discussions and learn</p>
            </div>
          ) : (
            <ChatContainer
              active={active}
              onBack={() => setActive(null)}
              isMember={isUserInCommunity(activeCommunity, user?._id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
