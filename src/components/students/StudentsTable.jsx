import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows = [
  {
    id: 1,
    first_name: "Tildi",
    email: "toconcannon0@weather.com",
    phone: "204 762 5262",
  },
  {
    id: 2,
    first_name: "Lorens",
    email: "lflorentine1@cdbaby.com",
    phone: "119 181 7555",
  },
  {
    id: 3,
    first_name: "Nanci",
    email: "ngideon2@acquirethisname.com",
    phone: "489 317 6638",
  },
  {
    id: 4,
    first_name: "Lodovico",
    email: "lende3@yahoo.com",
    phone: "498 266 5817",
  },
  {
    id: 5,
    first_name: "Blaine",
    email: "brisley4@sohu.com",
    phone: "671 120 2565",
  },
  {
    id: 6,
    first_name: "Miguelita",
    email: "mmatteuzzi5@reuters.com",
    phone: "715 638 1208",
  },
  {
    id: 7,
    first_name: "Jerrie",
    email: "jsurgeoner6@diigo.com",
    phone: "915 595 4620",
  },
  {
    id: 8,
    first_name: "Drona",
    email: "dbezant7@vk.com",
    phone: "764 679 1538",
  },
  {
    id: 9,
    first_name: "Juliane",
    email: "jcowherd8@hao123.com",
    phone: "305 462 4613",
  },
  {
    id: 10,
    first_name: "Ninon",
    email: "nalison9@sciencedirect.com",
    phone: "984 521 3065",
  },
];

export default function StudentsTable({ isLoading, data, error }) {
  if (isLoading) {
    return <p>Loading....</p>;
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
