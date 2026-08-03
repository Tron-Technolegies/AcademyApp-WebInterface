import React from "react";
import ClassTable from "../components/class/ClassTable";
import ClassCalender from "../components/class/ClassCalender";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";

export default function ClassPage() {
  return (
    <div className="">
      <ClassCalender />
      <Link
        to={"/class/add"}
        className="my-5 font-plus flex gap-2 items-center font-medium p-2 rounded border border-[#C3B0D2] w-fit mx-auto hover:bg-gray-200"
      >
        <span className="text-[#68368F]">Add Class</span> <FaPlusSquare />
      </Link>
      <ClassTable />
    </div>
  );
}
