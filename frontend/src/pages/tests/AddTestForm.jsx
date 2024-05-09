import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Switch,
  Paper,
  Radio,
  RadioGroup,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  MoreHorizOutlined,
  CloseRounded,
  EditRounded,
  DeleteRounded,
} from "@mui/icons-material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HomeNavbar from "components/HomeNavbar";
import FlexBetween from "components/FlexBetween";
import AddQuestionForm from "components/ModalAddQuestion";
import Loading from "components/Loading";
import {
  useGetQuestionsDetailsQuery,
  useGetClassByInstructorIdQuery,
  useDeleteQuestionMutation,
  useGetUnitsByClassIdQuery,
  usePostCreateTestMutation,
  usePostCreatTestDetailMutation,
  usePostAddUnitMutation,
} from "state/api";
import { getUserId_Cookie } from "utils/handleCookies";
import { useFormik } from "formik";
import * as yup from "yup";
import AlertComponent from "components/AlertComponent";

const schema = yup.object({
  title: yup.string().required("Title is required"),
});

const AddTestForm = () => {
  const userId = getUserId_Cookie();
  // checkboxlist
  const [checkedQuestion, setCheckedQuestion] = useState([]);
  const handleToggle = (value) => () => {
    const currentIndex = checkedQuestion.indexOf(value);
    const newChecked = [...checkedQuestion];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedQuestion(newChecked);
  };

  //question menu
  const [anchorElQuestionMenu, setAnchorElQuestionMenu] = useState(null);
  const isOpenQuestionMenu = Boolean(anchorElQuestionMenu);
  const handleClickQuestionMenu = (event) =>
    setAnchorElQuestionMenu(event.currentTarget);
  const handleCloseQuestionMenu = () => setAnchorElQuestionMenu(null);
  const [deleteQuestion] = useDeleteQuestionMutation();

  // drag and drop
  const onDragEnd = (result) => {
    try {
      if (!result.destination) {
        return;
      }
      if (
        result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index
      ) {
        return;
      }
      const newItems = Array.from(checkedQuestion);
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);
      setCheckedQuestion(newItems);
    } catch (error) {
      console.log(error);
    }
  };

  // add question form
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //modal edit question
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [selectedQid, setSelectedQid] = useState("");

  const { data: questionDetailsData, isLoading: isQuestionDetailsLoading } =
    useGetQuestionsDetailsQuery(userId);

  // autocomplete
  const {
    data: classByInstuctorIdData,
    isLoading: isClassByInstuctorIdDataLoading,
  } = useGetClassByInstructorIdQuery(userId);

  const [classItems, setClassItems] = useState([]);
  const [currentValueClass, setCurrentValueClass] = useState(null);
  useEffect(() => {
    if (!isClassByInstuctorIdDataLoading && classByInstuctorIdData) {
      const initialClassItems = classByInstuctorIdData.map((item) => ({
        id: item.ma_lopHoc,
        label: item.ten,
      }));
      setClassItems(initialClassItems);
      setCurrentValueClass(initialClassItems[0]);
    }
  }, [isClassByInstuctorIdDataLoading, classByInstuctorIdData]);

  const { data: unitsByClassIdData, isLoading: isUnitsByClassIdDataLoading } =
    useGetUnitsByClassIdQuery(currentValueClass?.id, {
      skip: !currentValueClass,
    });
  const [isNewUnit, setIsNewUnit] = useState(false);
  const [unitItems, setUnitItems] = useState([]);
  const [currentValueUnit, setCurrentValueUnit] = useState(null);
  useEffect(() => {
    if (!isUnitsByClassIdDataLoading && unitsByClassIdData) {
      const initialUnitItems =
        unitsByClassIdData.length === 0
          ? [{ id: null, label: "Default Unit" }]
          : unitsByClassIdData.map((item) => ({
              id: item.ma_chuong,
              label: item.ten,
            }));
      if (unitsByClassIdData.length === 0) setIsNewUnit(true);
      else setIsNewUnit(false);
      setUnitItems(initialUnitItems);
      setCurrentValueUnit(initialUnitItems[0]);
    }
  }, [isUnitsByClassIdDataLoading, unitsByClassIdData]);

  // formik create test
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(startTime.add(15, "minute"));
  const [duration, setDuration] = useState(5);
  const [showAnswer, setShowAnswer] = useState(true);
  const [shuffleQuestion, setShuffleQuestion] = useState(true);

  const [createTest] = usePostCreateTestMutation();
  const [creatTestDetail] = usePostCreatTestDetailMutation();
  const [createUnit] = usePostAddUnitMutation();
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });
  const forMikCreate = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (checkedQuestion.length === 0) {
        setAlert({
          open: true,
          severity: "error",
          message: "Please select at least one question",
        });
        return;
      }
      if (startTime.diff(dayjs(), "minute") < 0) {
        setAlert({
          open: true,
          severity: "error",
          message: "Start time must be greater than current time",
        });
        return;
      }
      if (endTime.diff(startTime, "minute") < 15) {
        setAlert({
          open: true,
          severity: "error",
          message: "End time must be greater than start time 15 minutes",
        });
        return;
      }
      if (endTime.diff(dayjs(), "minute") < 0) {
        setAlert({
          open: true,
          severity: "error",
          message: "End time must be greater than current time",
        });
        return;
      }

      if (endTime.diff(startTime, "minute") < duration) {
        setAlert({
          open: true,
          severity: "error",
          message:
            "Duration must be less than the difference between start time and end time",
        });
        return;
      }
      let currentUnitId = currentValueUnit.id;
      if (isNewUnit) {
        const response = await createUnit({
          ten: currentValueUnit.label,
          ma_lopHoc: currentValueClass.id,
        });
        currentUnitId = response.data.ma_chuong;
      }
      const data = {
        uid: currentUnitId,
        testTitle: values.title,
        startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
        endTime: endTime.format("YYYY-MM-DD HH:mm:ss"),
        duration: duration,
        showAnswer: showAnswer ? 1 : 0,
        shuffleQuestion: shuffleQuestion ? 1 : 0,
      };
      const response = await createTest(data);
      const testId = response.data.ma_deKiemTra;
      const testDetailList = checkedQuestion.map((question, index) => ({
        qid: question.cauHoi.ma_cauHoi,
        tid: testId,
        order: index + 1,
      }));
      for (const testDetail of testDetailList) {
        await creatTestDetail(testDetail);
      }
    },
  });

  return (
    <Box height="100%">
      <HomeNavbar IsNotHomePage={true} title="Create Test" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "calc(100% - 50.8px)",
          borderRight: "1px solid #e7e7e7",
        }}
      >
        {/* LEFTBAR */}
        <Box
          sx={{
            width: "20%",
            height: "100%",
            padding: "10px",
            borderRight: "1px solid #e7e7e7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FlexBetween>
            <Typography
              sx={{
                color: "#009265",
                fontSize: "18px",
                textAlign: "left",
                marginLeft: "10px",
              }}
            >
              Select Questions
            </Typography>
            <Button
              onClick={handleOpen}
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
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                New Question
              </Typography>
            </Button>
            <AddQuestionForm mode="add" open={open} handleClose={handleClose} />
          </FlexBetween>
          <TextField
            fullWidth
            id="search"
            label="Search"
            variant="outlined"
            size="small"
            color="success"
            sx={{ marginTop: "10px" }}
          />
          {questionDetailsData || !isQuestionDetailsLoading ? (
            <List
              sx={{
                height: "100%",
                overflowY: "scroll",
                marginTop: "10px",
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
              {questionDetailsData
                .filter((question) => question.cauHoi.daXoa === 0)
                .map((item, index) => {
                  const labelId = `checkbox-list-label-${item.cauHoi}`;

                  return (
                    <ListItem
                      key={item.cauHoi.ma_cauHoi + index}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={(event) => {
                            handleClickQuestionMenu(event);
                            setSelectedQid(item.cauHoi.ma_cauHoi);
                          }}
                        >
                          <MoreHorizOutlined />
                        </IconButton>
                      }
                      disablePadding
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(item)}
                        dense
                      >
                        <ListItemIcon sx={{ minWidth: "unset" }}>
                          <Checkbox
                            edge="start"
                            checked={checkedQuestion.indexOf(item) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                            color="success"
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={item.cauHoi.noiDung}
                          sx={{ paddingLeft: "10px", maxWidth: "195px" }}
                          primaryTypographyProps={{
                            style: {
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              <Menu
                anchorEl={anchorElQuestionMenu}
                open={isOpenQuestionMenu}
                onClose={handleCloseQuestionMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={(handleCloseQuestionMenu, handleOpenEdit)}>
                  <FlexBetween>
                    <EditRounded color="primary" />
                    <Typography color="primary">Edit</Typography>
                  </FlexBetween>
                </MenuItem>
                <MenuItem
                  onClick={(event) => {
                    handleCloseQuestionMenu(event);
                    deleteQuestion(selectedQid);
                  }}
                >
                  <FlexBetween>
                    <DeleteRounded color="error" />
                    <Typography color="error">Delete</Typography>
                  </FlexBetween>
                </MenuItem>
              </Menu>
            </List>
          ) : (
            <Loading />
          )}
        </Box>

        {/* CONTAINER */}
        <Box
          sx={{
            height: "100%",
            width: "60%",
            padding: "20px 40px",
            backgroundColor: "#f7f7f7",
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
          <Box
            sx={{
              border: "1px solid #e7e7e7",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#009265",
                color: "white",
                width: "100%",
                height: "15px",
                borderRadius: "5px 5px 0 0",
              }}
            ></Box>
            <Box p="10px">
              <TextField
                label="Test Title"
                variant="outlined"
                size="small"
                fullWidth
                color="success"
                name="title"
                value={forMikCreate.values.title}
                onChange={forMikCreate.handleChange}
                error={
                  forMikCreate.touched.title &&
                  Boolean(forMikCreate.errors.title)
                }
                helperText={
                  forMikCreate.touched.title && forMikCreate.errors.title
                }
              />
            </Box>
          </Box>

          {questionDetailsData || !isQuestionDetailsLoading ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="question-list">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {checkedQuestion.map((item, index) => (
                      <Draggable
                        key={item.cauHoi.ma_cauHoi}
                        draggableId={item.cauHoi.ma_cauHoi}
                        index={index}
                      >
                        {(provided) => (
                          <Paper
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            sx={{ padding: "10px", marginTop: "10px" }}
                          >
                            <FlexBetween>
                              <Typography>
                                {parseInt(index + 1) + ". "}
                                <Typography variant="h7" fontWeight="bold">
                                  {item.cauHoi.noiDung}
                                </Typography>
                              </Typography>
                              <Box
                                sx={{ display: "flex", flexDirection: "row" }}
                                key={item.cauHoi.ma_cauHoi}
                              >
                                <IconButton
                                  sx={{
                                    color: "red",
                                    width: "40px",
                                  }}
                                  onClick={handleToggle(item)}
                                >
                                  <CloseRounded />
                                </IconButton>
                              </Box>
                            </FlexBetween>
                            <RadioGroup
                              defaultValue={
                                item.cauTraLoi?.find(
                                  (anwsers) => anwsers.laCauTraLoiDung === 1,
                                ).ma_cauTraLoi
                              }
                            >
                              {item.cauTraLoi?.map((answer, answerIndex) => (
                                <>
                                  <Box
                                    key={answer.ma_cauTraLoi.toString()}
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <Radio
                                      color="success"
                                      checked={answer.laCauTraLoiDung === 1}
                                    />
                                    <Typography>{answer.noiDung}</Typography>
                                  </Box>
                                </>
                              ))}
                            </RadioGroup>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <Loading />
          )}
        </Box>

        {/* RIGHBAR*/}
        <Box
          sx={{
            height: "100%",
            width: "20%",
            padding: "10px",
            borderLeft: "1px solid #e7e7e7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography color="#009265" variant="h6" fontWeight="bold">
            Information
          </Typography>
          <Autocomplete
            value={currentValueClass}
            onChange={(event, newValue) => {
              setCurrentValueClass(newValue);
            }}
            disablePortal
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            id="combo-box-demo"
            options={classItems}
            sx={{ width: 280, marginTop: "10px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Class"
                color="success"
                size="small"
              />
            )}
          />
          <Autocomplete
            value={currentValueUnit || null}
            onChange={(event, newValue) => {
              setCurrentValueUnit(newValue);
            }}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            disablePortal
            id="combo-box-demo"
            options={unitItems}
            sx={{ width: 280, marginTop: "20px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Unit"
                color="success"
                size="small"
              />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start Time"
              defaultValue={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              slotProps={{ textField: { size: "small", color: "success" } }}
              sx={{ marginTop: "20px", width: 280 }}
              minDateTime={dayjs()}
            />
            <DateTimePicker
              label="End Time"
              defaultValue={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
              slotProps={{ textField: { size: "small", color: "success" } }}
              sx={{ marginTop: "20px", width: 280 }}
              minDateTime={startTime.add(15, "minute")}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Duration (Min)"
            variant="outlined"
            size="small"
            color="success"
            sx={{ marginTop: "20px" }}
            type="number"
            defaultValue={5}
            onChange={(e) => setDuration(e.target.value)}
            InputProps={{
              inputProps: {
                min: 5,
                max: 1440,
              },
            }}
          />
          <Typography color="#009265" variant="h6" fontWeight="bold" mt="10px">
            Features
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  color="success"
                  onClick={() => setShowAnswer(!showAnswer)}
                />
              }
              label="Public Answer"
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  color="success"
                  onClick={() => setShuffleQuestion(!shuffleQuestion)}
                />
              }
              label="Random Question"
            />
          </FormGroup>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              marginTop: "auto",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#009265",
                "&:hover": { backgroundColor: "#007850" },
                width: "100%",
              }}
              onClick={forMikCreate.submitForm}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Box>
      <AddQuestionForm
        open={openEdit}
        handleClose={handleCloseEdit}
        mode="edit"
        userId={userId}
        questionId={selectedQid}
      />
      <AlertComponent
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </Box>
  );
};

export default AddTestForm;
