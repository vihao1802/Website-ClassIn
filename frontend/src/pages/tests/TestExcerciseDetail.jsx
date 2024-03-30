import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Grid,
  Tab,
  TextField,
  Chip,
} from "@mui/material";
import {
  CalendarTodayRounded,
  DateRangeRounded,
  AccessAlarmRounded,
  AbcRounded,
  SchoolRounded,
  ArticleRounded,
  LocalLibraryRounded,
  PeopleRounded,
  PersonOffRounded,
  StarHalfRounded,
  EmojiEventsRounded,
  ThumbDownRounded,
  SentimentDissatisfiedRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import HomeNavbar from "components/HomeNavbar";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpg";
import React from "react";

const detailItems = [
  {
    title: "Test Name",
    icon: <AbcRounded color="#009265" sx={{ color: "#009265" }} />,
    content: "Test 1",
  },
  {
    title: "Create at",
    icon: <CalendarTodayRounded sx={{ color: "#009265" }} />,
    content: "2021-10-10",
  },
  {
    title: "Test Date",
    icon: <DateRangeRounded sx={{ color: "#009265" }} />,
    content: "2021-10-10 - 2021-10-10",
  },
  {
    title: "Test Duration",
    icon: <AccessAlarmRounded sx={{ color: "#009265" }} />,
    content: "90 min",
  },
  {
    title: "Class",
    icon: <SchoolRounded sx={{ color: "#009265" }} />,
    content: "Cong nghe phan mem",
  },
  {
    title: "Unit",
    icon: <ArticleRounded sx={{ color: "#009265" }} />,
    content: "Unit 1",
  },
  {
    title: "Instructor",
    icon: <LocalLibraryRounded sx={{ color: "#009265" }} />,
    content: "Hu Chuynh",
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

const submittedcolumns = [
  { field: "id", headerName: "ID", width: 100, editable: false },
  {
    field: "studentname",
    headerName: "Student Name",
    width: 300,
    editable: false,
    sortable: false,
    renderCell: (item) => {
      return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="32px"
            width="32px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              color: "black",
              marginLeft: "10px",
              padding: "5px 0",
            }}
          >
            {item.value}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "examtimes",
    headerName: "Exam Times",
    width: 200,
    editable: false,
    sortable: false,
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 100,
    editable: false,
    sortable: false,
  },
  {
    field: "score",
    headerName: "Score",
    width: 100,
    editable: false,
    sortable: false,
  },
  {
    field: "detail",
    headerName: "Detail",
    width: 100,
    sortable: false,
    type: "actions",
    getActions: () => {
      return [
        <GridActionsCellItem
          icon={<VisibilityRounded sx={{ color: "#009265" }} />}
          label="Detail"
          className="textPrimary"
          color="inherit"
        />,
      ];
    },
  },
];

const submittedrows = [
  {
    id: 1,
    studentname: "Jimmy",
    examtimes: "2021-10-10 22:00",
    duration: "15:25",
    score: "8",
  },
  {
    id: 2,
    studentname: "Tony",
    examtimes: "2021-10-10 22:00",
    duration: "15:25",
    score: "10",
  },
  {
    id: 3,
    studentname: "Peter",
    examtimes: "2021-10-10 22:00",
    duration: "15:25",
    score: "5",
  },
  {
    id: 4,
    studentname: "Mary",
    examtimes: "2021-10-10 22:00",
    duration: "15:25",
    score: "6",
  },
  {
    id: 5,
    studentname: "John",
    examtimes: "2021-10-10 22:00",
    duration: "15:25",
    score: "9",
  },
  {
    id: 6,
    studentname: "Jimmy",
    examtimes: "2021-10-10 22:00",
    duration: "15:25",
    score: "8",
  },
];

const unsubmittedcolumns = [
  { field: "id", headerName: "ID", width: 100, editable: false },
  {
    field: "studentname",
    headerName: "Student Name",
    width: 300,
    editable: false,
    sortable: false,
    renderCell: (item) => {
      return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="32px"
            width="32px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              color: "black",
              marginLeft: "10px",
              padding: "5px 0",
            }}
          >
            {item.value}
          </Typography>
        </Box>
      );
    },
  },
];

