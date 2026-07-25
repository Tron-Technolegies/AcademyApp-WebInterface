import React from "react";
import EnrolledStudentCard from "./EnrolledStudentCard";

export default function EnrolledStudents() {
  return (
    <div className="w-full font-mont">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">Enrolled Students</p>
        <button className="px-4 py-2 bg-[#F5EBFC] text-sm rounded">
          View All
        </button>
      </div>
      <div>
        {Array.from({ length: 10 }, (_, i) => i).map((item) => (
          <EnrolledStudentCard key={item} />
        ))}
      </div>
    </div>
  );
}
