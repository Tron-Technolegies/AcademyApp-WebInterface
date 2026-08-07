import React, { useState } from "react";

export default function LeaderBoardSelector() {
  const [active, setActive] = useState("Daily");
  return (
    <div className="bg-[#F4E1FD] font-plus p-2 rounded-xl gap-2 text-[#BD82C0] flex items-center text-sm md:text-base">
      <button
        className={`w-full rounded-xl py-3 md:py-5 font-semibold transition-all ${active === "Daily" && "text-white bg-[#B67BBA]"}`}
        onClick={() => setActive("Daily")}
      >
        Daily
      </button>
      <button
        className={`w-full rounded-xl border-l border-r border-[#BD82C0]/20 py-3 md:py-5 font-semibold transition-all ${active === "Weekly" && "text-white bg-[#B67BBA]"}`}
        onClick={() => setActive("Weekly")}
      >
        Weekly
      </button>
      <button
        className={`w-full rounded-xl py-3 md:py-5 font-semibold transition-all ${active === "Monthly" && "text-white bg-[#B67BBA]"}`}
        onClick={() => setActive("Monthly")}
      >
        Monthly
      </button>
    </div>
  );
}
