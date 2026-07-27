import React, { useState } from "react";

export default function LeaderBoardSelector() {
  const [active, setActive] = useState("Daily");
  return (
    <div className="bg-[#F4E1FD] font-plus p-2 rounded-lg gap-2 text-[#BD82C0] flex items-center">
      <button
        className={`w-full rounded-xl py-5 ${active === "Daily" && "text-white bg-[#B67BBA]"}`}
        onClick={() => setActive("Daily")}
      >
        Daily
      </button>
      <button
        className={`w-full rounded-xl border-l border-r py-5 ${active === "Weekly" && "text-white bg-[#B67BBA]"}`}
        onClick={() => setActive("Weekly")}
      >
        Weekly
      </button>
      <button
        className={`w-full rounded-xl py-5 ${active === "Monthly" && "text-white bg-[#B67BBA]"}`}
        onClick={() => setActive("Monthly")}
      >
        Monthly
      </button>
    </div>
  );
}
