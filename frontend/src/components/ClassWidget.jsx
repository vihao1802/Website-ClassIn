import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  MoreHorizOutlined,
  SendRounded,
  Add,
  ExpandMore,
  Inbox,
  Drafts,
} from "@mui/icons-material";
import {
  Tab,
  IconButton,
  Box,
  Typography,
  InputBase,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Menu,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import FlexBetween from "./FlexBetween";

const ClassWidget = () => {
  const [value, setValue] = React.useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const [actitvity, setActivity] = React.useState("");
  const handleChangeActivity = (event) => {
    setActivity(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ height: "100%", width: "80%" }}>
      <Typography
        sx={{
          height: "40px",
          borderBottom: "1px solid #e7e7e7",
          fontSize: "18px",
          padding: "7px 15px",
        }}
      >
        Công nghệ phần mềm
      </Typography>
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
            <Tab label="Chat Room" value="1" />
            <Tab label="Course" value="2" />
            <Tab label="Grade" value="3" />
          </TabList>
          <IconButton
            sx={{
              color: "#009265",
              width: "40px",
              marginRight: "30px",
            }}
          >
            <MoreHorizOutlined />
          </IconButton>
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
              <InputBase placeholder="Aa" />
              <IconButton>
                <SendRounded sx={{ color: "#009265" }} />
              </IconButton>
            </FlexBetween>
          </Box>
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            padding: "10px 30px",
            height: "100%",
          }}
        >
          {/* TOOLBAR */}
          <FlexBetween>
            <FlexBetween>
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                size="small"
                color="success"
                sx={{
                  minWidth: "300px",
                }}
              />
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={actitvity}
                  onChange={handleChangeActivity}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  sx={{
                    minWidth: "200px",
                  }}
                  color="success"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value={10}>Exercise</MenuItem>
                  <MenuItem value={20}>Test</MenuItem>
                  <MenuItem value={30}>Document</MenuItem>
                </Select>
              </FormControl>
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
                    width: "100px",
                    height: "40px",
                  }}
                >
                  <Box textAlign="left">
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "14px",
                        textAlign: "center",
                        marginLeft: "5px",
                      }}
                    >
                      Create
                    </Typography>
                  </Box>
                  <Add
                    sx={{
                      color: "white",
                      fontSize: "18px",
                      marginRight: "10px",
                    }}
                  />
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
                  <MenuItem onClick={handleClose}>
                    <FlexBetween>
                      <Add />
                      <Typography>Unit</Typography>
                    </FlexBetween>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Test</MenuItem>
                  <MenuItem onClick={handleClose}>Exercise</MenuItem>
                  <MenuItem onClick={handleClose}>Document</MenuItem>
                </Menu>
              </FlexBetween>
            </FlexBetween>
          </FlexBetween>

          {/* UNITS CONTAINER */}
          <Box
            mt="10px"
            sx={{
              height: "400px",
              overflowY: "scroll",
              "::-webkit-scrollbar": { width: "10px" },
              "::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#858585",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "#777",
              },
            }}
          >
            <Accordion sx={{ border: "1px solid #e7e7e7" }}>
              <FlexBetween>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                  sx={{ flexDirection: "row-reverse" }}
                >
                  Lesson 1
                </AccordionSummary>
                <IconButton
                  sx={{
                    color: "#009265",
                    width: "40px",
                    marginRight: "30px",
                  }}
                >
                  <MoreHorizOutlined />
                </IconButton>
              </FlexBetween>
              <AccordionDetails sx={{ padding: "unset" }}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ height: "80px" }}>
                      <ListItemIcon>
                        <Inbox />
                      </ListItemIcon>
                      <Box>
                        <Typography variant="h6">
                          Test 1: Introduce about Brute-Force
                        </Typography>
                        <Typography color="#666666">
                          Deadline: 10pm 21-03-2024
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                  `
                  <ListItem disablePadding>
                    <ListItemButton sx={{ height: "80px" }}>
                      <ListItemIcon>
                        <Inbox />
                      </ListItemIcon>
                      {/* <ListItemText primary="Inbox" /> */}
                      <Box>
                        <Typography variant="h6">
                          Test 1: Introduce about Brute-Force
                        </Typography>
                        <Typography color="#666666">
                          Deadline: 10pm 21-03-2024
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                  `
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
};

export default ClassWidget;
