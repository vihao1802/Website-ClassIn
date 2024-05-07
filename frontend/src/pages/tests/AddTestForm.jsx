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
} from "@mui/material";
import { MoreHorizOutlined, CloseRounded } from "@mui/icons-material";
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
} from "state/api";

/* const questionItems = [
  {
    id: "1",
    title: "What does HTML stand for?",
    answer: [
      { id: 1, title: "Hyper Text Markup Language", isCorrect: true },
      { id: 2, title: "Hyperlinks and Text Markup Language", isCorrect: false },
      { id: 3, title: "Home Tool Markup Language", isCorrect: false },
      { id: 4, title: "Hyper Tool Markup Language", isCorrect: false },
    ],
  },
  {
    id: "2",
    title: "What does CSS stand for?",
    answer: [
      { id: 1, title: "Cascading Style Sheets", isCorrect: true },
      { id: 2, title: "Computer Style Sheets", isCorrect: false },
      { id: 3, title: "Creative Style Sheets", isCorrect: false },
      { id: 4, title: "Colorful Style Sheets", isCorrect: false },
    ],
  },
  {
    id: "3",
    title: "What does HTTP stand for?",
    answer: [
      { id: 1, title: "Hypertext Transfer Protocol", isCorrect: true },
      { id: 2, title: "Hypertext Transmission Protocol", isCorrect: false },
      { id: 3, title: "Hypertext Transfer Process", isCorrect: false },
      { id: 4, title: "Hypertext Test Protocol", isCorrect: false },
    ],
  },
  {
    id: "4",
    title: "Which programming language is known as the 'language of the web'?",
    answer: [
      { id: 1, title: "JavaScript", isCorrect: true },
      { id: 2, title: "Java", isCorrect: false },
      { id: 3, title: "Python", isCorrect: false },
      { id: 4, title: "C++", isCorrect: false },
    ],
  },
  {
    id: "5",
    title:
      "What is the primary purpose of a database management system (DBMS)?",
    answer: [
      {
        id: 1,
        title: "To store, manipulate, and retrieve data",
        isCorrect: true,
      },
      { id: 2, title: "To design user interfaces", isCorrect: false },
      { id: 3, title: "To develop algorithms", isCorrect: false },
      { id: 4, title: "To create graphical content", isCorrect: false },
    ],
  },
  {
    id: "6",
    title: "What is the purpose of a firewall in network security?",
    answer: [
      {
        id: 1,
        title: "To protect against unauthorized access",
        isCorrect: true,
      },
      { id: 2, title: "To enhance internet speed", isCorrect: false },
      { id: 3, title: "To monitor software licenses", isCorrect: false },
      { id: 4, title: "To optimize data storage", isCorrect: false },
    ],
  },
  {
    id: "7",
    title: "What is the function of an operating system?",
    answer: [
      {
        id: 1,
        title: "To manage hardware and software resources",
        isCorrect: true,
      },
      { id: 2, title: "To design web interfaces", isCorrect: false },
      { id: 3, title: "To analyze data trends", isCorrect: false },
      { id: 4, title: "To create multimedia content", isCorrect: false },
    ],
  },
  {
    id: "8",
    title: "What is the purpose of version control software like Git?",
    answer: [
      {
        id: 1,
        title: "To track changes in code and collaborate with others",
        isCorrect: true,
      },
      { id: 2, title: "To encrypt sensitive data", isCorrect: false },
      { id: 3, title: "To manage server configurations", isCorrect: false },
      { id: 4, title: "To automate software testing", isCorrect: false },
    ],
  },
  {
    id: "9",
    title: "What is cloud computing?",
    answer: [
      {
        id: 1,
        title: "Delivery of computing services over the internet",
        isCorrect: true,
      },
      { id: 2, title: "A method of local data storage", isCorrect: false },
      { id: 3, title: "A type of network cable", isCorrect: false },
      { id: 4, title: "A programming language", isCorrect: false },
    ],
  },
  {
    id: "10",
    title: "What is the purpose of HTML5?",
    answer: [
      {
        id: 1,
        title: "To structure and present content on the web",
        isCorrect: true,
      },
      { id: 2, title: "To execute server-side code", isCorrect: false },
      { id: 3, title: "To query databases", isCorrect: false },
      { id: 4, title: "To secure network connections", isCorrect: false },
    ],
  },
]; */

/* const classItems = [
  { id: "1", label: "Công nghệ phần mềm" },
  { id: "2", label: "Hệ thống thông tin" },
  { id: "3", label: "Khoa học máy tính" },
  { id: "4", label: "Mạng và truyền thông" },
  { id: "5", label: "An toàn thông tin" },
  { id: "6", label: "Trí tuệ nhân tạo" },
  { id: "7", label: "Đồ họa và game" },
  { id: "8", label: "Kỹ thuật phần mềm" },
  { id: "9", label: "Hệ thống thông tin quản lý" },
  { id: "10", label: "Khoa học dữ liệu" },
]; */

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

