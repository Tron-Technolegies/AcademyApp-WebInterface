import React from "react";
import StudentsTable from "../components/students/StudentsTable";

export default function StudentsPage() {
  return (
    <div>
      <p className="text-center font-mont text-lg font-medium">
        Enrolled Students
      </p>
      <StudentsTable />
    </div>
  );
}
