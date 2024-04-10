import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Add,
  MoreHorizOutlined,
  ListAltRounded,
  ExpandMore,
  PersonOffRounded,
  PeopleRounded,
  StarHalfRounded,
  EmojiEventsRounded,
  ThumbDownRounded,
  SentimentDissatisfiedRounded,
  ArticleOutlined,
  BookOutlined,
  SettingsRounded,
  EditRounded,
  DeleteRounded,
  HistoryEduRounded,
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
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Autocomplete,
  Paper,
  Grid,
  Divider,
  Chip,
  Modal,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import "react-chat-elements/dist/main.css";
import dayjs from "dayjs";
import { MessageBox } from "react-chat-elements";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpg";
import DataGridCustomToolbar from "./DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import ModalAddUnit from "components/ModalAddUnit";
import { useGetUnitActivitiesQuery } from "state/api";
import AvatarName from "./AvatarName";
import Loading from "./Loading";
import ChatBoxGroup from "./ChatBoxGroup";

const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "XGrid", col2: "is Awesome" },
  { id: 3, col1: "Material-UI", col2: "is Amazing" },
  { id: 4, col1: "Hello", col2: "World" },
  { id: 5, col1: "XGrid", col2: "is Awesome" },
  { id: 6, col1: "Material-UI", col2: "is Amazing" },
  { id: 7, col1: "Hello", col2: "World" },
  { id: 8, col1: "XGrid", col2: "is Awesome" },
  { id: 9, col1: "Material-UI", col2: "is Amazing" },
  { id: 10, col1: "Hello", col2: "World" },
  { id: 11, col1: "XGrid", col2: "is Awesome" },
  { id: 12, col1: "Material-UI", col2: "is Amazing" },
  { id: 13, col1: "Hello", col2: "World" },
  { id: 14, col1: "XGrid", col2: "is Awesome" },
  { id: 15, col1: "Material-UI", col2: "is Amazing" },
  { id: 16, col1: "Hello", col2: "World" },
  { id: 17, col1: "XGrid", col2: "is Awesome" },
  { id: 18, col1: "Material-UI", col2: "is Amazing" },
  { id: 19, col1: "Hello", col2: "World" },
  { id: 20, col1: "XGrid", col2: "is Awesome" },
  { id: 21, col1: "Material-UI", col2: "is Amazing" },
  { id: 22, col1: "Hello", col2: "World" },
  { id: 23, col1: "XGrid", col2: "is Awesome" },
  { id: 24, col1: "Material-UI", col2: "is Amazing" },
];
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "col1", headerName: "Column 1", width: 130 },
  { field: "col2", headerName: "Column 2", width: 130 },
];

const unitItems = [
  { id: "1", label: "Unit 1" },
  { id: "2", label: "Unit 2" },
  { id: "3", label: "Unit 3" },
  { id: "4", label: "Unit 4" },
  { id: "5", label: "Unit 5" },
  { id: "6", label: "Unit 6" },
  { id: "7", label: "Unit 7" },
  { id: "8", label: "Unit 8" },
  { id: "9", label: "Unit 9" },
  { id: "10", label: "Unit 10" },
];

const testItems = [
  { id: "1", label: "Test 1" },
  { id: "2", label: "Test 2" },
  { id: "3", label: "Test 3" },
  { id: "4", label: "Test 4" },
  { id: "5", label: "Test 5" },
  { id: "6", label: "Test 6" },
  { id: "7", label: "Test 7" },
  { id: "8", label: "Test 8" },
  { id: "9", label: "Test 9" },
  { id: "10", label: "Test 10" },
];

