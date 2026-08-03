import React from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function NotificationCard({ item }) {
  return (
    <div className="p-5 flex justify-between gap-7 items-center border-b border-[#DDDDDD]">
      <div className="w-full">
        <p>"{item.notification}"</p>
        <p className="text-[#717171] text-sm">{item.date}</p>
      </div>
      <IoCloseSharp size={24} />
    </div>
  );
}
