import React, { useEffect, useState } from "react";
import StudentsTable from "../components/students/StudentsTable";
import { useGetEnrolled } from "../../hooks/students/useGetEnrolled";
import Pagination from "@mui/material/Pagination";

export default function StudentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const { isLoading, data, error } = useGetEnrolled({
    currentPage,
    search: debounced,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);
  return (
    <div>
      <p className="text-center font-mont text-lg font-medium">
        Enrolled Students
      </p>
      <input
        type="search"
        className="p-2 rounded-md shadow outline-none bg-gray-100"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="search.."
      />
      <StudentsTable isLoading={isLoading} data={data} error={error} />
      {data?.totalPages > 1 && (
        <Pagination
          count={data?.totalPages}
          page={currentPage}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
