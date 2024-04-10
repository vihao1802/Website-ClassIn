import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "calc(100% - 50.8px)",
      }}
    >
      <CircularProgress color="success" />
    </Box>
  );
};

export default Loading;
