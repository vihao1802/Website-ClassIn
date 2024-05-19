import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Add,
  MoreHorizOutlined,
  ListAltRounded,
  ExpandMore,
  ArticleOutlined,
  BookOutlined,
  SettingsRounded,
  EditRounded,
  DeleteRounded,
  HistoryEduRounded,
  RefreshRounded,
} from "@mui/icons-material";
import {
  Tab,
  IconButton,
  Box,
  Typography,
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
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from "@mui/material";

import "react-chat-elements/dist/main.css";
import dayjs from "dayjs";
import FlexBetween from "./FlexBetween";

import ModalAddUnit from "components/ModalAddUnit";
import {
  useGetUnitActivitiesQuery,
  usePutDeleteUnitMutation,
  useGetTestWorksByUserIdQuery,
  usePutDeleteTestMutation,
  usePutRestoreClassMutation,
} from "state/api";
import AvatarName from "./AvatarName";
import Loading from "./Loading";
import ChatBoxGroup from "./ChatBoxGroup";
import GradeTab from "./GradeTab";
import PeopleTab from "./PeopleTab";
import AlertComponent from "./AlertComponent";
import ModalEditTest from "./ModalEditTest";

const ClassWidget = ({ classItem, userId }) => {
  //const userId = "1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9";
  //const userId = "ce6180fb-58f4-45da-9488-a00e8edeff2c";

  // const { data: classItem, isLoading: isClassItemLoading } =
  //   useGetClassDetailsQuery(classId);
  // course tab
  const [value, setValue] = React.useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorElCreateMenu, setAnchorElCreateMenu] = useState(null);
  const isOpenCreateMenu = Boolean(anchorElCreateMenu);
  const handleClickCreateMenu = (event) =>
    setAnchorElCreateMenu(event.currentTarget);
  const handleCloseCreateMenu = () => setAnchorElCreateMenu(null);

  const [anchorElActivityMenu, setAnchorElActivityMenu] = useState(null);
  const isOpenActivityMenu = Boolean(anchorElActivityMenu);
  /*   const handleClickActivityMenu = (event) => {
    setAnchorElActivityMenu(event.currentTarget);
  }; */
  const handleCloseActivityMenu = () => setAnchorElActivityMenu(null);

  const [openAddUnit, setOpenAddUnit] = useState(false);
  const handleOpenAddUnit = () => setOpenAddUnit(true);
  const handleCloseAddUnit = () => setOpenAddUnit(false);

  const [openEditUnit, setOpenEditUnit] = useState(false);
  const handleOpenEditUnit = () => setOpenEditUnit(true);
  const handleCloseEditUnit = () => setOpenEditUnit(false);

  const navigate = useNavigate();

  const [currentUnit, setCurrentUnit] = useState({});
  const [searchActInput, setSearchActInput] = useState("");
  const [actitvity, setActivity] = React.useState("All");
  const handleChangeActivity = (event) => {
    setActivity(event.target.value);
  };
  const {
    data: unitsData,
    isLoading: isUnitsLoading,
    refetch: refetchUnits,
  } = useGetUnitActivitiesQuery({
    cid: classItem?.ma_lopHoc,
    search: searchActInput,
    act: actitvity,
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteUnit] = usePutDeleteUnitMutation();

  const [anchorElTestMenu, setAnchorElTestMenu] = useState(null);
  const isOpenTestMenu = Boolean(anchorElTestMenu);
  const handleClickTestMenu = (event) => {
    setAnchorElTestMenu(event.currentTarget);
  };
  const handleCloseTestMenu = () => setAnchorElTestMenu(null);
  const [currentTest, setCurrentTest] = useState({
    id: "",
    title: "",
  });

  const [openEditTest, setOpenEditTest] = useState(false);
  const handleOpenEditTest = () => setOpenEditTest(true);
  const handleCloseEditTest = () => setOpenEditTest(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [dialogTest, setDialogTest] = useState("");
  const { data: testWorksData, isLoading: testWorksDataLoading } =
    useGetTestWorksByUserIdQuery(userId);
  const [deleteTest] = usePutDeleteTestMutation();

  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [restoreClass] = usePutRestoreClassMutation();

  if (isUnitsLoading || testWorksDataLoading) {
    return <Loading />;
  }

  const handleOpenCreateHomework = () => {
    navigate("/createhomework");
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
      <AlertComponent
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ ...alert, open: false })}
      />
      {classItem?.anLopHoc === 1 && (
        <Alert
          severity="info"
          action={
            classItem?.ma_giangVien === userId && (
              <Button
                color="inherit"
                size="small"
                onClick={() => setOpenRestoreDialog(true)}
              >
                Restore
              </Button>
            )
          }
        >
          {classItem?.ma_giangVien === userId
            ? "Class is archived. Restore it to add or edit anything."
            : "Class has been archived by your teacher. You can't add or edit anything."}
        </Alert>
      )}
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

            <Tab
              label={classItem?.ma_giangVien === userId ? "Grade" : "People"}
              value="3"
            />
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
            height:
              classItem?.anLopHoc === 1
                ? "calc(100% - 146.9px)"
                : "calc(100% - 98.8px)",
          }}
        >
          {classItem && userId && (
            <ChatBoxGroup classItem={classItem} clientId={userId} />
          )}
        </TabPanel>

        {/* COURSE TAB */}
        <TabPanel
          value="2"
          sx={{
            padding: "0 20px 10px",
            height:
              classItem?.anLopHoc === 1
                ? "calc(100% - 146.9px)"
                : "calc(100% - 98.8px)",
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
                value={searchActInput}
                onChange={(e) => setSearchActInput(e.target.value)}
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
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="bt">Exercise</MenuItem>
                  <MenuItem value="dkt">Test</MenuItem>
                  <MenuItem value="hl">Document</MenuItem>
                </Select>
              </FormControl>
              {classItem?.ma_giangVien === userId &&
                classItem?.anLopHoc === 0 && (
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
                            (handleCloseCreateMenu,
                            () => navigate("/tests/add"))
                          }
                        >
                          <FlexBetween width="60%">
                            <HistoryEduRounded />
                            <Typography>Test</Typography>
                          </FlexBetween>
                        </MenuItem>
                        <MenuItem
                          onClick={
                            (handleCloseCreateMenu, handleOpenCreateHomework)
                          }
                        >
                          <FlexBetween width="90%">
                            <ArticleOutlined />
                            <Typography>Exercise</Typography>
                          </FlexBetween>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleCloseCreateMenu();
                            navigate("/document/create");
                          }}
                        >
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
                          classId={classItem?.ma_lopHoc}
                          refetch={refetchUnits}
                          mode="add"
                          alert={setAlert}
                        />
                      </nav>
                    </Menu>
                  </FlexBetween>
                )}
              <IconButton
                sx={{
                  color: "#666666",
                  width: "40px",
                  marginLeft: "10px",
                }}
                onClick={refetchUnits}
              >
                <RefreshRounded />
              </IconButton>
            </FlexBetween>
          </FlexBetween>

          {/* UNITS CONTAINER */}
          <Box
            mt="10px"
            sx={{
              height: "100%",
              maxHeight: "510px",
              // padding: "0 10%",
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
            {unitsData
              ?.filter((item) => item.chuong.anChuong === 0)
              .map((unit, index) => (
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
                        ".MuiAccordionSummary-content": {
                          marginLeft: "12px",
                        },
                        ".MuiAccordionSummary-content.Mui-expanded": {
                          margin: "12px 0 12px 12px",
                        },
                      }}
                    >
                      {unit.chuong.ten}
                    </AccordionSummary>
                    {classItem?.ma_giangVien === userId &&
                      classItem?.anLopHoc === 0 && (
                        <IconButton
                          sx={{
                            color: "#009265",
                            width: "40px",
                            marginRight: "30px",
                          }}
                          onClick={(event) => {
                            setAnchorElActivityMenu(event.currentTarget);
                            setCurrentUnit({
                              id: unit.chuong.ma_chuong,
                              name: unit.chuong.ten,
                            });
                          }}
                        >
                          <MoreHorizOutlined />
                        </IconButton>
                      )}
                  </FlexBetween>

                  <AccordionDetails sx={{ padding: "unset" }}>
                    <List>
                      {unit.deKiemTra
                        .filter((item) => item.daXoa === 0)
                        .map((test, testIndex) => (
                          <ListItem key={testIndex} disablePadding>
                            <ListItemButton
                              sx={{ height: "80px" }}
                              onClick={() => {
                                if (classItem?.ma_giangVien === userId)
                                  navigate(
                                    `/tests/${test.ma_deKiemTra}/common`,
                                  );
                                else {
                                  if (dayjs().isBefore(test.thoiGianBatDau)) {
                                    setAlert({
                                      message: "Test is not started yet",
                                      severity: "info",
                                      open: true,
                                    });
                                  } else {
                                    const testWork = testWorksData?.find(
                                      (item) =>
                                        item.ma_deKiemTra === test.ma_deKiemTra,
                                    );
                                    if (!testWork) {
                                      if (classItem?.anLopHoc === 0) {
                                        if (
                                          dayjs().isBefore(test.thoiGianKetThuc)
                                        ) {
                                          setOpenConfirmDialog(true);
                                          setDialogTest(test.ma_deKiemTra);
                                        } else
                                          setAlert({
                                            message: "Test is ended",
                                            severity: "error",
                                            open: true,
                                          });
                                      } else
                                        setAlert({
                                          message:
                                            "This class is archived by teacher",
                                          severity: "info",
                                          open: true,
                                        });
                                    } else {
                                      if (test.xemDapAn === 1)
                                        navigate(
                                          `/tests/${test.ma_deKiemTra}/work/${testWork.ma_baiLamKiemTra}`,
                                        );
                                      else
                                        setAlert({
                                          message:
                                            "This test is not shown answer",
                                          severity: "warning",
                                          open: true,
                                        });
                                    }
                                  }
                                }
                              }}
                            >
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
                                      label={
                                        dayjs().isBefore(test.thoiGianBatDau)
                                          ? "Not started"
                                          : dayjs().isBefore(
                                              test.thoiGianKetThuc,
                                            )
                                          ? "Ongoing"
                                          : "Ended"
                                      }
                                      color={
                                        dayjs().isBefore(test.thoiGianBatDau)
                                          ? "primary"
                                          : dayjs().isBefore(
                                              test.thoiGianKetThuc,
                                            )
                                          ? "success"
                                          : "error"
                                      }
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
                                    dayjs(test.thoiGianKetThuc).format(
                                      "HH:mm - DD/MM/YYYY",
                                    )}
                                </Typography>
                              </Box>
                            </ListItemButton>
                            {classItem?.ma_giangVien === userId &&
                              classItem?.anLopHoc === 0 && (
                                <IconButton
                                  sx={{
                                    color: "#009265",
                                    width: "40px",
                                    marginRight: "30px",
                                  }}
                                  onClick={(event) => {
                                    setAnchorElTestMenu(event.currentTarget);
                                    setCurrentTest({
                                      id: test.ma_deKiemTra,
                                      title: test.tieuDe,
                                    });
                                  }}
                                >
                                  <MoreHorizOutlined />
                                </IconButton>
                              )}
                            <Menu
                              anchorEl={anchorElTestMenu}
                              open={isOpenTestMenu}
                              onClose={handleCloseTestMenu}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <MenuItem
                                onClick={
                                  (handleCloseTestMenu, handleOpenEditTest)
                                }
                              >
                                <FlexBetween>
                                  <EditRounded color="primary" />
                                  <Typography color="primary">Edit</Typography>
                                </FlexBetween>
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  deleteTest(currentTest.id);
                                  refetchUnits();
                                  setAlert({
                                    message: "Delete Test successfully",
                                    severity: "success",
                                    open: true,
                                  });
                                  handleCloseTestMenu();
                                }}
                              >
                                <FlexBetween>
                                  <DeleteRounded color="error" />
                                  <Typography color="error">Delete</Typography>
                                </FlexBetween>
                              </MenuItem>
                            </Menu>
                          </ListItem>
                        ))}
                      {unit.baiTap
                        .filter((item) => item.daXoa === 0)
                        .map((exercise, exerciseIndex) => (
                          <ListItem
                            key={exerciseIndex}
                            onClick={() =>
                              classItem?.ma_giangVien === userId
                                ? navigate(
                                    `/exercises/${exercise.ma_baiTap}/common`,
                                  )
                                : navigate(`/dohomework/${exercise.ma_baiTap}/`)
                            }
                            disablePadding
                          >
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
                      {unit.hocLieu
                        .filter((item) => item.daXoa === 0)
                        .map((document, documentIndex) => (
                          <ListItem key={documentIndex} disablePadding>
                            <ListItemButton
                              sx={{ height: "80px" }}
                              onClick={() => {
                                navigate(
                                  `/document/edit/${document.ma_hocLieu}`,
                                );
                              }}
                            >
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
              <MenuItem onClick={(handleCloseActivityMenu, handleOpenEditUnit)}>
                <FlexBetween>
                  <EditRounded color="primary" />
                  <Typography color="primary">Edit</Typography>
                </FlexBetween>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteUnit(currentUnit.id);
                  refetchUnits();
                  setAlert({
                    message: "Delete Unit successfully",
                    severity: "success",
                    open: true,
                  });
                  handleCloseActivityMenu();
                }}
              >
                <FlexBetween>
                  <DeleteRounded color="error" />
                  <Typography color="error">Delete</Typography>
                </FlexBetween>
              </MenuItem>
            </Menu>
            <ModalAddUnit
              open={openEditUnit}
              handleClose={handleCloseEditUnit}
              classId={classItem?.ma_lopHoc}
              unit={currentUnit}
              refetch={refetchUnits}
              mode="edit"
              alert={setAlert}
            />
          </Box>
        </TabPanel>

        {/* GRADE TAB */}
        {classItem?.ma_giangVien === userId ? (
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
            <GradeTab classId={classItem?.ma_lopHoc} />
          </TabPanel>
        ) : (
          <TabPanel
            value="3"
            sx={{
              padding: "10px 10%",
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
            <PeopleTab classItem={classItem} userId={userId} />
          </TabPanel>
        )}
      </TabContext>
      {/* {classItem || !isClassItemLoading ? (
      ) : (
        <Loading />
      )} */}
      <ModalEditTest
        open={openEditTest}
        handleClose={handleCloseEditTest}
        refetch={refetchUnits}
        alert={setAlert}
        test={currentTest}
      />
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>{"Confirm Do The Test"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>
              You can not exit while doing test. If you try to exit, your test
              will automatically submit.
            </strong>
            <br />
            Are you sure you want to do the test?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="success">
            Cancel
          </Button>
          <Button
            onClick={() => dialogTest && navigate(`/tests/${dialogTest}/do`)}
            autoFocus
            color="success"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {classItem?.anLopHoc === 1 && (
        <Dialog
          open={openRestoreDialog}
          onClose={() => setOpenRestoreDialog(false)}
        >
          <DialogTitle>{"Restore This Class ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <strong>
                You and your students will be able to interact with this class
                again. The class will be shown in "Classes" and in the Classroom
                menu.
              </strong>
              <br />
              Are you sure you want to restore this class?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)} color="success">
              Cancel
            </Button>
            <Button
              onClick={() => {
                restoreClass(classItem?.ma_lopHoc);
                setOpenRestoreDialog(false);
                setAlert({
                  message: "Restore Class successfully",
                  severity: "success",
                  open: true,
                });
              }}
              autoFocus
              color="success"
            >
              Restore
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ClassWidget;
