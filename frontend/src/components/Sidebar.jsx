import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Home,
  PlaylistAddCheckOutlined,
  ThreePOutlined,
  QuizOutlined,
  ArticleOutlined,
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
    icon: <ArticleOutlined />,
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
                    }}
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
