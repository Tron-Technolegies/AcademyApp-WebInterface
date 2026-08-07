import React from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function NotificationCard({ item }) {
  return (
    <div className="p-5 flex justify-between gap-3 md:gap-7 items-center border-b border-[#DDDDDD]">
      <div className="w-full">
        <p className="text-sm md:text-base">"{item.notification}"</p>
        <p className="text-[#717171] text-xs md:text-sm mt-1">{item.date}</p>
      </div>
      <IoCloseSharp size={24} className="shrink-0 text-gray-500 hover:text-black cursor-pointer" />
    </div>
  );
}
