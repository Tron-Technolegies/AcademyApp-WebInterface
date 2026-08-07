import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import LeaderBoardSelector from "../components/leaderboard/LeaderBoardSelector";
import LeaderboardTop3 from "../components/leaderboard/LeaderboardTop3";
import LeaderboardCard from "../components/leaderboard/LeaderboardCard";

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="font-mont flex gap-2 text-lg items-center text-[#9B9A9D] font-medium mb-5">
        <FaArrowLeftLong />
        <Link to={"/"}>Dashboard</Link>
        <p>/</p>
        <p className="text-[#252525]">Leaderboard</p>
      </div>
      <LeaderBoardSelector />
      <div className="flex flex-col lg:flex-row gap-7 justify-between items-start">
        <LeaderboardTop3 page />
        <div className="w-full flex flex-col gap-2">
          {Array.from({ length: 7 }).map((_, item) => (
            <LeaderboardCard
              key={item}
              student={{ firstName: "Student", rank: 4, points: 900 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
