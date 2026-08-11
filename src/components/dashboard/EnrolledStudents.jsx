import React from "react";
import EnrolledStudentCard from "./EnrolledStudentCard";
import { Link } from "react-router-dom";
import { useGetEnrolled } from "../../../hooks/students/useGetEnrolled";
import Loading from "../Loading";

const student = {
  profilePicUrl: "",
  firstName: "student",
  course: "UI/UX",
  category: "design",
};

export default function EnrolledStudents() {
  const { isLoading, data, error } = useGetEnrolled({
    currentPage: 1,
    search: "",
  });
  return (
    <div className="w-full font-mont">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">Enrolled Students</p>
        <Link
          to={"/students"}
          className="px-4 py-2 bg-[#F5EBFC] text-sm rounded"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-col gap-2 my-5">
        {isLoading && <Loading />}
        {data?.students?.length < 1 && <p>No Enrolled Students</p>}
        {data?.students?.slice(0, 4)?.map((item) => (
          <EnrolledStudentCard key={item._id} student={item} />
        ))}
      </div>
    </div>
  );
}
