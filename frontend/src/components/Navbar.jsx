import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import { Menu as MenuIcon, ArrowDropDownOutlined } from "@mui/icons-material";

import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";

import profileImage from "assets/profile.jpg";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween gap="1rem">
          <IconButton
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
            sx={{
              color: "#009265",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography fontWeight="bold" color="#009265" fontSize="38px">
            ClassIn
          </Typography>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween>
          <Button
            onClick={handleClick}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              gap: "1rem",
              backgroundColor: "#009265",
              "&:hover": {
                backgroundColor: "#007850",
              },
            }}
          >
            <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="32px"
              width="32px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: "white" }}
              >
                Huchuynh
              </Typography>
            </Box>
            <ArrowDropDownOutlined sx={{ color: "white", fontSize: "25px" }} />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleClose}>Your Account</MenuItem>
            <MenuItem onClick={handleClose}>Log Out</MenuItem>
          </Menu>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
