import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  MoreHorizOutlined,
  SendRounded,
  Add,
  ExpandMore,
  Inbox,
  PersonOffRounded,
  PeopleRounded,
  StarHalfRounded,
  EmojiEventsRounded,
  ThumbDownRounded,
  SentimentDissatisfiedRounded,
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
} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpg";
import DataGridCustomToolbar from "./DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";

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

const messageItems = [
  {
    text: "Chào mừng bạn đến với ứng dụng chat!",
    position: "left",
    name: "Admin",
  },
  {
    text: "Xin chào! Bạn cần hỗ trợ gì hôm nay?",
    position: "left",
    name: "User1",
  },
  {
    text: "Tôi đang tìm hiểu về các tính năng của ứng dụng.",
    position: "right",
    name: "Admin",
  },
  {
    text: "Rất vui được giúp đỡ. Bạn muốn biết điều gì cụ thể?",
    position: "right",
    name: "User1",
  },
  {
    text: "Có tính năng nào giúp tìm kiếm bạn bè không?",
    position: "left",
    name: "Admin",
  },
  {
    text: "Có, bạn có thể sử dụng tính năng tìm kiếm để tìm kiếm bạn bè.",
    position: "right",
    name: "User1",
  },
  {
    text: "Tôi thấy rất hứng thú! Làm thế nào để kết bạn mới?",
    position: "left",
    name: "Admin",
  },
  {
    text: "Bạn có thể sử dụng chức năng kết bạn và gửi lời mời kết bạn đến người khác.",
    position: "left",
    name: "User1",
  },
  {
    text: "Cảm ơn bạn! Tôi sẽ thử ngay bây giờ.",
    position: "right",
    name: "Admin",
  },
  {
    text: "Chúc bạn có trải nghiệm tuyệt vời! Hãy thông báo nếu cần thêm sự hỗ trợ.",
    position: "left",
    name: "Admin",
  },
  { text: "Message 11", position: "right", name: "User1" },
  { text: "Message 12", position: "left", name: "User2" },
  { text: "Message 13", position: "left", name: "User3" },
  { text: "Message 14", position: "right", name: "User2" },
  { text: "Message 15", position: "left", name: "User1" },
  { text: "Message 16", position: "right", name: "Admin" },
  { text: "Message 17", position: "left", name: "User3" },
  { text: "Message 18", position: "right", name: "User2" },
  { text: "Message 19", position: "right", name: "User1" },
  { text: "Message 20", position: "left", name: "User3" },
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

const ClassWidget = () => {
  // course tab
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
  const handleCloseCreateMenu = () => setAnchorEl(null);

  const navigate = useNavigate();

  // grade tab
  const [age, setAge] = React.useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "80%",
        display: "flex",
        flexDirection: "column",
      }}
    >
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

        {/* CHATROOM TAB */}
        <TabPanel
          value="1"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "unset",
            height: "100%",
          }}
        >
          <Box
            sx={{
              minHeight: "430px",
              height: "460px",
              overflowY: "scroll",
              backgroundColor: "#e7e7e7",
              padding: "10px",
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
            {messageItems.map((item) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: item.position,
                      marginBottom: "5px",
                    }}
                  >
                    <Box
                      component="img"
                      alt="profile"
                      src={profileImage}
                      height="36px"
                      width="36px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover" }}
                    />
                  </Box>
                  <MessageBox
                    position={item.position}
                    type={"text"}
                    text={item.text}
                    date={new Date()}
                    title={item.name}
                    titleColor="#009265"
                    styles={{ maxWidth: "400px" }}
                  />
                </Box>
              );
            })}
          </Box>
          <Box sx={{ height: "20%", marginTop: "10px", padding: "0 20px" }}>
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

        {/* COURSE TAB */}
        <TabPanel
          value="2"
          sx={{
            padding: "0 20px",
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
                  onClose={handleCloseCreateMenu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={handleCloseCreateMenu}>
                    <FlexBetween>
                      <Add />
                      <Typography>Unit</Typography>
                    </FlexBetween>
                  </MenuItem>
                  <MenuItem
                    onClick={
                      (handleCloseCreateMenu, () => navigate("/tests/add"))
                    }
                  >
                    Test
                  </MenuItem>
                  <MenuItem onClick={handleCloseCreateMenu}>Exercise</MenuItem>
                  <MenuItem onClick={handleCloseCreateMenu}>Document</MenuItem>
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
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        </TabPanel>

        {/* GRADE TAB */}
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
      </TabContext>
    </Box>
  );
};

export default ClassWidget;
