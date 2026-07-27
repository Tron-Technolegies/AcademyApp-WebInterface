import React from "react";
import LeaderBoardSelector from "../leaderboard/LeaderBoardSelector";
import LeaderboardTop3 from "../leaderboard/LeaderboardTop3";

export default function LeaderBoard() {
  return (
    <div className="w-full font-mont">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">LeaderBoard</p>
        <button className="px-4 py-2 bg-[#F5EBFC] text-sm rounded">
          View All
        </button>
      </div>
      <div className="my-5">
        <LeaderBoardSelector />
        <LeaderboardTop3 />
      </div>
    </div>
  );
}
