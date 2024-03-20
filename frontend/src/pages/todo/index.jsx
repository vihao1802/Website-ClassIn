import React, { useState, useEffect } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  TextField,
  Tab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Add, MoreHorizOutlined } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpg";
import ClassWidget from "components/ClassWidget";
const Todo = () => {
  const [value, setValue] = React.useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box
        sx={{
          width: "20%",
          height: "100%",
          padding: "10px",
          borderRight: "1px solid #e7e7e7",
        }}
      >
        <FlexBetween>
          <Typography
            sx={{
              color: "#009265",
              fontSize: "18px",
              textAlign: "center",
              marginLeft: "10px",
            }}
          >
            Your Todo
          </Typography>
        </FlexBetween>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TabList
              onChange={handleChangeTab}
              aria-label="lab API tabs example"
              sx={{
                color: "#009265",
                "& .MuiTab-root.Mui-selected": {
                  color: "#009265",
                },
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#009265",
                },
              }}
            >
              <Tab label="Pending" value="1" />
              <Tab label="Done" value="2" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              height: "100%",
            }}
          >
            <Box sx={{ minHeight: "430px" }}>Text</Box>
            <Box sx={{ height: "20%" }}>
              <FlexBetween
                backgroundColor="white"
                border="1px solid #e7e7e7"
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
              >
                <IconButton></IconButton>
              </FlexBetween>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Todo;
