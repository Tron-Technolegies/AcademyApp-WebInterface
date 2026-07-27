import React from "react";
import EnrolledStudentCard from "./EnrolledStudentCard";
import { Link } from "react-router-dom";

const student = {
  profilePicUrl: "",
  firstName: "student",
  course: "UI/UX",
  category: "design",
};

export default function EnrolledStudents() {
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
        {Array.from({ length: 4 }, (_, i) => i).map((item) => (
          <EnrolledStudentCard key={item} student={student} />
        ))}
      </div>
    </div>
  );
}
