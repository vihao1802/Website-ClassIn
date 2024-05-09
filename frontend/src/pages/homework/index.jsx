import { useEffect, useState, useMemo } from "react";
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
import { Input } from "@mui/joy";
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
import * as yup from "yup";
import { getUserId_Cookie } from "../../utils/handleCookies";
import {
  useGetClassByInstructorIdQuery,
  useGetUnitByClassIdQuery,
  usePostHomeworkMutation,
  usePostAccessTokenMutation,
  usePostHomeworkFileMutation,
  useDeleteHomeworkFileMutation,
  useDeleteHomeworkMutation,
} from "state/api";
import { Navigate } from "react-router-dom";
const PUBLIC_ANSWER_OPT = [
  { id: "1", label: "After student submited" },
  { id: "2", label: "After exam ended" },
  { id: "3", label: "Not public answer" },
];
export default function CreateHomeWork() {
  const [message, setMessage] = useState("");
  const [dateMessage, setDateMessage] = useState("");
  const [valueClass, setValueClass] = useState([{ id: "", label: "" }]);
  const [classItem, setClassItem] = useState({ id: "", label: "" });
  const [valueUnit, setValueUnit] = useState([{ id: "", label: "" }]);
  const [currentUnitId, setCurrentUnitId] = useState("");
  const [valueAnswer, setValueAnswer] = useState(PUBLIC_ANSWER_OPT[0]);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [postHomework, { isLoading: loadingPostHomework }] =
    usePostHomeworkMutation();
  const [postHomeworkFile, { isLoading: loadingPostHomeworkFile }] =
    usePostHomeworkFileMutation();
  const [accessToken] = usePostAccessTokenMutation();

  const [DeleteHomework] = useDeleteHomeworkMutation();
  const [DeleteHomeworkFile] = useDeleteHomeworkFileMutation();
  const [listAttachment, setListAttachment] = useState([]);
  const [listAnswerAttachment, setListAnswerAttachment] = useState([]);
  const [startTime, setStartTime] = useState(dayjs().add(1, "hours"));
  let endtime = startTime.add(5, "minute");
  const { data: ClassQuery, isLoading: isLoadingClassQuery } =
    useGetClassByInstructorIdQuery(getUserId_Cookie());
  const { data: UnitQuery, isLoading: isLoadingUnitQuery } =
    useGetUnitByClassIdQuery(classItem === null ? "" : classItem.id);

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
      if (UnitQuery.length === 0) {
        setValueUnit([]);
        return;
      }
      const list = UnitQuery.map((item) => {
        return {
          id: item.ma_chuong,
          label: item.ten,
        };
      });
      setValueUnit(list);
      setCurrentUnitId(list[0]);
    }
  }, [isLoadingUnitQuery, UnitQuery]);

  const validationSchema = yup.object({
    homework_title: yup.string().required("Title is required"),
    homework_content: yup.string().required("Content is required"),
    homework_answer: yup.string(),
    start_time: yup.date().min(new Date(), "Date cannot be in the pass"),
  });
  const handleSubmit = async (values) => {
    let homework_id = "";
    try {
      const res = await postHomework({
        machuong: currentUnitId.id,
        tieuDe: values.homework_title,
        noiDungBaiTap: values.homework_content,
        noiDungDapAn: values.homework_answer,
        thoiGianBatDau: new Date().toISOString(),
        thoiGianKetThuc: new Date().toISOString(),
        congKhaiDapAn: 1,
        nopBu: 1,
      });
      const access_token = await accessToken();
      if (listAttachment.length !== 0) {
        listAttachment.forEach(async (attachment) => {
          if (attachment.file !== undefined) {
            // upload file
            const metadata = {
              name: attachment.file.name,
              mimeType: attachment.file.type,
              parents: ["1jQm6xnCUOTAtKhM-S3pKqFHHRtprVF6j"],
            };

            const formData = new FormData();
            formData.append(
              "metadata",
              new Blob([JSON.stringify(metadata)], {
                type: "application/json",
              }),
            );
            formData.append("file", attachment.file);
            const response = await fetch(
              "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
              {
                method: "POST",
                headers: new Headers({
                  Authorization: "Bearer " + access_token.data.token,
                }),
                body: formData,
              },
            );
            const data = await response.json();
            if (data.error) {
              throw new Error("Upload file failed! Please try again.");
            } else {
              // console.log({
              //   tenFile: data.name,
              //   laFileDapAn: 0,
              //   isYoutubeLink: 0,
              //   ma_file: data.id,
              //   ma_baiTap: res.data.ma_baiTap,
              // });
              try {
                const responsePostFile = await postHomeworkFile({
                  tenFile: data.name,
                  laFileDapAn: 0,
                  isYoutubeLink: 0,
                  ma_file: data.id,
                  ma_baiTap: res.data.ma_baiTap,
                });
                if (
                  responsePostFile.data === undefined ||
                  responsePostFile.data === null
                ) {
                  // console.log(responsePostFile);
                  throw new Error("Upload file failed! Please try again.");
                }
              } catch (error) {
                // console.log(error.message);
              }
            }
          } else {
            // upload youtube link
            const responsePostLink = await postHomeworkFile({
              tenFile: attachment.Title,
              laFileDapAn: 0,
              isYoutubeLink: 1,
              ma_file: attachment.Vid_id,
              ma_baiTap: res.data.ma_baiTap,
            });
            if (
              responsePostLink.data === undefined ||
              responsePostLink.data === null
            ) {
              throw new Error("Upload file failed! Please try again.");
            }
          }
        });
      }
      if (listAnswerAttachment.length !== 0) {
        console.log(listAnswerAttachment);
        listAnswerAttachment.forEach(async (attachment) => {
          if (attachment.file !== undefined) {
            // upload file
            const metadata = {
              name: attachment.file.name,
              mimeType: attachment.file.type,
              parents: ["1jQm6xnCUOTAtKhM-S3pKqFHHRtprVF6j"],
            };

            const formData = new FormData();
            formData.append(
              "metadata",
              new Blob([JSON.stringify(metadata)], {
                type: "application/json",
              }),
            );
            formData.append("file", attachment.file);
            const response = await fetch(
              "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
              {
                method: "POST",
                headers: new Headers({
                  Authorization: "Bearer " + access_token.data.token,
                }),
                body: formData,
              },
            );
            const data = await response.json();
            if (data.error) {
              throw new Error("Upload file failed! Please try again.");
            } else {
              try {
                console.log({
                  tenFile: data.name,
                  laFileDapAn: 1,
                  isYoutubeLink: 0,
                  ma_file: data.id,
                  ma_baiTap: res.data.ma_baiTap,
                });
                const responsePostFile = await postHomeworkFile({
                  tenFile: data.name,
                  laFileDapAn: 1,
                  isYoutubeLink: 0,
                  ma_file: data.id,
                  ma_baiTap: res.data.ma_baiTap,
                });
                if (
                  responsePostFile.data === undefined ||
                  responsePostFile.data === null
                ) {
                  console.log(responsePostFile);
                  throw new Error("Upload file failed! Please try again.");
                }
              } catch (error) {
                console.log(error.message);
              }
            }
          } else {
            // upload youtube link
            const responsePostLink = await postHomeworkFile({
              tenFile: attachment.Title,
              laFileDapAn: 1,
              isYoutubeLink: 1,
              ma_file: attachment.Vid_id,
              ma_baiTap: res.data.ma_baiTap,
            });
            console.log(responsePostLink);
            if (
              responsePostLink.data === undefined ||
              responsePostLink.data === null
            ) {
              throw new Error("Upload file failed! Please try again.");
            }
          }
        });
      }
    } catch (err) {
      setMessage(err.message);
      if (homework_id !== "") {
        console.log("xoa bai tap");
        await DeleteHomeworkFile({ ma_baitap: homework_id });
        await DeleteHomework({ ma_baitap: homework_id });
      }
    }
  };
  const formik = useFormik({
    initialValues: {
      homework_title: "",
      homework_content: "",
      homework_answer: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
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
      onSubmit={(e) => {
        e.preventDefault();
        // handleSubmit(e);
        formik.handleSubmit(e);
      }}
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
              color="success"
              fullWidth
              error={
                formik.touched.homework_title
                  ? formik.errors.homework_title
                  : undefined
              }
              helperText={formik.errors.homework_title}
              onChange={formik.handleChange}
            />
            <TextField
              id="homework-content"
              name="homework_content"
              label="Homework Content"
              variant="filled"
              size="normal"
              color="success"
              fullWidth
              multiline
              rows={8}
              error={
                formik.touched.homework_content
                  ? formik.errors.homework_content
                  : undefined
              }
              helperText={formik.errors.homework_content}
              onChange={formik.handleChange}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2%",
                height: "auto",
                maxHeight: "10rem",
                width: "100%",
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
                onChange={formik.handleChange}
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
            inputValue={classItem.label}
            disablePortal
            disableClearable
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, newValue) => {
              setClassItem(newValue);
            }}
            options={valueClass}
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
            inputValue={valueUnit[0].label}
            id="unit-select"
            name="unit_select"
            disablePortal
            disableClearable
            onChange={(event, newValue) => {
              setCurrentUnitId(newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.label}
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
            value={valueAnswer.label}
            onChange={(event, newValue) => {
              setValueAnswer(newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            options={PUBLIC_ANSWER_OPT}
            disablePortal
            disableClearable
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <DateTimePicker
                label="Start at"
                id="start-time"
                name="start_time"
                disablePast
                defaultValue={startTime}
                onChange={(value) => {
                  if (value < dayjs()) {
                    setDateMessage("Start time must be in the future");
                  } else {
                    setDateMessage("");
                    setStartTime(value);
                  }
                }}
              />
              <Typography
                sx={{
                  color: "red",
                  fontSize: "0.75rem",
                }}
              >
                {dateMessage}
              </Typography>
            </Box>
            <DateTimePicker
              label="End at"
              id="end-time"
              name="end_time"
              value={endtime}
              minTime={endtime}
            />
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
              flexDirection: "column",
              justifyContent: "right",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                textAlign: "center",
                lineHeight: "2.5rem",
                marginBottom: "1rem",
                borderRadius: "5px",
              }}
            >
              {message}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#009265",
                "&:hover": { backgroundColor: "#007850" },
                width: "100%",
                alignSelf: "flex-end",
              }}
              type="submit"
              disable={loadingPostHomework}
              // onClick={(e) => formik.handleSubmit(e)}
            >
              {loadingPostHomework ? (
                <CircularProgress sx={{ color: "white" }} size="1.5rem" />
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
