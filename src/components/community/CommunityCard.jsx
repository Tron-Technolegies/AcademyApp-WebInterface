import React from "react";
import AvatarGroup from "./AvatarGroup";

export default function CommunityCard({ active, item, setActive }) {
  return (
    <div
      onClick={() => setActive(item)}
      className={`p-5 rounded-lg flex flex-col gap-3 font-plus ${active?._id === item._id ? "bg-[#FBA3FF]" : "bg-[#F1EEFF]"}`}
    >
      <p className="text-lg capitalize">{item.communityName}</p>
      <p className="text-sm text-[#9987AA]">
        {item.communityMembers?.length} members
      </p>
      <div>
        <AvatarGroup members={item.communityMembers?.slice(0, 6)} />
      </div>
    </div>
  );
}
