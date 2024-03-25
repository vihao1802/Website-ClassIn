import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  SvgIcon,
} from "@mui/material";
import {
  Home,
  PlaylistAddCheckOutlined,
  ThreePOutlined,
  QuizOutlined,
} from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    text: "ClassIn",
    icon: <Home />,
  },
  {
    text: "Todo",
    icon: <PlaylistAddCheckOutlined />,
  },
  {
    text: "Chats",
    icon: <ThreePOutlined />,
  },
  {
    text: "Questions",
    icon: <QuizOutlined />,
  },
  {
    text: "Tests",
    icon: (
      <SvgIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      </SvgIcon>
    ),
  },
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Typography
            fontWeight="bold"
            color="#009265"
            fontSize="38px"
            padding="0 50px"
          >
            ClassIn
          </Typography>
          <List>
            {navItems.map(({ text, icon }) => {
              const lcText = text.toLowerCase();
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText ? "#009265" : "transparent",
                      color: active === lcText ? "white" : "#009265",
                      "&:not(.active):hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.04)", // Add your hover styles here
                      },
                      "&.active": {
                        backgroundColor: "#009265",
                      },
                    }}
                    className={active === lcText ? "active" : ""}
                  >
                    <ListItemIcon
                      sx={{
                        color: active === lcText ? "white" : "#009265",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
