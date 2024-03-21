import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Tab,
  Tabs,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import {
  AssignmentOutlined,
  NoteAltOutlined,
  HourglassEmpty,
  EventAvailable,
  RefreshOutlined,
} from "@mui/icons-material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%", height: "100%" }}
    >
      <Box sx={{ p: 1.5, height: "calc(100% - 24px)" }}>
        {value === index && (
          <Typography component="span">{children}</Typography>
        )}
      </Box>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Todo = () => {
  // course tab
  const [value, setValue] = React.useState(0);
  const [classes, setClasses] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChangeClasses = (event) => {
    setClasses(event.target.value);
  };
  const handleClick = () => {
    // setAnchorEl(event.currentTarget);
    console.log("Submit");
  };
  const handleChangeCategories = (event) => {
    setCategories(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        width: "100%",
        height: "calc(100% - 50.8px)",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        TabIndicatorProps={{
          sx: { backgroundColor: "#009265" },
        }}
        sx={{
          borderRight: 1,
          width: "15%",
          display: "flex",
          flexDirection: "column",
          paddingTop: "16px",
          color: "#009265",
          "& .MuiTab-root.Mui-selected": {
            color: "white",
            backgroundColor: "#009265",
            borderColor: "#009265",

            "&:hover": {
              backgroundColor: "#009265",
            },
          },
          "& .MuiTab-root:not(.Mui-selected):hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Tab
          label={
            <React.Fragment>
              <HourglassEmpty />
              Đang chờ
            </React.Fragment>
          }
          sx={{
            textTransform: "none",
            fontWeight: "semibold",
            fontSize: "18px",
            marginRight: "10px",
            paddingLeft: "32px",
            border: "none",
            borderRadius: "0 20px 20px 0",
            display: "flex",
            flexDirection: "row",
            gap: "25px",
            justifyContent: "flex-start",
          }}
          {...a11yProps(0)}
        />
        <Tab
          label={
            <React.Fragment>
              <EventAvailable />
              Đã xong
            </React.Fragment>
          }
          sx={{
            textTransform: "none",
            fontWeight: "semibold",
            fontSize: "18px",
            marginRight: "10px",
            paddingLeft: "32px",
            border: "none",
            borderRadius: "0 20px 20px 0",
            display: "flex",
            flexDirection: "row",
            gap: "25px",
            justifyContent: "flex-start",
          }}
          {...a11yProps(1)}
        />
      </Tabs>
      {/* TabPanel Pending */}
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* TOOLBAR */}
          <FlexBetween>
            <FlexBetween>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={classes}
                  onChange={handleChangeClasses}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  sx={{
                    minWidth: "200px",
                  }}
                  color="success"
                >
                  <MenuItem value="">All classes</MenuItem>
                  <MenuItem value={10}>Công nghệ phần mềm</MenuItem>
                  <MenuItem value={20}>Kiểm thử phần mềm</MenuItem>
                  <MenuItem value={30}>Phát triển mã nguồn mở</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={categories}
                  onChange={handleChangeCategories}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  sx={{
                    minWidth: "200px",
                  }}
                  color="success"
                >
                  <MenuItem value="">Tất cả thể loại</MenuItem>
                  <MenuItem value={10}>Bài tập</MenuItem>
                  <MenuItem value={20}>Bài kiểm tra</MenuItem>
                  <MenuItem value={30}>Tài liệu</MenuItem>
                </Select>
              </FormControl>
              <Button
                sx={{
                  color: "gray",
                }}
              >
                <RefreshOutlined />
              </Button>
            </FlexBetween>
          </FlexBetween>

          {/* UNITS CONTAINER */}
          <Box
            mt="10px"
            sx={{
              height: "100%",
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
            <List
              sx={{
                padding: "0",
              }}
              component="span"
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ height: "80px", padding: "10px 25px" }}>
                  <ListItemIcon>
                    <NoteAltOutlined />
                  </ListItemIcon>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" component="span">
                        Test 1: Introduce about Brute-Force
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label="Test"
                          color="success"
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                    <Typography color="#666666">
                      Deadline: 10pm 21-03-2024 | Kiểm thử phần mềm
                    </Typography>
                  </Box>
                  <Button
                    onClick={handleClick}
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                      marginLeft: "auto",
                      padding: "5px 25px",
                      backgroundColor: "#009265",
                      "&:hover": {
                        backgroundColor: "#007850",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Submit
                      </Typography>
                    </Box>
                  </Button>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ height: "80px", padding: "10px 25px" }}>
                  <ListItemIcon>
                    <AssignmentOutlined />
                  </ListItemIcon>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" component="span">
                        Assignment 1: Introduce about Brute-Force
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label="Assignment"
                          color="success"
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                    <Typography color="#666666">
                      Deadline: 10pm 21-03-2024 | Kiểm thử phần mềm
                    </Typography>
                  </Box>
                  <Button
                    onClick={handleClick}
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                      marginLeft: "auto",
                      padding: "5px 25px",
                      backgroundColor: "#009265",
                      "&:hover": {
                        backgroundColor: "#007850",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Submit
                      </Typography>
                    </Box>
                  </Button>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>
      {/* TabPanel Done */}
      <TabPanel value={value} index={1}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* TOOLBAR */}
          <FlexBetween>
            <FlexBetween>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={classes}
                  onChange={handleChangeClasses}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  sx={{
                    minWidth: "200px",
                  }}
                  color="success"
                >
                  <MenuItem value="">All classes</MenuItem>
                  <MenuItem value={10}>Công nghệ phần mềm</MenuItem>
                  <MenuItem value={20}>Kiểm thử phần mềm</MenuItem>
                  <MenuItem value={30}>Phát triển mã nguồn mở</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  value={categories}
                  onChange={handleChangeCategories}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  sx={{
                    minWidth: "200px",
                  }}
                  color="success"
                >
                  <MenuItem value="">Tất cả thể loại</MenuItem>
                  <MenuItem value={10}>Bài tập</MenuItem>
                  <MenuItem value={20}>Bài kiểm tra</MenuItem>
                  <MenuItem value={30}>Tài liệu</MenuItem>
                </Select>
              </FormControl>
              <Button
                sx={{
                  color: "gray",
                }}
              >
                <RefreshOutlined />
              </Button>
            </FlexBetween>
          </FlexBetween>

          {/* UNITS CONTAINER */}
          <Box
            mt="10px"
            sx={{
              height: "100%",
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
            <List
              sx={{
                padding: "0",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ height: "80px", padding: "10px 25px" }}>
                  <ListItemIcon>
                    <NoteAltOutlined />
                  </ListItemIcon>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" component="span">
                        Test 2: Introduce about Brute-Force
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label="Test"
                          color="success"
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                    <Typography color="#666666">
                      Deadline: 10pm 21-03-2024 | Kiểm thử phần mềm
                    </Typography>
                  </Box>
                  <Button
                    onClick={handleClick}
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                      marginLeft: "auto",
                      padding: "5px 25px",
                      backgroundColor: "#009265",
                      "&:hover": {
                        backgroundColor: "#007850",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Submit
                      </Typography>
                    </Box>
                  </Button>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton sx={{ height: "80px", padding: "10px 25px" }}>
                  <ListItemIcon>
                    <AssignmentOutlined />
                  </ListItemIcon>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" component="span">
                        Assignment 2: Introduce about Brute-Force
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label="Assignment"
                          color="success"
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                    <Typography color="#666666">
                      Deadline: 10pm 21-03-2024 | Kiểm thử phần mềm
                    </Typography>
                  </Box>
                  <Button
                    onClick={handleClick}
                    sx={{
                      textTransform: "none",
                      borderRadius: "20px",
                      marginLeft: "auto",
                      padding: "5px 25px",
                      backgroundColor: "#009265",
                      "&:hover": {
                        backgroundColor: "#007850",
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Submit
                      </Typography>
                    </Box>
                  </Button>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default Todo;
