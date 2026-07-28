import React from "react";

export default function LeaderboardCard({ student }) {
  return (
    <div className="px-5 py-2 bg-[#F5EBFC] flex justify-between items-center font-mont rounded-md">
      <div className="flex gap-3 items-center">
        {student?.profilePicUrl ? (
          <img
            src={student?.profilePicUrl}
            alt="profile-fic"
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <p className="w-9 h-9 bg-[#904CC8] rounded-full flex text-white items-center justify-center">
            {student?.firstName?.slice(0, 1)?.toUpperCase()}
          </p>
        )}
        <div>
          <p>{student.firstName}</p>
          <p className="text-xs text-[#2525254A]">{student.points} pts</p>
        </div>
      </div>
      <p className="text-[#9B9FA4] w-6 h-6 rounded-full border-2 flex justify-center items-center">
        {student.rank}
      </p>
    </div>
  );
}