const unsubmittedrows = [
  {
    id: 1,
    studentname: "Jimmy",
  },
  {
    id: 2,
    studentname: "Tony",
  },
  {
    id: 3,
    studentname: "Peter",
  },
  {
    id: 4,
    studentname: "Mary",
  },
  {
    id: 5,
    studentname: "John",
  },
  {
    id: 6,
    studentname: "Jimmy",
  },
];

const TestExcerciseDetail = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <HomeNavbar IsNotHomePage={true} title="Detail" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "calc(100%-50.8px)",
        }}
      >
        {/* LEFT */}
        <Box
          sx={{
            width: "30%",
            height: "100%",
            padding: "20px",
          }}
        >
          <Paper
            sx={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
            elevation={3}
          >
            <FlexBetween>
              <Typography variant="h6" color="#009265" fontWeight="bold">
                Test Detail
              </Typography>
              <Chip
                variant="outlined"
                color="success"
                label="Ongoing"
                size="small"
              />
            </FlexBetween>
            <Box mb="10px">
              {detailItems.map((item, index) => (
                <FlexBetween mt="5px" key={"secretkey-" + index}>
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    {item.icon}
                    <Typography
                      variant="body1"
                      ml="10px"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>{item.title}:</em>
                    </Typography>
                  </Box>
                  <Typography fontWeight="bold">{item.content}</Typography>
                </FlexBetween>
              ))}
            </Box>
            <Divider color="#666666" />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#009265",
                "&:hover": { backgroundColor: "#007850" },
                width: "100%",
                marginTop: "10px",
              }}
            >
              See Details
            </Button>
          </Paper>
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            width: "70%",
            height: "100%",
            padding: "20px",
          }}
        >
          {/* <Box sx={{ flexGrow: 1, marginTop: "10px" }}>
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
          </Box> */}
          <Paper sx={{ width: "100%", typography: "body1" }} elevation={3}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
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
                  <Tab label="UnSubmitted" value="1" />
                  <Tab label="Submitted" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "unset",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid #e7e7e7",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "white",
                      color: "#009265",
                      borderBottom: "1px solid #e7e7e7",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: "white",
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: "white",
                      color: "black",
                      borderTop: "1px solid #e7e7e7",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                      color: `#009265 !important`,
                    },
                    "& .MuiTablePagination-selectLabel": {
                      margin: "unset",
                    },
                    "& .MuiTablePagination-displayedRows": {
                      margin: "unset",
                    },
                    overflow: "unset",
                  }}
                >
                  <DataGrid
                    rows={unsubmittedrows}
                    columns={unsubmittedcolumns}
                    slots={{
                      toolbar: () => {
                        return (
                          <GridToolbarContainer>
                            <Box pr="5px" width="300px">
                              <TextField
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                size="small"
                                color="success"
                                fullWidth
                              />
                            </Box>
                          </GridToolbarContainer>
                        );
                      },
                    }}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10]}
                    sx={{ padding: "0 20px" }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="2" p="unset">
                <Box
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "unset",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "1px solid #e7e7e7",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "white",
                      color: "#009265",
                      borderBottom: "1px solid #e7e7e7",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: "white",
                    },
                    "& .MuiDataGrid-footerContainer": {
                      backgroundColor: "white",
                      color: "black",
                      borderTop: "1px solid #e7e7e7",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                      color: `#009265 !important`,
                    },
                    "& .MuiTablePagination-selectLabel": {
                      margin: "unset",
                    },
                    "& .MuiTablePagination-displayedRows": {
                      margin: "unset",
                    },
                    overflow: "unset",
                  }}
                >
                  <DataGrid
                    rows={submittedrows}
                    columns={submittedcolumns}
                    slots={{
                      toolbar: () => {
                        return (
                          <GridToolbarContainer>
                            <Box pr="5px" width="300px">
                              <TextField
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                size="small"
                                color="success"
                                fullWidth
                              />
                            </Box>
                          </GridToolbarContainer>
                        );
                      },
                    }}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10]}
                    sx={{ padding: "0 20px" }}
                  />
                </Box>
              </TabPanel>
            </TabContext>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default TestExcerciseDetail;