const AddTestForm = () => {
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

  const { data: questionDetailsData, isLoading: isQuestionDetailsLoading } =
    useGetQuestionsDetailsQuery("1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9");

  const [edit, setEdit] = useState([]);

  useEffect(() => {
    if (!isQuestionDetailsLoading && questionDetailsData) {
      const initialEditState = questionDetailsData.map((item) => ({
        ma_cauHoi: item.cauHoi.ma_cauHoi,
        isEdit: false,
      }));
      setEdit(initialEditState);
    }
  }, [isQuestionDetailsLoading, questionDetailsData]);

  // autocomplete
  const { data: classByInstuctorIdData, isLoading: isClassByInstuctorIdData } =
    useGetClassByInstructorIdQuery("1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9");

  const [classItems, setClassItems] = useState([]);
  const [valueClass, setValueClass] = useState(null);
  useEffect(() => {
    if (!isClassByInstuctorIdData && classByInstuctorIdData) {
      const initialClassItems = classByInstuctorIdData.map((item) => ({
        id: item.ma_lopHoc,
        label: item.ten,
      }));
      setClassItems(initialClassItems);
      setValueClass(initialClassItems[0]);
    }
  }, [isClassByInstuctorIdData, classByInstuctorIdData]);

  const [valueUnit, setValueUnit] = useState(unitItems[0]);

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
            <AddQuestionForm open={open} handleClose={handleClose} />
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
              {questionDetailsData.map((item, index) => {
                const labelId = `checkbox-list-label-${item.cauHoi}`;

                return (
                  <ListItem
                    key={item.cauHoi.ma_cauHoi + index}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
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
                            {edit?.find(
                              (element) =>
                                element.ma_cauHoi === item.cauHoi.ma_cauHoi,
                            )?.isEdit ? (
                              <FlexBetween>
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  color="success"
                                  defaultValue={item.cauHoi.noiDung}
                                />

                                <Button
                                  sx={{ color: "#009265" }}
                                  onClick={() => {
                                    const newEdit = edit.map((element) => {
                                      if (
                                        element.ma_cauHoi ===
                                        item.cauHoi.ma_cauHoi
                                      ) {
                                        return { ...element, isEdit: false };
                                      }
                                      return element;
                                    });
                                    setEdit(newEdit);
                                  }}
                                >
                                  Update
                                </Button>
                              </FlexBetween>
                            ) : (
                              <FlexBetween>
                                <Typography>
                                  {parseInt(index + 1) + ". "}
                                  <Typography variant="h7" fontWeight="bold">
                                    {item.cauHoi.noiDung}
                                  </Typography>
                                </Typography>
                                <Box
                                  sx={{ display: "flex", flexDirection: "row" }}
                                >
                                  <Button
                                    sx={{ color: "#009265" }}
                                    onClick={() => {
                                      const newEdit = edit.map((element) => {
                                        if (
                                          element.ma_cauHoi ===
                                          item.cauHoi.ma_cauHoi
                                        ) {
                                          return { ...element, isEdit: true };
                                        }
                                        return element;
                                      });
                                      setEdit(newEdit);
                                    }}
                                  >
                                    Edit
                                  </Button>
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
                            )}
                            <RadioGroup
                              defaultValue={
                                item.cauTraLoi?.find(
                                  (anwsers) => anwsers.laCauTraLoiDung === 1,
                                ).ma_cauTraLoi
                              }
                            >
                              {item.cauTraLoi?.map((answer, answerIndex) => (
                                <>
                                  {edit?.find(
                                    (element) =>
                                      element.ma_cauHoi ===
                                      item.cauHoi.ma_cauHoi,
                                  )?.isEdit ? (
                                    <Box
                                      key={answer.ma_cauTraLoi.toString()}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: "10px",
                                      }}
                                    >
                                      <FormControlLabel
                                        value={answer.ma_cauTraLoi.toString()}
                                        control={
                                          <Radio
                                            color="success"
                                            sx={{ marginLeft: "10px" }}
                                          />
                                        }
                                      />
                                      <TextField
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        color="success"
                                        defaultValue={answer.noiDung}
                                      />
                                    </Box>
                                  ) : (
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
                                  )}
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
            value={valueClass}
            onChange={(event, newValue) => {
              setValueClass(newValue);
            }}
            disablePortal
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
            value={valueUnit}
            onChange={(event, newValue) => {
              setValueUnit(newValue);
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
              defaultValue={dayjs("2022-04-17T15:30")}
              slotProps={{ textField: { size: "small", color: "success" } }}
              sx={{ marginTop: "20px", width: 280 }}
            />
            <DateTimePicker
              label="End Time"
              defaultValue={dayjs("2022-04-17T15:30")}
              slotProps={{ textField: { size: "small", color: "success" } }}
              sx={{ marginTop: "20px", width: 280 }}
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
            defaultValue={15}
          />
          <Typography color="#009265" variant="h6" fontWeight="bold" mt="10px">
            Features
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked color="success" />}
              label="Public Answer"
            />
            <FormControlLabel
              control={<Switch defaultChecked color="success" />}
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
            >
              Add Test
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTestForm;
