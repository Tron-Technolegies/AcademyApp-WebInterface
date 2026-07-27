import React from "react";

export default function LeaderboardTop3() {
  return (
    <div className="flex items-end w-full my-16 font-plus ">
      <div className="bg-[#EBCEFF] p-5 rounded-l-xl w-full h-30 flex flex-col justify-center items-center shadow-sm relative">
        <div className="w-16 h-16 shadow-lg rounded-full border bg-[#C44C68] absolute text-white flex justify-center items-center -top-12">
          M
        </div>
        <p className="text-white font-semibold text-lg">Maria</p>
        <p className="text-2xl font-semibold text-[#C44C68]">1220</p>
        <p className="text-[#C44C68]">Points</p>
      </div>
      <div className="bg-[#E4BDFF] p-5 w-full rounded-t-4xl h-45 flex flex-col justify-center items-center shadow-md relative">
        <div className="w-20 h-20 shadow-lg rounded-full border bg-[#904CC8] absolute text-white flex justify-center items-center -top-12">
          R
        </div>
        <p className="text-white font-semibold text-lg">Rachel</p>
        <p className="text-2xl font-semibold text-[#904CC8]">1250</p>
        <p className="text-[#904CC8]">Points</p>
      </div>
      <div className="bg-[#EBCEFF] p-5 rounded-r-xl w-full h-30 flex flex-col justify-center items-center shadow-sm relative">
        <div className="w-16 h-16 shadow-lg rounded-full border bg-[#EC7735] absolute text-white flex justify-center items-center -top-12">
          A
        </div>
        <p className="text-white font-semibold text-lg">Andrew</p>
        <p className="text-2xl font-semibold text-[#EC7735]">1080</p>
        <p className="text-[#EC7735]">Points</p>
      </div>
    </div>
  );
}
