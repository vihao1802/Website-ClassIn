import { Typography, Box } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography
        variant="h4"
        color="#009265"
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color="#858585">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
