import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loading from "../Loading";

export default function StudentsTable({ isLoading, data, error }) {
  if (isLoading) {
    return <Loading />;
  }
  return (
    <TableContainer>
      <Table
        sx={{
          minWidth: 650,
          borderCollapse: "separate",
          borderSpacing: "0 12px",
          background: "#f7f6fb",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow
            sx={{
              background: "#F6EDFC",
              borderRadius: 16,
            }}
          >
            <TableCell sx={{ color: "#904CC8" }} align="center">
              Name
            </TableCell>
            <TableCell sx={{ color: "#904CC8" }} align="center">
              Mobile Number
            </TableCell>
            <TableCell sx={{ color: "#904CC8" }} align="center">
              E-mail
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.students?.length < 1 && <p>No students</p>}
          {data?.students?.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                backgroundColor: "#fff",

                "& td:first-of-type": {
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                },

                "& td:last-of-type": {
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
                },

                "& td": {
                  border: 0,
                  py: 2,
                },
              }}
            >
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.phoneNumber}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
