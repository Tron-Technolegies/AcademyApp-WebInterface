import React from "react";
import UpcomingCard from "./UpcomingCard";
import { useGetAllClassesOfStudent } from "../../../hooks/class/useClass";

export default function StudentDashboardSection() {
  const {} = useGetAllClassesOfStudent({ currentPage: 1 });
  return (
    <div className="my-7">
      <p className="text-lg font-semibold font-mont capitalize">
        upcoming Classes
      </p>
      <div className="my-7 grid lg:grid-cols-3 md:grid-cols-2 gap-8 place-items-stretch">
        <UpcomingCard />
        <UpcomingCard />
        <UpcomingCard />
        <UpcomingCard />
        <UpcomingCard />
        <UpcomingCard />
        <UpcomingCard />
      </div>
    </div>
  );
}
