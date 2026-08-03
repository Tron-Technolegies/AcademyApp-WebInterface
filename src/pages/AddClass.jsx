import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DateTimePickerComp from "../components/class/DateTimePickerComp";

export default function AddClass() {
  return (
    <div className="flex flex-col gap-5 font-mont">
      <div className="font-mont flex gap-2 text-lg items-center text-[#9B9A9D] font-medium mb-5">
        <FaArrowLeftLong />
        <Link to={"/class"}>Class</Link>
        <p>/</p>
        <p className="text-[#252525]">Add Class</p>
      </div>
      <form className="p-5  w-full flex gap-5">
        <div className="flex flex-col w-full gap-5">
          <div className="flex gap-7 items-start">
            <label>Class</label>
            <input
              type="text"
              placeholder="Class name"
              className="p-2 rounded-xl bg-[#F4E1FD80] outline-none w-full"
            />
          </div>
          <div className="flex gap-7 items-start">
            <label>Notes</label>
            <textarea
              type="text"
              rows={10}
              placeholder="Description"
              className="p-2 rounded-xl bg-[#F4E1FD80] outline-none w-full"
            />
          </div>
          <button
            className="bg-[#424242] px-7 cursor-pointer hover:bg-black py-2 rounded-lg w-fit text-white self-end"
            type="submit"
          >
            Save
          </button>
        </div>
        <div className="flex gap-7 items-start w-full">
          <label>Date</label>
          <DateTimePickerComp />
        </div>
      </form>
    </div>
  );
}
