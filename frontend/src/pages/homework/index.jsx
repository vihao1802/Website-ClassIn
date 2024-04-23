import { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Tab,
  IconButton,
  Box,
  TextField,
  Button,
  Grid,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Switch,
  Link,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  YouTube,
  FileUploadOutlined,
  InsertLinkRounded,
  QuestionAnswerOutlined,
  DoNotDisturbOnOutlined,
  AddLink,
  Today,
} from "@mui/icons-material";
import HomeNavbar from "components/HomeNavbar";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AttachmentLink from "components/homework/AttachmentLink";
import AddAttachmentButton from "components/homework/AddAttachmentButton";
import AddAnswerButton from "components/homework/AddAnswerButton";
import AddFileUploadButton from "components/homework/AddFileUploadButton";
import AddLinkButton from "components/homework/AddLinkButton";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import * as yup from "yup";

import {
  useGetClassByInstructorIdQuery,
  useGetUnitByClassIdQuery,
  usePostHomeworkMutation,
} from "state/api";
const PUBLIC_ANSWER_OPT = [
  { id: "1", label: "After student submited" },
  { id: "2", label: "After exam ended" },
  { id: "3", label: "Not public answer" },
];
export default function CreateHomeWork() {
  const [valueClass, setValueClass] = useState([]);
  const [classItem, setClassItem] = useState({});
  const [valueUnit, setValueUnit] = useState([]);
  const [valueAnswer, setValueAnswer] = useState(PUBLIC_ANSWER_OPT[0]);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [postHomework, { isLoading: loadingPostHomework }] =
    usePostHomeworkMutation();
  const [listAttachment, setListAttachment] = useState([]);
  const [listAnswerAttachment, setListAnswerAttachment] = useState([]);
  const [startTime, setStartTime] = useState(dayjs());
  let endtime = startTime.add(5, "minute");
  const { data: ClassQuery, isLoading: isLoadingClassQuery } =
    useGetClassByInstructorIdQuery("4f9911c9-692b-4bf1-8719-2e397ccac21f");
  const { data: UnitQuery, isLoading: isLoadingUnitQuery } =
    useGetUnitByClassIdQuery(classItem.id);
  useEffect(() => {
    if (!isLoadingClassQuery && ClassQuery) {
      const list = ClassQuery.map((item) => {
        return {
          id: item.ma_lopHoc,
          label: item.ten,
        };
      });
      setValueClass(list);
      setClassItem(list[0]);
    }
  }, [isLoadingClassQuery, ClassQuery]);

  useEffect(() => {
    if (!isLoadingUnitQuery && UnitQuery) {
      const list = UnitQuery.map((item) => {
        return {
          id: item.ma_chuong,
          label: item.ten,
        };
      });
      setValueUnit(list);
    }
  }, [isLoadingUnitQuery, UnitQuery, classItem]);

  const validationSchema = yup.object({
    homework_title: yup.string().required("Title is required"),
    homework_content: yup.string().required("Content is required"),
    homework_answer: yup.string(),
    class_select: yup.object().required("Class is required"),
    unit_select: yup.object().required("Unit is required"),
    public_answer_select: yup.object().required("Public answer is required"),
  });
  const formik = useFormik({
    initialValues: {
      homework_title: "",
      homework_content: "",
      homework_answer: "",
      class_select: "",
      unit_select: "",
      public_answer_select: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("hello");
      // postHomework({
      //   machuong: classItem.id,
      //   tieuDe: values.homework_title,
      //   noidungbaitap: values.homework_content,
      //   noidungdapan: values.homework_answer,
      //   thoigianbatdau: startTime,
      //   thoigianketthuc: endtime,
      //   congkhaidapan: valueAnswer.id,
      //   nopbu: true,
      // });
    },
  });
  const handleAddAnswer = () => {
    const answerBtn = document.getElementById("add-answer-button");
    if (hasAnswer) {
      document.getElementById("container").style.height = "100%";
      document.getElementById("add-answer-container").style.display = "none";
      answerBtn.Title = "Answer";
      answerBtn.Icon = QuestionAnswerOutlined;
      setHasAnswer(false);
    } else {
      document.getElementById("container").style.height = "100vh";
      document.getElementById("add-answer-container").style.display = "flex";
      answerBtn.Title = "Cancel";
      answerBtn.Icon = DoNotDisturbOnOutlined;
      setHasAnswer(true);
    }
  };
  const removeAttachment = (id) => {
    setListAttachment((prevList) =>
      prevList.filter((item) => item.Vid_id !== id),
    );
  };
  const removeAnswerAttachment = (id) => {
    setListAnswerAttachment((prevList) =>
      prevList.filter((item) => item.Vid_id !== id),
    );
  };
  return (
    <form
      id="container"
      sx={{
        width: "100vw",
        height: "100%",
        maxHeight: "auto",
      }}
      onSubmit={formik.handleSubmit}
    >
      <HomeNavbar IsNotHomePage={true} />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        {/* CONTENT */}
        <Box
          sx={{
            padding: "20px 20px",
            width: "70%",
          }}
        >
          <Typography variant="h4">
            CONTENT <hr />
          </Typography>
          <Box
            sx={{
              height: "100vh",

              width: "100%",
            }}
          >
            <TextField
              id="homework-title"
              name="homework_title"
              label="Homework Title"
              variant="filled"
              size="normal"
              sx={{
                width: "100%",
              }}
              color="success"
              fullWidth
              error={
                formik.touched.homework_title &&
                Boolean(formik.errors.homework_title)
              }
            />
            <TextField
              id="homework-content"
              name="homework_content"
              label="Homework Content"
              variant="filled"
              size="normal"
              color="success"
              sx={{
                width: "100%",
              }}
              fullWidth
              multiline
              rows={8}
              error={
                formik.touched.homework_content &&
                Boolean(formik.errors.homework_content)
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2%",
                height: "auto",
                maxHeight: "10rem",

                overflowY: "auto",
              }}
            >
              {listAttachment.map((attachment) => (
                <AttachmentLink
                  width="100%"
                  Title={attachment.Title}
                  Subtitle={attachment.Subtitle}
                  Thumbnail={attachment.Thumbnail}
                  handleRemove={() => removeAttachment(attachment.Vid_id)}
                />
              ))}
            </Box>

            <Box
              sx={{
                height: "4rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "5%",
                border: "1px solid gray",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                }}
              >
                Attachments
              </Typography>
              <AddAttachmentButton
                Icon={YouTube}
                iconSize="1.5rem"
                setListAttachment={setListAttachment}
              />
              <AddFileUploadButton
                Icon={FileUploadOutlined}
                iconSize="1.5rem"
                setListAttachment={setListAttachment}
              />
              <AddLinkButton
                Icon={InsertLinkRounded}
                iconSize="1.5rem"
                setListAttachment={setListAttachment}
              />
            </Box>

            {/* ADD ANSWER */}
            <Typography
              variant="h4"
              sx={{
                marginTop: "20px",
              }}
            >
              ANSWER
              <hr />
            </Typography>
            <Box
              sx={{
                height: "auto",
                display: "none",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "2%",
                width: "100%",
              }}
              id="add-answer-container"
            >
              <TextField
                id="homework-answer"
                name="homework_answer"
                label="Homework Answer"
                variant="filled"
                size="normal"
                color="success"
                sx={{
                  width: "100%",
                }}
                fullWidth
                multiline
                rows={8}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2%",
                }}
              >
                {listAnswerAttachment.map((attachment) => (
                  <AttachmentLink
                    width="100%"
                    Title={attachment.Title}
                    Subtitle={attachment.Subtitle}
                    Thumbnail={attachment.Thumbnail}
                    handleRemove={() =>
                      removeAnswerAttachment(attachment.Vid_id)
                    }
                  />
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5%",
                  border: "1px solid gray",
                  borderRadius: "5px",
                  position: "relative",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                  }}
                >
                  Attachments
                </Typography>
                <AddAttachmentButton
                  Icon={YouTube}
                  iconSize="1.5rem"
                  setListAttachment={setListAnswerAttachment}
                />
                <AddFileUploadButton
                  Icon={FileUploadOutlined}
                  iconSize="1.5rem"
                  setListAttachment={setListAnswerAttachment}
                />
                <AddLinkButton
                  Icon={InsertLinkRounded}
                  iconSize="1.5rem"
                  setListAttachment={setListAnswerAttachment}
                />
              </Box>
            </Box>
            <AddAnswerButton
              Id="add-answer-button"
              Title="Answer"
              handleAddAnswer={handleAddAnswer}
              Icon={QuestionAnswerOutlined}
              iconSize="1.5rem"
            ></AddAnswerButton>
          </Box>
        </Box>
        {/* INFORMATION */}
        <Box
          sx={{
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "3%",
          }}
        >
          <Typography color="#009265" variant="h6" fontWeight="bold">
            Information
          </Typography>
          <Autocomplete
            id="class-select"
            name="class_select"
            value={classItem.label}
            disablePortal
            getOptionLabel={(option) => option.label}
            onChange={(event, newValue) => {
              setClassItem(newValue);
            }}
            options={valueClass}
            error={
              formik.touched.class_select && Boolean(formik.errors.class_select)
            }
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
            value={valueUnit[0]}
            id="unit-select"
            name="unit_select"
            disablePortal
            error={
              formik.touched.unit_select && Boolean(formik.errors.unit_select)
            }
            getOptionLabel={(option) => option.label}
            inputValue={classItem.label}
            options={valueUnit}
            sx={{ width: 280 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Unit"
                color="success"
                size="small"
              />
            )}
          />

          <Autocomplete
            id="public-answer-select"
            name="public_answer_select"
            error={
              formik.touched.public_answer_select &&
              Boolean(formik.errors.public_answer_select)
            }
            value={PUBLIC_ANSWER_OPT[0]}
            onChange={(event, newValue) => {
              setValueAnswer(newValue);
            }}
            disablePortal
            options={PUBLIC_ANSWER_OPT}
            sx={{ width: 280 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Public answer"
                color="success"
                size="small"
              />
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="Start at">
              <DateTimePicker
                id="start-time"
                name="start-time"
                disablePast
                defaultValue={startTime}
                onChange={(value) => setStartTime(value)}
              />
            </DemoItem>
            <DemoItem label="End">
              <DateTimePicker
                id="end-time"
                name="end_time"
                value={endtime}
                minTime={endtime}
              />
            </DemoItem>
          </LocalizationProvider>
          <Typography color="#009265" variant="h6" fontWeight="bold" mt="10px">
            Features
          </Typography>
          <FormGroup>
            <FormControlLabel
              id="late-submit"
              name="late_submit"
              control={<Switch color="success" />}
              label="Late submit"
            />
          </FormGroup>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#009265",
                "&:hover": { backgroundColor: "#007850" },
                width: "100%",
                alignSelf: "flex-end",
              }}
              // disable={loadingPostHomework ? true : false}
            >
              {loadingPostHomework ? (
                <CircularProgress color="success" />
              ) : (
                "Create homework"
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
