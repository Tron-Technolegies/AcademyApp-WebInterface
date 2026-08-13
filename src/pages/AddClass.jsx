import React, { useContext, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import DateTimePickerComp from "../components/class/DateTimePickerComp";
import {
  useAddClass,
  useGetCoursesByInstructor,
} from "../../hooks/class/useClass";
import { UserContext } from "../UserContext";

export default function AddClass() {
  const { data } = useGetCoursesByInstructor();
  const { isPending, mutateAsync } = useAddClass();

  const { user } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const classData = Object.fromEntries(formdata);
    classData.instructor = user?._id;
    classData.time = classData?.date?.split("T")[1];
    await mutateAsync(classData);
    e.target.reset();
  }
  return (
    <div className="flex flex-col gap-5 font-mont">
      <div className="font-mont flex gap-2 text-lg items-center text-[#9B9A9D] font-medium mb-5">
        <FaArrowLeftLong />
        <Link to={"/class"}>Class</Link>
        <p>/</p>
        <p className="text-[#252525]">Add Class</p>
      </div>
      <form
        className="p-5 w-full flex flex-col md:flex-row gap-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-7 items-start">
            <label className="sm:w-20 shrink-0 font-semibold text-[#4F4F4F] mt-2">
              Class
            </label>
            <input
              type="text"
              placeholder="Class name"
              name="className"
              className="p-3 rounded-xl bg-[#F4E1FD80] outline-none w-full focus:bg-[#F4E1FDCC] transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-7 items-start">
            <label className="sm:w-20 shrink-0 font-semibold text-[#4F4F4F] mt-2">
              Course
            </label>
            <select
              type="text"
              placeholder="Class name"
              name="course"
              className="p-3 rounded-xl bg-[#F4E1FD80] outline-none w-full focus:bg-[#F4E1FDCC] transition-all"
            >
              {data?.map((item) => (
                <option className="text-black" key={item._id} value={item._id}>
                  {item.courseName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-7 items-start">
            <label className="sm:w-20 shrink-0 font-semibold text-[#4F4F4F] mt-2">
              Notes
            </label>
            <textarea
              type="text"
              name="notes"
              rows={10}
              placeholder="Description"
              className="p-3 rounded-xl bg-[#F4E1FD80] outline-none w-full focus:bg-[#F4E1FDCC] transition-all"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-7 items-start w-full">
            <label className="sm:w-20 shrink-0 font-semibold text-[#4F4F4F] mt-2">
              Date
            </label>
            {/* <div className="w-full">
              <DateTimePickerComp value={date} setValue={setDate} />
            </div> */}
            <input
              type="datetime-local"
              placeholder="Class name"
              name="date"
              className="p-3 rounded-xl bg-[#F4E1FD80] outline-none w-full focus:bg-[#F4E1FDCC] transition-all"
            />
          </div>
          <button
            disabled={isPending}
            className="bg-[#424242] px-7 cursor-pointer hover:bg-black py-2 rounded-lg w-fit text-white self-end transition"
            type="submit"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
