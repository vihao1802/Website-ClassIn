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
  EditRounded,
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
  useGetExercisesByExerciseIdQuery,
  useGetUserSubmissionsExerciseDetailsQuery,
} from "state/api";
import Loading from "components/Loading";
import dayjs from "dayjs";
import AvatarName from "components/AvatarName";

const TestExcerciseDetail = ({ mode }) => {
  const navigate = useNavigate();
  const { testId } = useParams();
  const { exerciseId } = useParams();
  const submittedcolumns_Test = [
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
  const submittedcolumns_Exercise = [
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
      field: "email",
      headerName: "Email",
      width: 300,
      editable: false,
      sortable: false,
    },
    {
      field: "nopTre",
      headerName: "Status",
      width: 150,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return (
          <Chip
            variant="outlined"
            color={item.value === 1 ? "error" : "success"}
            label={item.value === 1 ? "Late" : "On time"}
            size="small"
          />
        );
      },
    },
    {
      field: "diem",
      headerName: "Score",
      width: 150,
      editable: false,
      sortable: false,
      renderCell: (item) => {
        return item.value === -1 ? "Not graded" : item.value;
      },
    },

    {
      field: "review",
      headerName: "Review",
      width: 100,
      sortable: false,
      type: "actions",
      getActions: (item) => {
        return [
          <GridActionsCellItem
            icon={<EditRounded color="primary" />}
            label="Review"
            className="textPrimary"
            color="inherit"
            onClick={() => {
              // navigate(`/tests/${testId}/work/${item.row.ma_baiLamKiemTra}`);
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
    useGetTestByTestIdQuery(testId, { skip: mode === "exercise" });

  const {
    data: userSubmissionDetail,
    isLoading: isUserSubmissionDetailLoading,
  } = useGetUserSubmissionsDetailsQuery(testId, {
    skip: mode === "exercise",
  });

  const { data: exerciseItemData, isLoading: isExerciseItemLoading } =
    useGetExercisesByExerciseIdQuery(exerciseId, { skip: mode === "test" });

  const {
    data: userSubmissionExerciseDetail,
    isLoading: isUserSubmissionExerciseDetailLoading,
  } = useGetUserSubmissionsExerciseDetailsQuery(exerciseId, {
    skip: mode === "test",
  });

  if (isTestItemLoading || isExerciseItemLoading) return <Loading />;

  return (
    <Box>
      <HomeNavbar
        IsNotHomePage={true}
        title={mode === "test" ? "Test Detail" : "Exercise Detail"}
      />
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
                {mode === "test" ? "Test Detail" : "Exercise Detail"}
              </Typography>
              <Chip
                variant="primary"
                color="success"
                label="Ongoing"
                size="small"
              />
            </FlexBetween>
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
                    <em>{mode === "test" ? "Test Name:" : "Exercise Name:"}</em>
                  </Typography>
                </Box>
                <Typography fontWeight="bold">
                  {mode === "test"
                    ? testItemData.tieuDe
                    : exerciseItemData.tieuDe}
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
                  {dayjs(
                    mode === "test"
                      ? testItemData.thoiGianTao
                      : exerciseItemData.thoiGianTao,
                  ).format("HH:mm DD/MM/YYYY")}
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
                    <em>Deadline:</em>
                  </Typography>
                </Box>
                <Typography fontWeight="bold">
                  {dayjs(
                    mode === "test"
                      ? testItemData.thoiGianBatDau
                      : exerciseItemData.thoiGianBatDau,
                  ).format("HH:mm DD/MM/YY") +
                    " - " +
                    dayjs(
                      mode === "test"
                        ? testItemData.hanChotNopBai
                        : exerciseItemData.thoiGianKetThuc,
                    ).format("HH:mm DD/MM/YY")}
                </Typography>
              </FlexBetween>
              {mode === "test" && (
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
              )}
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
                  {mode === "test"
                    ? testItemData.tenLop
                    : exerciseItemData.tenLop}
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
                  {mode === "test"
                    ? testItemData.tenChuong
                    : exerciseItemData.tenChuong}
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
                  {mode === "test"
                    ? testItemData.tenGV
                    : exerciseItemData.tenGV}
                </Typography>
              </FlexBetween>
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
              onClick={() => {
                if (mode === "test") navigate(`/tests/${testId}/detail`);
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
                    loading={
                      mode === "test"
                        ? isUserSubmissionDetailLoading
                        : isUserSubmissionExerciseDetailLoading
                    }
                    rows={
                      mode === "test"
                        ? userSubmissionDetail?.users_unsubmit || []
                        : userSubmissionExerciseDetail?.users_unsubmit || []
                    }
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
                    loading={
                      mode === "test"
                        ? isUserSubmissionDetailLoading
                        : isUserSubmissionExerciseDetailLoading
                    }
                    rows={
                      mode === "test"
                        ? userSubmissionDetail?.users_submit || []
                        : userSubmissionExerciseDetail?.users_submit || []
                    }
                    getRowId={
                      mode === "test"
                        ? (row) => row.ma_baiLamKiemTra
                        : (row) => row.ma_baiLamBaiTap
                    }
                    columns={
                      mode === "test"
                        ? submittedcolumns_Test
                        : submittedcolumns_Exercise
                    }
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
