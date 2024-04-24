import React, { useState, useEffect } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Radio, RadioGroup, Sheet, FormLabel, radioClasses } from "@mui/joy";
import {
  Modal,
  Typography,
  Tab,
  IconButton,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { CloseRounded, CheckCircleRounded } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  usePostAddQuestionMutation,
  usePostAddAnswersMutation,
  useGetQuestionsAnswersQuery,
  usePutEditAnswersMutation,
  usePutEditQuestionMutation,
} from "state/api";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  answerA: yup.string().required("Answer A is required"),
  answerB: yup.string().required("Answer B is required"),
  answerC: yup.string().required("Answer C is required"),
  answerD: yup.string().required("Answer D is required"),
});

const AddQuestionForm = ({ open, handleClose, mode, userId, questionId }) => {
  const [value, setValue] = useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const [selectedAnwser, setSelectedAnwser] = useState(0);
  const [addQuestion] = usePostAddQuestionMutation();
  const [addAnswers] = usePostAddAnswersMutation();
  const forMikAdd = useFormik({
    initialValues: {
      title: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const response = await addQuestion({
        ma_taiKhoan: userId,
        noiDung: values.title,
      });
      const questionId = response.data.ma_cauHoi;
      for (let i = 0; i < 4; i++) {
        await addAnswers({
          ma_cauHoi: questionId,
          noiDung: values[`answer${String.fromCharCode(65 + i)}`],
          laCauTraLoiDung: selectedAnwser === i ? 1 : 0,
        });
      }
      handleClose();
    },
  });

  const [currentAnswersId, setCurrentAnswersId] = useState([]);
  const [editQuestion] = usePutEditQuestionMutation();
  const [editAnswers] = usePutEditAnswersMutation();
  const forMikEdit = useFormik({
    initialValues: {
      title: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const response = await editQuestion({
        ma_cauHoi: questionId,
        noiDung: values.title,
      });
      // if (response.error.status === 400) return;
      if (response.data.detail && response.data.detail.status === 202) {
        const response_new = await addQuestion({
          ma_taiKhoan: userId,
          noiDung: values.title,
        });
        const questionId = response_new.data.ma_cauHoi;
        for (let i = 0; i < 4; i++) {
          await addAnswers({
            ma_cauHoi: questionId,
            noiDung: values[`answer${String.fromCharCode(65 + i)}`],
            laCauTraLoiDung: selectedAnwser === i ? 1 : 0,
          });
        }
      } else {
        for (let i = 0; i < 4; i++) {
          editAnswers({
            ma_cauTraLoi: currentAnswersId[i],
            noiDung: values[`answer${String.fromCharCode(65 + i)}`],
            laCauTraLoiDung: selectedAnwser === i ? 1 : 0,
          });
        }
      }

      handleClose();
    },
  });
  const { data: questionsAnswers, isLoading: isQuestionsAnswersLoading } =
    useGetQuestionsAnswersQuery(questionId);
  useEffect(() => {
    if (questionsAnswers && !isQuestionsAnswersLoading)
      forMikEdit.setValues({
        title: questionsAnswers.cauHoi.noiDung,
        answerA: questionsAnswers.cauTraLoi[0].noiDung,
        answerB: questionsAnswers.cauTraLoi[1].noiDung,
        answerC: questionsAnswers.cauTraLoi[2].noiDung,
        answerD: questionsAnswers.cauTraLoi[3].noiDung,
      });
    if (questionId) {
      setSelectedAnwser(
        questionsAnswers?.cauTraLoi.findIndex(
          (answer) => answer.laCauTraLoiDung === 1,
        ),
      );
      setCurrentAnswersId(
        questionsAnswers?.cauTraLoi.map((answer) => answer.ma_cauTraLoi),
      );
    }
  }, [isQuestionsAnswersLoading, questionsAnswers]);

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "650px",
          bgcolor: "background.paper",
          border: "1px solid #e7e7e7",
          boxShadow: 24,
          borderRadius: "10px",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: mode === "add" ? "space-between" : "flex-end",
              alignItems: "center",
            }}
          >
            {mode === "add" && (
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
                <Tab label="Add a question" value="1" />
                <Tab label="Add from file" value="2" />
              </TabList>
            )}

            <IconButton
              sx={{
                color: "#009265",
                width: "40px",
                marginRight: "10px",
              }}
              onClick={handleClose}
            >
              <CloseRounded />
            </IconButton>
          </Box>
          <TabPanel
            value="1"
            sx={{
              padding: "10px 20px",
              height: "100%",
            }}
          >
            <Typography variant="h6" color="#009265">
              Title of question:
            </Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={2}
              fullWidth
              color="success"
              name="title"
              value={
                mode === "add"
                  ? forMikAdd.values.title
                  : forMikEdit.values.title
              }
              onChange={
                mode === "add"
                  ? forMikAdd.handleChange
                  : forMikEdit.handleChange
              }
              error={
                mode === "add"
                  ? forMikAdd.touched.title && Boolean(forMikAdd.errors.title)
                  : forMikEdit.touched.title && Boolean(forMikEdit.errors.title)
              }
              helperText={
                mode === "add"
                  ? forMikAdd.touched.title && forMikAdd.errors.title
                  : forMikEdit.touched.title && forMikEdit.errors.title
              }
            />
            <Typography variant="h6" color="#009265" mt="5px">
              List of answers:
            </Typography>
            <RadioGroup
              aria-label="platform"
              defaultValue="Website"
              overlay
              name="platform"
              sx={{
                flexDirection: "column",
                gap: 1,
                [`& .${radioClasses.checked}`]: {
                  [`& .${radioClasses.action}`]: {
                    inset: -1,
                    border: "3px solid",
                    borderColor: "#009265",
                  },
                },
                [`& .${radioClasses.radio}`]: {
                  display: "contents",
                  "& > svg": {
                    zIndex: 2,
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    bgcolor: "background.surface",
                    borderRadius: "50%",
                  },
                },
              }}
            >
              {["A", "B", "C", "D"].map((value, index) => (
                <Sheet
                  key={value}
                  variant="outlined"
                  sx={{
                    borderRadius: "md",
                    boxShadow: "sm",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1,
                    minWidth: 120,
                  }}
                >
                  <Radio
                    id={value}
                    value={value}
                    color="success"
                    checkedIcon={<CheckCircleRounded />}
                    checked={selectedAnwser === index}
                    onChange={() => setSelectedAnwser(index)}
                  />
                  <FormLabel htmlFor={value}>{value}</FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    sx={{ zIndex: "1" }}
                    size="small"
                    color="success"
                    name={`answer${value}`}
                    value={
                      mode === "add"
                        ? forMikAdd.values[`answer${value}`]
                        : forMikEdit.values[`answer${value}`]
                    }
                    onChange={
                      mode === "add"
                        ? forMikAdd.handleChange
                        : forMikEdit.handleChange
                    }
                    error={
                      mode === "add"
                        ? forMikAdd.touched[`answer${value}`] &&
                          Boolean(forMikAdd.errors[`answer${value}`])
                        : forMikEdit.touched[`answer${value}`] &&
                          Boolean(forMikEdit.errors[`answer${value}`])
                    }
                    helperText={
                      mode === "add"
                        ? forMikAdd.touched[`answer${value}`] &&
                          forMikAdd.errors[`answer${value}`]
                        : forMikEdit.touched[`answer${value}`] &&
                          forMikEdit.errors[`answer${value}`]
                    }
                  />
                </Sheet>
              ))}
            </RadioGroup>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                marginTop: "20px",
                position: "absolute",
                bottom: "20px",
                right: "10px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#009265",
                  "&:hover": { backgroundColor: "#007850" },
                }}
                onClick={() =>
                  mode === "add"
                    ? forMikAdd.submitForm()
                    : forMikEdit.submitForm()
                }
              >
                {mode === "add" ? "Add" : "Update"}
              </Button>
            </Box>
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              padding: "0 20px",
              height: "100%",
            }}
          ></TabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
};

export default AddQuestionForm;
