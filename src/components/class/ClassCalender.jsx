import * as React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function ClassCalendar() {
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ marginBottom: "12px" }}>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
          sx={{ background: "#ffffff", boxShadow: "5px" }}
        />
      </Box>
    </LocalizationProvider>
  );
}
