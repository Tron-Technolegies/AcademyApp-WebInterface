import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useGetAllInstructorClasses } from "../../../hooks/class/useClass";
import Loading from "../Loading";
import Pagination from "@mui/material/Pagination";

export default function ClassTable() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data, error } = useGetAllInstructorClasses({
    currentPage,
    search: debounced,
  });

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full flex flex-col gap-3">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 outline-none bg-gray-200 rounded-md my-2"
        placeholder="search..."
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#F4E1FDAB" }}>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Class</TableCell>
              <TableCell align="center">Course</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.classes?.length < 1 && (
              <TableRow className="p-5">
                <TableCell>No classes scheduled</TableCell>
              </TableRow>
            )}
            {data?.classes?.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  background: "#F7F6FB",
                }}
              >
                <TableCell align="center">
                  {row.date && new Date(row.date).toDateString()}
                </TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">{row.className}</TableCell>
                <TableCell align="center">{row.course?.courseName}</TableCell>
                <TableCell
                  align="center"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <MdDelete />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {data.totalPages > 1 && (
        <Pagination
          count={data?.totalPages}
          page={currentPage}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
