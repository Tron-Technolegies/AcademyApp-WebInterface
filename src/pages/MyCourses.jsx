import React from "react";
import { useGetEnrolledCourse } from "../../hooks/course/useGetEnrolledCourse";
import Loading from "../components/Loading";

export default function MyCourses() {
  const { isLoading, data } = useGetEnrolledCourse();

  if (isLoading) {
    return <Loading />;
  }

  const courses = data?.enrolledCourses || [];
  return (
    <div>
      <p className="font-semibold text-lg ">Enrolled Courses</p>
      {!courses.length && <p>No Enrolled Courses</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-stretch my-3">
        {courses.map((item) => (
          <div className="p-5 bg-[#904CC8] text-white font-plus capitalize rounded-md flex justify-center items-center">
            {item.course?.courseName}
          </div>
        ))}
      </div>
    </div>
  );
}
