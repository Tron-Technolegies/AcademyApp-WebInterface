import React from "react";

const community = [{ id: 1, name: "", members: "" }];

export default function CommunityPage() {
  return (
    <div className="bg-white flex justify-between">
      <div className="w-1/3 border-r border-[#E5E5EA] flex flex-col gap-2">
        <p className="p-5 border-b border-[#E5E5EA]">My Community</p>
        <div className="p-5"></div>
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
