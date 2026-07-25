import React from "react";
import { IoVideocamOutline } from "react-icons/io5";

export default function LiveClassBanner() {
  const hasLiveClass = true;
  return (
    <div className="bg-[#F4E1FD] p-5 rounded w-full flex justify-around items-center font-mont">
      {hasLiveClass ? (
        <>
          <div>
            <p className="text-sm font-medium">Next</p>
            <p className="text-[#C441F4] text-xl font-semibold">Live Class</p>
          </div>
          <div>
            <p className="text-lg font-semibold">React State Management</p>
            <p className="text-xs">
              Describes about the state management in React
            </p>
          </div>
          <button className="bg-white p-2 px-4 rounded-lg text-[#C441F4] flex gap-3 font-semibold">
            <IoVideocamOutline size={24} />
            Join Now
          </button>
        </>
      ) : (
        <>
          <p className="text-lg font-semibold">No Live classes scheduled</p>
          <button className="bg-white p-2 px-4 rounded-lg text-[#C441F4] flex gap-3 font-semibold">
            Schedule Now
          </button>
        </>
      )}
    </div>
  );
}
