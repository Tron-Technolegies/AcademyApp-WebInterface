import React, { useState } from "react";
import CommunityCard from "../components/community/CommunityCard";

const community = [
  { id: 1, name: "Tron Academy", members: "120" },
  { id: 2, name: "Digital Marketing", members: "70" },
  { id: 3, name: "Coding", members: "30" },
];

export default function CommunityPage() {
  const [active, setActive] = useState(null);
  return (
    <div className="bg-white flex justify-between">
      <div className="w-1/3 border-r border-[#E5E5EA] flex flex-col gap-2">
        <p className="p-5 border-b border-[#E5E5EA]">My Community</p>
        <div className="p-5 flex flex-col gap-2">
          {community.map((item) => (
            <CommunityCard
              key={item.id}
              item={item}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
      </div>
      <div className="w-2/3">
        <p className="p-5 border-b border-[#E5E5EA]">Chat Room</p>
        <div className="p-3">Community name</div>
        <div className="p-5">
          <button>General</button>
          <button>General</button>
          <button>General</button>
        </div>
      </div>
    </div>
  );
}
