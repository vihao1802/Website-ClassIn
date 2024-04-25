import React, { useState, useEffect } from "react";
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
  IconButton,
  CircularProgress,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import {
  HourglassEmpty,
  EventAvailable,
  RefreshOutlined,
} from "@mui/icons-material";
import { useGetTodoQuery, useGetAllJoinClassQuery } from "state/api";
import { getUserId_Cookie } from "utils/handleCookies";
import TodoListItemPending from "components/todo/TodoListItemPending";
import TodoListItemDone from "components/todo/TodoListItemDone";
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
  const [value, setValue] = useState(0);
  const [classes, setClasses] = useState("0");
  const [categories, setCategories] = useState("0");
  const userId = getUserId_Cookie();
  const {
    data: todoData,
    isLoading: todoLoading,
    refetch: refetchTodoData,
  } = useGetTodoQuery({
    acc_id: userId,
    selectedClass: classes,
    selectedCategory: categories,
  });
  const { data: classData, isLoading: classLoading } =
    useGetAllJoinClassQuery(userId);
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
  const handleClickRefresh = () => {
    setClasses("0");
    setCategories("0");
    refetchTodoData();
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
                {(Array.isArray(todoData) && todoData.length === 0) ||
                (todoData && !todoData.some((item) => item.da_lam === 0)) ? (
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      height: "100%",
                      fontWeight: "bold",
                      color: "#666666",
                    }}
                  >
                    No Results Found
                  </Typography>
                ) : (
                  todoData?.map(
                    (item) =>
                      item.da_lam === 0 && (
                        <ListItem
                          key={
                            item.ma_baiTap ? item.ma_baiTap : item.ma_deKiemTra
                          }
                          disablePadding
                        >
                          <TodoListItemPending item={item} />
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
            {(Array.isArray(todoData) && todoData.length === 0) ||
            (todoData && !todoData.some((item) => item.da_lam === 1)) ? (
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  height: "100%",
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
                  (item) =>
                    item.da_lam === 1 && (
                      <ListItem
                        key={
                          item.ma_baiTap ? item.ma_baiTap : item.ma_deKiemTra
                        }
                        disablePadding
                      >
                        <TodoListItemDone item={item} />
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
