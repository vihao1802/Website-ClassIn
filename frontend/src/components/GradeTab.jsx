import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "./DataGridCustomToolbar";
import { LineChart } from "@mui/x-charts";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import {
  useGetUnitsByClassIdQuery,
  useGetTestsByUnitIdQuery,
  useGetUserSubmissionsDetailsQuery,
} from "state/api";
import {
  PeopleRounded,
  PersonOffRounded,
  StarHalfRounded,
  EmojiEventsRounded,
  ThumbDownRounded,
  SentimentDissatisfiedRounded,
} from "@mui/icons-material";
import Loading from "./Loading";
import AvatarName from "./AvatarName";

const columns = [
  {
    field: "hoTen",
    headerName: "Student Name",
    width: 350,
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
              marginLeft: "20px",
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
    width: 400,
    editable: false,
    sortable: false,
  },
  {
    field: "thoiGianLamBai",
    headerName: "Duration (min)",
    width: 200,
    editable: false,
    sortable: false,
  },
  {
    field: "diem",
    headerName: "Score",
    width: 150,
    editable: false,
    sortable: true,
  },
];

const GradeTab = ({ classId }) => {
  // grade tab
  const [testOrExcercise, setTestOrExercise] = React.useState("te");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const handleChangeTestOrExcercise = (event) => {
    setTestOrExercise(event.target.value);
  };

  const [currentUnit, setCurrentUnit] = useState(null);

  const { data: units, isLoading: unitsLoading } =
    useGetUnitsByClassIdQuery(classId);

  const [currentTest, setCurrentTest] = React.useState(null);
  const [statisticItems, setStatisticItems] = useState([]);

  const { data: tests, isLoading: testsLoading } = useGetTestsByUnitIdQuery(
    currentUnit?.value,
    { skip: Boolean(!currentUnit) },
  );
  const { data: testResults, isLoading: testResultsLoading } =
    useGetUserSubmissionsDetailsQuery(currentTest?.value, {
      skip: Boolean(!currentTest),
    });

  useEffect(() => {
    if (units && !unitsLoading) {
      if (units.length > 0)
        setCurrentUnit({
          label: units[0].ten,
          value: units[0].ma_chuong,
        });
    }
    if (tests && !testsLoading) {
      tests.length <= 0
        ? setCurrentTest(null)
        : setCurrentTest({
            label: tests[0].tieuDe,
            value: tests[0].ma_deKiemTra,
          });
    }
  }, [units, unitsLoading]);

  useEffect(() => {
    if (tests && !testsLoading) {
      tests.length <= 0
        ? setCurrentTest(null)
        : setCurrentTest({
            label: tests[0].tieuDe,
            value: tests[0].ma_deKiemTra,
          });
    }
  }, [tests, testsLoading]);

  const scoreArray = useMemo(() => {
    if (testResults && !testResultsLoading) {
      const studentScores = testResults?.users_submit.map((user) => user.diem);
      const scoreDistribution = Array.from({ length: 11 }, () => 0);
      studentScores.forEach((score) => {
        scoreDistribution[score]++;
      });
      return scoreDistribution;
    }
    return [];
  }, [testResults, testResultsLoading]);

  useEffect(() => {
    if (testResults && !testResultsLoading) {
      setStatisticItems([
        {
          label: "Submitted",
          value: testResults?.users_submit.length,
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
          value: testResults?.users_unsubmit.length,
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
          value:
            testResults?.users_submit.length !== 0
              ? (
                  testResults?.users_submit.reduce((total, current) => {
                    return total + current.diem;
                  }, 0) / testResults?.users_submit.length
                ).toFixed(2)
              : 0,
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
          value:
            testResults?.users_submit.length > 0
              ? testResults?.users_submit.length === 1
                ? testResults?.users_submit[0].diem
                : testResults?.users_submit.reduce((max, current) => {
                    return max.diem > current.diem ? max : current;
                  }).diem
              : 0,
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
          value:
            testResults?.users_submit.length > 0
              ? testResults?.users_submit.length === 1
                ? testResults?.users_submit[0].diem
                : testResults?.users_submit.reduce((min, current) => {
                    return min.diem < current.diem ? min : current;
                  }).diem
              : 0,
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
          value:
            testResults?.users_submit.length !== 0
              ? testResults?.users_submit.filter((user) => user.diem < 5).length
              : 0,
          icon: (
            <SentimentDissatisfiedRounded
              sx={{
                color: "#009265",
                fontSize: "40px",
              }}
            />
          ),
        },
      ]);
    }
  }, [testResults, testResultsLoading]);
  if (unitsLoading || testsLoading || testResultsLoading) {
    return <Loading />;
  }

  const unitsAutoComplete = units
    ? units.map((unit) => ({
        label: unit.ten,
        value: unit.ma_chuong,
      }))
    : [];

  const testsAutoComplete =
    tests?.map((test) => ({
      label: test.tieuDe,
      value: test.ma_deKiemTra,
    })) || [];

  return (
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
          value={testOrExcercise}
          onChange={handleChangeTestOrExcercise}
          displayEmpty
          size="small"
          sx={{
            minWidth: "200px",
          }}
          color="success"
        >
          <MenuItem value="ex">Excercise</MenuItem>
          <MenuItem value="te">Test</MenuItem>
        </Select>
        <Autocomplete
          value={currentUnit}
          options={unitsAutoComplete}
          sx={{ width: 400, marginLeft: "10px" }}
          renderInput={(params) => (
            <TextField {...params} label="Unit" color="success" />
          )}
          size="small"
          isOptionEqualToValue={(option, value) => {
            return option.value === value.value;
          }}
          onChange={(event, value) => {
            setCurrentUnit(value);
          }}
        />
        <Autocomplete
          value={currentTest}
          options={testsAutoComplete}
          sx={{ width: 400, marginLeft: "10px" }}
          renderInput={(params) => (
            <TextField {...params} label="Test Title" color="success" />
          )}
          isOptionEqualToValue={(option, value) => {
            return option.value === value.value;
          }}
          onChange={(event, value) => {
            setCurrentTest(value);
          }}
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
          {/* {console.log(statisticItems)} */}
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
      <Typography variant="h6" color="#009265" fontWeight="bold" mt="10px">
        Chart
      </Typography>
      <LineChart
        xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], label: "Score" }]}
        yAxis={[{ label: "Number of Students" }]}
        series={[
          {
            data: scoreArray,
          },
        ]}
        fullWidth
        height={500}
      />

      <Typography variant="h6" color="#009265" fontWeight="bold" mt="10px">
        Score Table
      </Typography>
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
          loading={testResultsLoading}
          rows={testResults?.users_submit || []}
          getRowId={(row) => row.ma_baiLamKiemTra}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ padding: "0 20px" }}
        />
      </Box>
    </Box>
  );
};

export default GradeTab;
