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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useGetTestByTestIdQuery,
  useGetUserSubmissionsDetailsQuery,
} from "state/api";
import Loading from "components/Loading";
import dayjs from "dayjs";
import AvatarName from "components/AvatarName";

const TestExcerciseDetail = () => {
  const navigate = useNavigate();
  const { testId } = useParams();

  const submittedcolumns = [
    {
      field: "hoTen",
      headerName: "Student Name",
      width: 250,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/* <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="32px"
            width="32px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          /> */}
            <AvatarName name={item.value} />
            <Typography
              sx={{
                fontSize: "16px",
                color: "black",
                marginLeft: "10px",
                padding: "10px 0",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "khoangThoiGianLamBai",
      headerName: "Exam Times",
      width: 300,
      editable: false,
      sortable: false,
    },
    {
      field: "thoiGianLamBai",
      headerName: "Duration (min)",
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: "diem",
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
      getActions: (item) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityRounded color="primary" />}
            label="Detail"
            className="textPrimary"
            color="inherit"
            onClick={() => {
              navigate(`/tests/${testId}/work/${item.row.ma_baiLamKiemTra}`);
            }}
          />,
        ];
      },
    },
  ];

  const unsubmittedcolumns = [
    {
      field: "hoTen",
      headerName: "Student Name",
      width: 800,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/* <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="32px"
            width="32px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          /> */}
            <AvatarName name={item.value} />
            <Typography
              sx={{
                fontSize: "16px",
                color: "black",
                marginLeft: "10px",
                padding: "10px 0",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: testItemData, isLoading: isTestItemLoading } =
    useGetTestByTestIdQuery(testId);

  const {
    data: userSubmissionDetail,
    isLoading: isUserSubmissionDetailLoading,
  } = useGetUserSubmissionsDetailsQuery(testId);

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
                variant="primary"
                color="success"
                label="Ongoing"
                size="small"
              />
            </FlexBetween>
            {testItemData || !isTestItemLoading ? (
              <Box mb="10px">
                <FlexBetween mt="5px">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <AbcRounded color="#009265" sx={{ color: "#009265" }} />
                    <Typography
                      variant="body1"
                      ml="10px"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>Test Name:</em>
                    </Typography>
                  </Box>
                  <Typography fontWeight="bold">
                    {testItemData.tieuDe}
                  </Typography>
                </FlexBetween>
                <FlexBetween mt="5px">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <CalendarTodayRounded sx={{ color: "#009265" }} />
                    <Typography
                      variant="body1"
                      ml="10px"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>Create At:</em>
                    </Typography>
                  </Box>
                  <Typography fontWeight="bold">
                    {dayjs(testItemData.thoiGianTao).format("HH:mm DD/MM/YYYY")}
                  </Typography>
                </FlexBetween>
                <FlexBetween mt="5px">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <DateRangeRounded sx={{ color: "#009265" }} />
                    <Typography
                      variant="body1"
                      ml="10px"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>Test Date:</em>
                    </Typography>
                  </Box>
                  <Typography fontWeight="bold">
                    {dayjs(testItemData.thoiGianBatDau).format(
                      "HH:mm DD/MM/YY",
                    ) +
                      " - " +
                      dayjs(testItemData.hanChotNopBai).format(
                        "HH:mm DD/MM/YY",
                      )}
                  </Typography>
                </FlexBetween>
                <FlexBetween mt="5px">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <AccessAlarmRounded sx={{ color: "#009265" }} />
                    <Typography
                      variant="body1"
                      ml="10px"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>Test Duration:</em>
                    </Typography>
                  </Box>
                  <Typography fontWeight="bold">
                    {testItemData.thoiGianLamBai + " min"}
                  </Typography>
                </FlexBetween>
                <FlexBetween mt="5px">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <SchoolRounded sx={{ color: "#009265" }} />
                    <Typography
                      variant="body1"
                      ml="10px"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>Class:</em>
                    </Typography>
                  </Box>
                  <Typography fontWeight="bold">
                    {testItemData.tenLop}
                  </Typography>
                </FlexBetween>
                <FlexBetween mt="5px">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <ArticleRounded sx={{ color: "#009265" }} />
                    <Typography
                      variant="body1"
                      ml="10px"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>Unit:</em>
                    </Typography>
                  </Box>
                  <Typography fontWeight="bold">
                    {testItemData.tenChuong}
                  </Typography>
                </FlexBetween>
                <FlexBetween mt="5px">
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <LocalLibraryRounded sx={{ color: "#009265" }} />
                    <Typography
                      variant="body1"
                      ml="10px"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>Instructor:</em>
                    </Typography>
                  </Box>
                  <Typography fontWeight="bold">
                    {testItemData.tenGV}
                  </Typography>
                </FlexBetween>
              </Box>
            ) : (
              <Loading />
            )}

            <Divider color="#666666" />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#009265",
                "&:hover": { backgroundColor: "#007850" },
                width: "100%",
                marginTop: "10px",
              }}
              onClick={() => {
                navigate(`/tests/${testId}/detail`);
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
              <TabPanel value="1" sx={{ padding: "10px" }}>
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
                    loading={isUserSubmissionDetailLoading}
                    rows={userSubmissionDetail?.users_unsubmit || []}
                    getRowId={(row) => row.ma_taiKhoan}
                    columns={unsubmittedcolumns}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10]}
                    sx={{ padding: "0 20px" }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="2" sx={{ padding: "10px" }}>
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
                    loading={isUserSubmissionDetailLoading}
                    rows={userSubmissionDetail?.users_submit || []}
                    getRowId={(row) => row.ma_baiLamKiemTra}
                    columns={submittedcolumns}
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
