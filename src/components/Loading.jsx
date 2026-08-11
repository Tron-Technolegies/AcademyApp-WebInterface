import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Loading() {
  return (
    <Stack
      spacing={1}
      className="w-full flex flex-col justify-center items-center"
    >
      <Skeleton variant="rectangular" width={"100%"} height={60} />
      <Skeleton variant="rounded" width={"100%"} height={60} />
    </Stack>
  );
}
