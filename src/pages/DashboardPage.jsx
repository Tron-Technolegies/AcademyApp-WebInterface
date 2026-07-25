import React from "react";
import LiveClassBanner from "../components/dashboard/LiveClassBanner";
import EnrolledStudents from "../components/dashboard/EnrolledStudents";
import LeaderBoard from "../components/dashboard/LeaderBoard";

export default function DashboardPage() {
  return (
    <div>
      <LiveClassBanner />
      <div className="my-7 flex justify-between items-start gap-20">
        <EnrolledStudents />
        <LeaderBoard />
      </div>
    </div>
  );
}
