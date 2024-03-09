import { Box } from "@mui/material";
import React from "react";
import HomeNavbar from "components/HomeNavbar";

const Login = () => {
  return (
    <Box>
      <HomeNavbar IsLoginPage={true} />
    </Box>
  );
};

export default Login;
