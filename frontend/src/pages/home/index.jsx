import React from "react";
import { Box, Typography, Button } from "@mui/material";
import HomeNavbar from "components/HomeNavbar";

const Home = () => {
  return (
    <Box>
      <HomeNavbar IsLoginPage={false} />
    </Box>
  );
};

export default Home;
