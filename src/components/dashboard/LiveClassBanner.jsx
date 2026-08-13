import React from "react";
import { IoVideocamOutline } from "react-icons/io5";
import { useGetAllInstructorClasses } from "../../../hooks/class/useClass";
import Loading from "../Loading";
import { Link } from "react-router-dom";

export default function LiveClassBanner() {
  const { isLoading, data } = useGetAllInstructorClasses({
    currentPage: 1,
    search: "",
  });

  const latestClass = data?.classes?.[0] || null;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-[#F4E1FD] p-6 rounded-2xl w-full flex flex-col md:flex-row gap-5 justify-around items-center font-mont text-center md:text-left">
      {latestClass ? (
        <>
          <div className="flex flex-col items-center md:items-start">
            <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-[#4F4F4F]">
              Next
            </p>
            <p className="text-[#C441F4] text-lg md:text-xl font-semibold">
              Live Class
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <p className="text-base md:text-lg font-semibold">
              {latestClass.className}
            </p>
            <p className="text-xs text-gray-600">{latestClass.notes}</p>
          </div>
          <button className="bg-white p-2 px-4 rounded-xl text-[#C441F4] flex gap-3 font-semibold items-center shadow-sm hover:shadow transition">
            <IoVideocamOutline size={24} />
            Start Now
          </button>
        </>
      ) : (
        <>
          <p className="text-base md:text-lg font-semibold">
            No Live classes scheduled
          </p>
          <Link
            to={"/class/add"}
            className="bg-white p-2 px-4 rounded-xl text-[#C441F4] flex gap-3 font-semibold items-center shadow-sm hover:shadow transition"
          >
            Schedule Now
          </Link>
        </>
      )}
    </div>
  );
}
