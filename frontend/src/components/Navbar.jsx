import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { Menu as MenuIcon, Person, Logout } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Skeleton,
} from "@mui/material";

import profileImage from "assets/profile.jpg";
import { useGetUserQuery } from "state/api";
import { getUserId_Cookie } from "utils/handleCookies";
import AvatarName from "./AvatarName";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const userId = getUserId_Cookie();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate();

  const { data: userData, isLoading: userDataLoading } =
    useGetUserQuery(userId);

  const handleLogout = () => {
    document.cookie =
      "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };
  return (
    <AppBar
      sx={{
        position: "sticky",
        backgroundColor: "white",
        borderBottom: "1px solid #e7e7e7",
        boxShadow: "none",
        zIndex: 20,
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
        {userDataLoading ? (
          <Box>
            <FlexBetween gap={"1rem"}>
              <Skeleton variant="circular" width={40} height={40} sx={{}} />
              <Skeleton variant="text" width={80} height={40} />
            </FlexBetween>
          </Box>
        ) : (
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
              {/* <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              /> */}
              <AvatarName name={userData && userData.hoTen} />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: "#009265" }}
                >
                  {/* Huchuynh */}
                  {userData && userData.hoTen}
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
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate(`/profile/${userId}`);
                }}
              >
                <FlexBetween color="#009265">
                  <Person />
                  <Typography ml="5px">Your Account</Typography>
                </FlexBetween>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                <FlexBetween color="red">
                  <Logout />
                  <Typography ml="5px">Log Out</Typography>
                </FlexBetween>
              </MenuItem>
            </Menu>
          </FlexBetween>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
