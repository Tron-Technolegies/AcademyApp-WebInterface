import React from "react";

export default function LeaderboardTop3({ page }) {
  return (
    <div className="flex items-end w-full my-16 font-plus">
      {/* 2nd Place */}
      <div
        className={`bg-[#EBCEFF] px-2 py-5 sm:p-5 rounded-l-xl w-full ${page ? "h-50" : "h-30"} flex flex-col justify-center items-center shadow-sm relative`}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 shadow-lg rounded-full border bg-[#C44C68] absolute text-white flex justify-center items-center -top-8 sm:-top-12 text-sm sm:text-base font-semibold">
          M
        </div>
        <p className="text-white font-semibold text-xs sm:text-base md:text-lg">Maria</p>
        <p className="text-lg sm:text-2xl font-semibold text-[#C44C68]">1220</p>
        <p className="text-[#C44C68] text-xs sm:text-sm">Points</p>
      </div>

      {/* 1st Place */}
      <div
        className={`bg-[#E4BDFF] px-2 py-5 sm:p-5 w-full rounded-t-3xl md:rounded-t-4xl ${page ? "h-65" : "h-45"} flex flex-col justify-center items-center shadow-md relative`}
      >
        <div className="w-14 h-14 sm:w-20 sm:h-20 shadow-lg rounded-full border bg-[#904CC8] absolute text-white flex justify-center items-center -top-9 sm:-top-12 text-base sm:text-lg font-semibold">
          R
        </div>
        <p className="text-white font-semibold text-xs sm:text-base md:text-lg">Rachel</p>
        <p className="text-lg sm:text-2xl font-semibold text-[#904CC8]">1250</p>
        <p className="text-[#904CC8] text-xs sm:text-sm font-medium">Points</p>
      </div>

      {/* 3rd Place */}
      <div
        className={`bg-[#EBCEFF] px-2 py-5 sm:p-5 rounded-r-xl w-full ${page ? "h-50" : "h-30"} flex flex-col justify-center items-center shadow-sm relative`}
      >
        <div className="w-12 h-12 sm:w-16 sm:h-16 shadow-lg rounded-full border bg-[#EC7735] absolute text-white flex justify-center items-center -top-8 sm:-top-12 text-sm sm:text-base font-semibold">
          A
        </div>
        <p className="text-white font-semibold text-xs sm:text-base md:text-lg">Andrew</p>
        <p className="text-lg sm:text-2xl font-semibold text-[#EC7735]">1080</p>
        <p className="text-[#EC7735] text-xs sm:text-sm">Points</p>
      </div>
    </div>
  );
}
