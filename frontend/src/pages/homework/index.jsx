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
} from "@mui/material";
import {
  YouTube,
  FileUploadOutlined,
  InsertLinkRounded,
  QuestionAnswerOutlined,
  DoNotDisturbOnOutlined,
  AddLink,
} from "@mui/icons-material";
import HomeNavbar from "components/HomeNavbar";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AttachmentLink from "components/homework/AttachmentLink";
import AddAttachmentButton from "components/homework/AddAttachmentButton";
import AddAnswerButton from "components/homework/AddAnswerButton";
import AddFileUploadButton from "components/homework/AddFileUploadButton";
import AddLinkButton from "components/homework/AddLinkButton";
const opt = [
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
];
const PUBLIC_ANSWER_OPT = [
  { id: "1", label: "After student submited" },
  { id: "2", label: "After exam ended" },
  { id: "3", label: "Not public answer" },
];
export default function CreateHomeWork() {
  const [valueClass, setValueClass] = useState(opt[0]);
  const [valueUnit, setValueUnit] = useState(opt[0]);
  const [valueAnswer, setValueAnswer] = useState(PUBLIC_ANSWER_OPT[0]);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [listAttachment, setListAttachment] = useState([]);
  const [listAnswerAttachment, setListAnswerAttachment] = useState([]);
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
    <Box
      id="container"
      sx={{
        width: "100vw",
        height: "100%",
        maxHeight: "auto",
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
              id="outlined-basic"
              label="Homework Title"
              variant="filled"
              size="normal"
              sx={{
                width: "100%",
              }}
              color="success"
              fullWidth
            />
            <TextField
              id="outlined-basic"
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
                id="outlined-basic"
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
            value={valueClass}
            onChange={(event, newValue) => {
              setValueClass(newValue);
            }}
            disablePortal
            id="combo-box-demo"
            options={opt}
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
            options={opt}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Begin at"
              defaultValue={dayjs("2022-04-17T15:30")}
              slotProps={{ textField: { size: "small", color: "success" } }}
              sx={{ marginTop: "20px", width: 280 }}
            />
            <DateTimePicker
              label="Deadline"
              defaultValue={dayjs("2022-04-17T15:30")}
              slotProps={{ textField: { size: "small", color: "success" } }}
              sx={{ marginTop: "20px", width: 280 }}
            />
          </LocalizationProvider>
          <Autocomplete
            value={valueAnswer}
            onChange={(event, newValue) => {
              setValueAnswer(newValue);
            }}
            disablePortal
            id="combo-box-demo"
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

          <Typography color="#009265" variant="h6" fontWeight="bold" mt="10px">
            Features
          </Typography>
          <FormGroup>
            <FormControlLabel
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
            >
              Add Test
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
