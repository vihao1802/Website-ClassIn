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
        position: "sticky",
        background: "none",
        borderBottom: "1px solid #e7e7e7",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "50px",
          height: "50px",
        }}
        variant="dense"
      >
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
          <Typography fontWeight="bold" color="#009265" fontSize="30px">
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
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#e7e7e7",
              },
              height: "40px",
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
                sx={{ color: "#009265" }}
              >
                Huchuynh
              </Typography>
            </Box>
            {/* <ArrowDropDownOutlined sx={{ color: "white", fontSize: "25px" }} /> */}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
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
