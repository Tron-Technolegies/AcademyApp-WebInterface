import React, { useContext } from "react";
import LiveClassBanner from "../components/dashboard/LiveClassBanner";
import EnrolledStudents from "../components/dashboard/EnrolledStudents";
import LeaderBoard from "../components/dashboard/LeaderBoard";
import StudentDashboardSection from "../components/dashboard/StudentDashboardSection";
import { UserContext } from "../UserContext";

export default function DashboardPage() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <LiveClassBanner />
      {user?.role === "student" && <StudentDashboardSection />}
      {user?.role === "teacher" && (
        <div className="my-7 flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20">
          <EnrolledStudents />
          <LeaderBoard />
        </div>
      )}
    </div>
  );
}
