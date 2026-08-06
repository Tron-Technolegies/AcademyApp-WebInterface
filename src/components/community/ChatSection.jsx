import React from "react";
import { MdOutlineChat } from "react-icons/md";

export default function ChatSection({ chatRoom }) {
  return (
    <div>
      <div className="p-3 flex flex-col gap-5 justify-center font-plus items-center h-full">
        <MdOutlineChat size={40} />
        <p>Enter a Chat Room</p>
      </div>
    </div>
  );
}
