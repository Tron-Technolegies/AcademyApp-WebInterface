import React from "react";
import AvatarGroup from "./AvatarGroup";

export default function CommunityCard({ active, item, setActive }) {
  return (
    <div
      onClick={() => setActive(item.id)}
      className={`p-5 rounded-lg flex flex-col gap-3 font-plus ${active === item.id ? "bg-[#FBA3FF]" : "bg-[#F1EEFF]"}`}
    >
      <p className="text-lg">{item.name}</p>
      <p className="text-sm text-[#9987AA]">{item.members} members</p>
      <div>
        <AvatarGroup />
      </div>
    </div>
  );
}
