import React from "react";
import LiveClassBanner from "../components/dashboard/LiveClassBanner";
import EnrolledStudents from "../components/dashboard/EnrolledStudents";
import LeaderBoard from "../components/dashboard/LeaderBoard";
import StudentDashboardSection from "../components/dashboard/StudentDashboardSection";

export default function DashboardPage() {
  return (
    <div>
      <LiveClassBanner />
      <StudentDashboardSection />
      <div className="my-7 flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20">
        <EnrolledStudents />
        <LeaderBoard />
      </div>
    </div>
  );
}
