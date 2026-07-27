import React from "react";

export default function EnrolledStudentCard({ student }) {
  return (
    <div className="bg-white p-5 rounded-xl font-plus flex justify-around items-center">
      <div className="flex gap-3 items-center">
        {student.profilePicUrl ? (
          <img
            src={student.profilePicUrl}
            alt={student.firstName}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 bg-[#904CC8] rounded-full flex text-white items-center justify-center">
            {student.firstName?.slice(0, 1)?.toUpperCase()}
          </div>
        )}
        <p>{student.firstName}</p>
      </div>
      <div>
        <p className="text-lg font-semibold">{student.course}</p>
        <p className="text-xs font-light">{student.category}</p>
      </div>
    </div>
  );
}
