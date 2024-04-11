import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";
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
  IconButton,
  CircularProgress,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import {
  ArticleOutlined,
  HistoryEduRounded,
  HourglassEmpty,
  EventAvailable,
  RefreshOutlined,
} from "@mui/icons-material";
import { useGetTodoQuery, useGetClassQuery } from "state/api";
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
      <Box sx={{ p: 1.5, height: "100%" }}>
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
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [classes, setClasses] = useState("0");
  const [categories, setCategories] = useState("0");
  const { data: todoData, isLoading: todoLoading } = useGetTodoQuery({
    acc_id: "6b157e9a-4f74-4ee8-a893-06bc950f4272",
    selectedClass: classes,
    selectedCategory: categories,
  });
  const { data: classData, isLoading: classLoading } = useGetClassQuery(
    "6b157e9a-4f74-4ee8-a893-06bc950f4272",
  );
  useEffect(() => {}, [todoData, classData, classLoading, categories, classes]);

  // change categories
  const handleChangeCategories = (event) => {
    setCategories(event.target.value);
  };
  // change classes
  const handleChangeClasses = (event) => {
    setClasses(event.target.value);
  };

  // handle click button
  const handleClickDoExercise = () => {
    navigate("/exercise/do");
  };
  const handleClickDoTest = () => {
    navigate("/tests/do");
  };
  const handleClickRefresh = () => {
    setClasses("0");
    setCategories("0");
  };

  // handle change tab name
  const handleChangeTabName = (event, newValue) => {
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
        onChange={handleChangeTabName}
        aria-label="Vertical tabs example"
        TabIndicatorProps={{
          sx: { backgroundColor: theme.main_theme },
        }}
        sx={{
          borderRight: 1,
          width: "15%",
          display: "flex",
          flexDirection: "column",
          paddingTop: "16px",
          color: theme.main_theme,
          "& .MuiTab-root.Mui-selected": {
            color: "white",
            backgroundColor: theme.main_theme,
            borderColor: theme.main_theme,

            "&:hover": {
              backgroundColor: theme.main_theme,
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
              Pending
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
              Done
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
                  color={"success"}
                >
                  <MenuItem key={"0"} value={"0"}>
                    All classes
                  </MenuItem>
                  {classData?.map((classItem) => (
                    <MenuItem key={classItem.ma_lopHoc} value={classItem.ten}>
                      {classItem.ten}
                    </MenuItem>
                  ))}
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
                  color={"success"}
                >
                  <MenuItem value={"0"}>All categories</MenuItem>
                  <MenuItem value={"1"}>Exercise</MenuItem>
                  <MenuItem value={"2"}>Test</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                sx={{
                  color: "gray",
                }}
                onClick={handleClickRefresh}
              >
                <RefreshOutlined />
              </IconButton>
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
            {todoLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "calc(100% - 50.8px)",
                }}
              >
                <CircularProgress color="success" />
              </Box>
            ) : (
              <List
                sx={{
                  padding: "0",
                }}
                component="span"
              >
                {Array.isArray(todoData) && todoData.length === 0 ? (
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                      fontWeight: "bold",
                      color: "#666666",
                    }}
                  >
                    No Results Found
                  </Typography>
                ) : (
                  todoData?.map(
                    (exercise) =>
                      exercise.da_lam === 0 && (
                        <ListItem
                          key={
                            exercise.ma_baiTap
                              ? exercise.ma_baiTap
                              : exercise.ma_deKiemTra
                          }
                          disablePadding
                        >
                          <ListItemButton
                            sx={{ height: "80px", padding: "10px 25px" }}
                          >
                            <ListItemIcon>
                              {exercise.ma_baiTap ? (
                                <ArticleOutlined />
                              ) : (
                                <HistoryEduRounded />
                              )}
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
                                  {exercise.tieuDe}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                  <Chip
                                    label={
                                      exercise.ma_baiTap ? "Assignment" : "Test"
                                    }
                                    color={"success"}
                                    size="small"
                                    variant="outlined"
                                  />
                                </Stack>
                              </Box>
                              <Typography color="#666666">
                                Deadline:{" "}
                                {new Date(
                                  exercise.thoiGianKetThuc,
                                ).toLocaleString()}{" "}
                                | Class: {exercise.ten_lopHoc}
                              </Typography>
                            </Box>
                            <Button
                              onClick={
                                exercise.ma_baiTap
                                  ? handleClickDoExercise
                                  : handleClickDoTest
                              }
                              sx={{
                                textTransform: "none",
                                borderRadius: "20px",
                                marginLeft: "auto",
                                padding: "5px 25px",
                                backgroundColor: theme.main_theme,
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
                                  {exercise.ma_baiTap ? "Submit" : "Start"}
                                </Typography>
                              </Box>
                            </Button>
                          </ListItemButton>
                        </ListItem>
                      ),
                  )
                )}
              </List>
            )}
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
                  color={"success"}
                >
                  <MenuItem key={"0"} value={"0"}>
                    All classes
                  </MenuItem>
                  {classData?.map((classItem) => (
                    <MenuItem key={classItem.ma_lopHoc} value={classItem.ten}>
                      {classItem.ten}
                    </MenuItem>
                  ))}
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
                  color={"success"}
                >
                  <MenuItem value={"0"}>All categories</MenuItem>
                  <MenuItem value={"1"}>Exercise</MenuItem>
                  <MenuItem value={"2"}>Test</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                sx={{
                  color: "gray",
                }}
                onClick={handleClickRefresh}
              >
                <RefreshOutlined />
              </IconButton>
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
            {Array.isArray(todoData) && todoData.length === 0 ? (
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  fontWeight: "bold",
                  color: "#666666",
                }}
              >
                No Results Found
              </Typography>
            ) : todoLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "calc(100% - 50.8px)",
                }}
              >
                <CircularProgress color="success" />
              </Box>
            ) : (
              <List
                sx={{
                  padding: "0",
                }}
                component="span"
              >
                {todoData?.map(
                  (exercise) =>
                    exercise.da_lam === 1 && (
                      <ListItem
                        key={
                          exercise.ma_baiTap
                            ? exercise.ma_baiTap
                            : exercise.ma_deKiemTra
                        }
                        disablePadding
                      >
                        <ListItemButton
                          sx={{ height: "80px", padding: "10px 25px" }}
                        >
                          <ListItemIcon>
                            {exercise.ma_baiTap ? (
                              <ArticleOutlined />
                            ) : (
                              <HistoryEduRounded />
                            )}
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
                                {exercise.tieuDe}
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                <Chip
                                  label={
                                    exercise.ma_baiTap ? "Assignment" : "Test"
                                  }
                                  color={"success"}
                                  size="small"
                                  variant="outlined"
                                />
                              </Stack>
                            </Box>
                            <Typography color="#666666">
                              Deadline:{" "}
                              {new Date(
                                exercise.thoiGianKetThuc,
                              ).toLocaleString()}{" "}
                              | Class: {exercise.ten_lopHoc}
                            </Typography>
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ),
                )}
              </List>
            )}
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default Todo;
