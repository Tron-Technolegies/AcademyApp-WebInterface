import React from "react";
import UpcomingCard from "./UpcomingCard";
import { useGetAllClassesOfStudent } from "../../../hooks/class/useClass";
import Loading from "../Loading";
import LiveBannerStudent from "./LiveBannerStudent";

export default function StudentDashboardSection() {
  const { isLoading, data } = useGetAllClassesOfStudent({ currentPage: 1 });
  return (
    <div className="my-7">
      <LiveBannerStudent isLoading={isLoading} data={data} />
      <p className="text-lg font-semibold font-mont capitalize mt-5">
        upcoming Classes
      </p>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="my-7 grid lg:grid-cols-3 md:grid-cols-2 gap-8 place-items-stretch">
          {data?.classes?.length < 1 && <p>No Classes Scheduled</p>}
          {data?.classes?.map((item) => (
            <UpcomingCard
              key={item._id}
              course={item?.course?.courseName}
              title={item.className}
              eyebrow={new Date(item?.date)?.toDateString()}
              hostAvatar={item.instructor?.profilePicUrl}
              hostName={
                item.instructor?.firstName ||
                item.instructor?.instructorDetails[0]?.instructorName
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