const lessons = [
  {
    title: "Lesson 1",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 2",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 3",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 4",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 5",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 6",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 7",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 8",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 9",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 10",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 11",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 12",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
  {
    title: "Lesson 13",
    tests: [
      {
        name: "Test 1: Introduce about Brute-Force",
        deadline: "10pm 21-03-2024",
      },
      {
        name: "Test 2: Another Test",
        deadline: "10pm 22-03-2024",
      },
    ],
  },
];

const statisticItems = [
  {
    label: "Submitted",
    value: "10",
    icon: (
      <PeopleRounded
        sx={{
          color: "#009265",
          fontSize: "40px",
        }}
      />
    ),
  },
  {
    label: "Not Submitted",
    value: "10",
    icon: (
      <PersonOffRounded
        sx={{
          color: "#009265",
          fontSize: "40px",
        }}
      />
    ),
  },
  {
    label: "Average Score",
    value: "5",
    icon: (
      <StarHalfRounded
        sx={{
          color: "#009265",
          fontSize: "40px",
        }}
      />
    ),
  },
  {
    label: "Highest Score",
    value: "10",
    icon: (
      <EmojiEventsRounded
        sx={{
          color: "#009265",
          fontSize: "40px",
        }}
      />
    ),
  },
  {
    label: "Lowest Score",
    value: "0",
    icon: (
      <ThumbDownRounded
        sx={{
          color: "#009265",
          fontSize: "40px",
        }}
      />
    ),
  },
  {
    label: "Score less than 5",
    value: "10",
    icon: (
      <SentimentDissatisfiedRounded
        sx={{
          color: "#009265",
          fontSize: "40px",
        }}
      />
    ),
  },
];

const ClassWidget = ({ classItem, clientId }) => {
  //const userId = "1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9";
  const userId = "ce6180fb-58f4-45da-9488-a00e8edeff2c";

  // course tab
  const [value, setValue] = React.useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const [actitvity, setActivity] = React.useState("");
  const handleChangeActivity = (event) => {
    setActivity(event.target.value);
  };

  const [anchorElCreateMenu, setAnchorElCreateMenu] = useState(null);
  const isOpenCreateMenu = Boolean(anchorElCreateMenu);
  const handleClickCreateMenu = (event) =>
    setAnchorElCreateMenu(event.currentTarget);
  const handleCloseCreateMenu = () => setAnchorElCreateMenu(null);

  const [anchorElActivityMenu, setAnchorElActivityMenu] = useState(null);
  const isOpenActivityMenu = Boolean(anchorElActivityMenu);
  const handleClickActivityMenu = (event) =>
    setAnchorElActivityMenu(event.currentTarget);
  const handleCloseActivityMenu = () => setAnchorElActivityMenu(null);

  const [openAddUnit, setOpenAddUnit] = useState(false);
  const handleOpenAddUnit = () => setOpenAddUnit(true);
  const handleCloseAddUnit = () => setOpenAddUnit(false);

  const navigate = useNavigate();

  const { data: unitsData, isLoading: isUnitsLoading } =
    useGetUnitActivitiesQuery(classItem?.ma_lopHoc);

  // grade tab
  const [age, setAge] = React.useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  if (isUnitsLoading) {
    return <Loading />;
  }
  return (
    <Box
      sx={{
        height: "100%",
        width: "80%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "50px",
          borderBottom: "1px solid #e7e7e7",
          padding: "5px 20px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <AvatarName name={classItem?.ten} />
        {/* <Box
          component="img"
          alt="profile"
          src={classItem?.anhDaiDien}
          height="39px"
          width="39px"
          borderRadius="50%"
          sx={{ objectFit: "cover" }}
        /> */}

        <Typography
          sx={{
            height: "40px",
            fontSize: "18px",
            padding: "7px 15px",
          }}
        >
          {classItem?.ten}
        </Typography>
      </Box>
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
            {classItem?.ma_giangVien === userId && (
              <Tab label="Grade" value="3" />
            )}
          </TabList>
          {classItem?.ma_giangVien === userId && (
            <IconButton
              sx={{
                color: "#666666",
                width: "40px",
                marginRight: "30px",
              }}
              onClick={() => navigate(`/classDetail/${classItem?.ma_lopHoc}`)}
            >
              <SettingsRounded />
            </IconButton>
          )}
        </Box>

        {/* CHATROOM TAB */}
        <TabPanel
          value="1"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "unset",
            height: "calc(100% - 98.8px)",
          }}
        >
          {classItem && clientId && (
            <ChatBoxGroup classItem={classItem} clientId={clientId} />
          )}
        </TabPanel>

        {/* COURSE TAB */}
        <TabPanel
          value="2"
          sx={{
            padding: "0 20px 10px",
            height: "calc(100% - 98.8px)",
            display: "flex",
            flexDirection: "column",
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
              {classItem?.ma_giangVien === userId && (
                <FlexBetween>
                  <Button
                    onClick={handleClickCreateMenu}
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
                    anchorEl={anchorElCreateMenu}
                    open={isOpenCreateMenu}
                    onClose={handleCloseCreateMenu}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <nav>
                      <MenuItem
                        onClick={
                          (handleCloseCreateMenu, () => navigate("/tests/add"))
                        }
                      >
                        <FlexBetween width="60%">
                          <HistoryEduRounded />
                          <Typography>Test</Typography>
                        </FlexBetween>
                      </MenuItem>
                      <MenuItem onClick={handleCloseCreateMenu}>
                        <FlexBetween width="90%">
                          <ArticleOutlined />
                          <Typography>Exercise</Typography>
                        </FlexBetween>
                      </MenuItem>
                      <MenuItem onClick={handleCloseCreateMenu}>
                        <FlexBetween>
                          <BookOutlined />
                          <Typography>Document</Typography>
                        </FlexBetween>
                      </MenuItem>
                    </nav>
                    <Divider color="#666666" />
                    <nav>
                      <MenuItem
                        onClick={(handleCloseCreateMenu, handleOpenAddUnit)}
                      >
                        <FlexBetween width="60%">
                          <ListAltRounded />
                          <Typography>Unit</Typography>
                        </FlexBetween>
                      </MenuItem>
                      <ModalAddUnit
                        open={openAddUnit}
                        handleClose={handleCloseAddUnit}
                      />
                    </nav>
                  </Menu>
                </FlexBetween>
              )}
            </FlexBetween>
          </FlexBetween>

          {/* UNITS CONTAINER */}
          <Box
            mt="10px"
            sx={{
              height: "100%",
              maxHeight: "510px",
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
            {unitsData?.map((unit, index) => (
              <Accordion
                key={index}
                sx={{
                  border: "1px solid #e7e7e7",
                  marginBottom: "10px",
                }}
              >
                <FlexBetween>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    sx={{
                      flexDirection: "row-reverse",
                      width: "100%",
                      ".MuiAccordionSummary-content": { marginLeft: "12px" },
                      ".MuiAccordionSummary-content.Mui-expanded": {
                        margin: "12px 0 12px 12px",
                      },
                    }}
                  >
                    {unit.chuong.ten}
                  </AccordionSummary>
                  {classItem?.ma_giangVien === userId && (
                    <IconButton
                      sx={{
                        color: "#009265",
                        width: "40px",
                        marginRight: "30px",
                      }}
                      onClick={handleClickActivityMenu}
                    >
                      <MoreHorizOutlined />
                    </IconButton>
                  )}
                </FlexBetween>

                <AccordionDetails sx={{ padding: "unset" }}>
                  <List>
                    {unit.deKiemTra.map((test, testIndex) => (
                      <ListItem
                        key={testIndex}
                        disablePadding
                        onClick={() =>
                          classItem?.ma_giangVien === userId
                            ? navigate(`/tests/${test.ma_deKiemTra}/common`)
                            : navigate(`/tests/${test.ma_deKiemTra}/do`)
                        }
                      >
                        <ListItemButton sx={{ height: "80px" }}>
                          <ListItemIcon>
                            <HistoryEduRounded />
                          </ListItemIcon>
                          <Box width="100%">
                            <Box display="flex" flexDirection="row">
                              <Typography variant="h6">
                                {test.tieuDe}
                              </Typography>
                              <Box p="3px 0 3px 10px">
                                <Chip
                                  label="Ongoing"
                                  color="success"
                                  size="small"
                                />
                              </Box>
                            </Box>
                            <Typography color="#666666">
                              Deadline:{" "}
                              {dayjs(test.thoiGianBatDau).format(
                                "HH:mm - DD/MM/YYYY",
                              ) +
                                " to " +
                                dayjs(test.hanChotNopBai).format(
                                  "HH:mm - DD/MM/YYYY",
                                )}
                            </Typography>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ))}
                    {unit.baiTap.map((exercise, exerciseIndex) => (
                      <ListItem key={exerciseIndex} disablePadding>
                        <ListItemButton sx={{ height: "80px" }}>
                          <ListItemIcon>
                            <ArticleOutlined />
                          </ListItemIcon>
                          <Box width="100%">
                            <Box display="flex" flexDirection="row">
                              <Typography variant="h6">
                                {exercise.tieuDe}
                              </Typography>
                              <Box p="3px 0 3px 10px">
                                <Chip
                                  label="Ongoing"
                                  color="success"
                                  size="small"
                                />
                              </Box>
                            </Box>
                            <Typography color="#666666">
                              Deadline:{" "}
                              {dayjs(exercise.thoiGianBatDau).format(
                                "HH:mm - DD/MM/YYYY",
                              ) +
                                " to " +
                                dayjs(exercise.thoiGianKetThuc).format(
                                  "HH:mm - DD/MM/YYYY",
                                )}
                            </Typography>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ))}
                    {unit.hocLieu.map((document, documentIndex) => (
                      <ListItem key={documentIndex} disablePadding>
                        <ListItemButton sx={{ height: "80px" }}>
                          <ListItemIcon>
                            <BookOutlined />
                          </ListItemIcon>
                          <Box width="100%">
                            <Typography variant="h6">
                              {document.tieuDe}
                            </Typography>
                            <Typography color="#666666">
                              Create at:
                              {" " +
                                dayjs(document.thoiGianTao).format(
                                  "HH:mm - DD/MM/YYYY",
                                )}
                            </Typography>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}

            {/* Activity Menu */}
            <Menu
              anchorEl={anchorElActivityMenu}
              open={isOpenActivityMenu}
              onClose={handleCloseActivityMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleCloseCreateMenu}>
                <FlexBetween>
                  <EditRounded color="primary" />
                  <Typography color="primary">Edit</Typography>
                </FlexBetween>
              </MenuItem>
              <MenuItem onClick={handleCloseCreateMenu}>
                <FlexBetween>
                  <DeleteRounded color="error" />
                  <Typography color="error">Delete</Typography>
                </FlexBetween>
              </MenuItem>
            </Menu>
          </Box>
        </TabPanel>

        {/* GRADE TAB */}
        {classItem?.ma_giangVien === userId && (
          <TabPanel
            value="3"
            sx={{
              padding: "10px 20px",
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
            <Box>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  sx={{
                    minWidth: "200px",
                  }}
                  color="success"
                >
                  <MenuItem value="">Exercise</MenuItem>
                  <MenuItem value={2}>Test</MenuItem>
                </Select>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={unitItems}
                  sx={{ width: 400, marginLeft: "10px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Unit" color="success" />
                  )}
                  size="small"
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={testItems}
                  sx={{ width: 400, marginLeft: "10px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Test Title" color="success" />
                  )}
                  size="small"
                />
              </FormControl>
              <Typography variant="h6" color="#009265" fontWeight="bold">
                General
              </Typography>
              <Box sx={{ flexGrow: 1, marginTop: "10px" }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {statisticItems.map((item, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <Paper>
                        <Box
                          sx={{
                            padding: "10px",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Box width="80%">
                            <Typography variant="h4">{item.value}</Typography>
                            <Typography variant="h7" color="#009265">
                              {item.label}
                            </Typography>
                          </Box>
                          <Box width="20%" p="15px 0">
                            {item.icon}
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Typography
                variant="h6"
                color="#009265"
                fontWeight="bold"
                mt="10px"
              >
                Chart
              </Typography>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
                series={[
                  {
                    data: [2, 5, 2, 8, 1, 5, 10, 3, 7, 4],
                  },
                ]}
                fullWidth
                height={500}
              />
              <Typography
                variant="h6"
                color="#009265"
                fontWeight="bold"
                mt="10px"
              >
                Score Table
              </Typography>
              <Box
                height="80vh"
                mt="10px"
                /* sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.primary.light,
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${theme.palette.secondary[200]} !important`,
                },
              }} */
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  rowsPerPageOptions={[20, 50, 100]}
                  pagination
                  paginationMode="server"
                  sortingMode="server"
                  components={{ Toolbar: DataGridCustomToolbar }}
                  componentsProps={{
                    toolbar: { searchInput, setSearchInput, setSearch },
                  }}
                />
              </Box>
            </Box>
          </TabPanel>
        )}
      </TabContext>
    </Box>
  );
};

export default ClassWidget;
