import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdDelete } from "react-icons/md";

const rows = [
  {
    id: 1,
    date: "14/09/2025",
    time: "8:41 PM",
    class: "That Day, on the Beach (Hai tan de yi tian)",
  },
  {
    id: 2,
    date: "28/11/2025",
    time: "7:58 PM",
    class: "Civic Duty",
  },
  {
    id: 3,
    date: "26/05/2026",
    time: "10:54 PM",
    class: "Now You See Me",
  },
  {
    id: 4,
    date: "31/01/2026",
    time: "7:00 PM",
    class: "Bit by Bit",
  },
  {
    id: 5,
    date: "22/01/2026",
    time: "8:06 AM",
    class: "Dirty Wars",
  },
  {
    id: 6,
    date: "22/11/2025",
    time: "12:05 AM",
    class: "Kaksi kotia (Dagmamman)",
  },
  {
    id: 7,
    date: "04/07/2026",
    time: "3:21 AM",
    class: "Wing Commander",
  },
  {
    id: 8,
    date: "02/02/2026",
    time: "12:53 AM",
    class: "Loveless, The (Breakdown)",
  },
  {
    id: 9,
    date: "21/07/2025",
    time: "2:24 AM",
    class: "Mondo Topless",
  },
  {
    id: 10,
    date: "25/11/2025",
    time: "1:16 PM",
    class: "Nick Carter, Master Detective",
  },
];
export default function ClassTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: "#F4E1FDAB" }}>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Class</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                background: "#F7F6FB",
              }}
            >
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.time}</TableCell>
              <TableCell align="center">{row.class}</TableCell>
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
  );
}
