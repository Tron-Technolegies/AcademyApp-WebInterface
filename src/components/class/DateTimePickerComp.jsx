import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateTimePickerComp() {
  const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={value}
        sx={{
          background: "#F4E1FD80",
          border: 0,
          borderRadius: "0.75rem",
          width: "100%",
        }}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
}
