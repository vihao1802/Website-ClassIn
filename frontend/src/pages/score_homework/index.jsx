import { useParams, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import {
  useGetHomeWorkByHomeworkIdQuery,
  useGetFileHomeworkByHomeworkIdQuery,
} from "state/api";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  List,
  TextField,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, AttachFile, PictureAsPdf } from "@mui/icons-material";
import { MenuItem, Menu } from "@mui/joy";
import { useState } from "react";
import AttachmentLink from "components/homework/AttachmentLink";
import DohomeworkFile from "components/homework/DohomeworkFile";
import DohomeworkLink from "components/homework/DohomeworkLink";
import {
  useGetUserQuery,
  useUpdateHomeworkWorkMutation,
  useGetFileHomeworkWorkByWorkIdQuery,
  useGetWorkByUserIdAndHomeworkIdQuery,
} from "state/api";

import FileItem from "components/homework/FileItem";
import * as yup from "yup";
import { useFormik } from "formik";
import AlertComponent from "../../components/AlertComponent";

import { deleteFileFromDrive } from "utils/google_ulti";
import { getUserId_Cookie } from "../../utils/handleCookies";

export default function ScoreHomework() {
  const { homeworkId, studentId } = useParams();
  const { data: HomeworkQuery, isLoading: isLoadingHomeworkQuery } =
    useGetHomeWorkByHomeworkIdQuery(homeworkId);
  const { data: WorkQuery, isLoading: isLoadingWorkQuery } =
    useGetWorkByUserIdAndHomeworkIdQuery({
      userId: studentId,
      homeworkId: homeworkId,
    });
  const { data: FileHomeworkWorkQuery, isLoading: isLoadingFileHomeworkWork } =
    useGetFileHomeworkWorkByWorkIdQuery(WorkQuery?.[0]?.ma_baiLamBaiTap);
  const { data: StudentQuery, isLoading: isLoadingStudentQuery } =
    useGetUserQuery(studentId);

  const [listAttachment, setListAttachment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [embbedLink, setEmbbedLink] = useState("");
  const [avatar, setAvatar] = useState("");
  const [homework, setHomework] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!isLoadingHomeworkQuery && HomeworkQuery) {
      setHomework(HomeworkQuery);
    }
  }, [HomeworkQuery, isLoadingHomeworkQuery]);
  useEffect(() => {
    if (FileHomeworkWorkQuery && !isLoadingFileHomeworkWork) {
      let list = [];
      list = FileHomeworkWorkQuery.map((item) => {
        return {
          tenFile: item.tenFile,
          ma_file: item.ma_file,
        };
      });
      setListAttachment(list);
    }
  }, [FileHomeworkWorkQuery, isLoadingFileHomeworkWork]);

  useEffect(() => {
    if (StudentQuery && !isLoadingStudentQuery) {
      console.log(StudentQuery);
      try {
        const fetchData = async () => {
          const studentInfo = await fetchFileFromDrive(StudentQuery?.avatar);
          setAvatar(studentInfo?.thumbnailLink);
        };
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  }, [StudentQuery, isLoadingStudentQuery]);

  const fetchFileFromDrive = async (fileId) => {
    const google_drive_url = "https://www.googleapis.com/drive/v2/files";
    const data = await (
      await fetch(
        `${google_drive_url}/${fileId}?key=${process.env.REACT_APP_GOOGLE_DRIVE_API_KEY}`,
        {
          method: "GET",
        },
      )
    ).json();
    return data;
  };
  const fileItemHandle = async (fileId) => {
    setIsLoading(true);
    const data = await fetchFileFromDrive(fileId);

    setIsLoading(false);
    setEmbbedLink(data.embedLink);
  };
  const [showAlert, setShowAlert] = useState({ message: "", state: false });

  const [UpdateHomeworkWork, { isLoading: isLoadingHomeworkWork }] =
    useUpdateHomeworkWorkMutation();
  const validationSchema = yup.object({
    score: yup
      .number()
      .min(0, "Grade must be positive")
      .max(100, "Grade must be less or equal than 100")
      .required("Score is required"),
  });
  const formik = useFormik({
    initialValues: {
      score: 0,
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await UpdateHomeworkWork({
        ma_baiLamBaiTap: WorkQuery?.[0]?.ma_baiLamBaiTap,
        diem: values.score,
        nhanXet: values.comment,
      });
      if (response.data === undefined || response.data === null) {
        throw new Error("Return score failed.");
      }
      setShowAlert({
        message: "Return successfully!",
        state: true,
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setShowAlert({
        message: "Return score failed.",
        state: true,
        severity: "error",
      });
    }
  };
  const handleConfirm = () => {
    formik.handleSubmit();
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <HomeNavbar IsNotHomePage={true} />
      <AlertComponent
        severity="success"
        message={showAlert.message}
        open={showAlert.state}
        onClose={() => setShowAlert({ ...showAlert, state: false })}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "50.8px",
          borderBottom: "1px solid #e7e7e7",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            padding: "0.5rem",
            color: "#009265",
            width: "80%",
          }}
        >
          {homework?.tieuDe}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
            width: "20%",
          }}
        >
          <Avatar src={avatar}></Avatar>
          <Typography
            variant="subtite2"
            color="gray"
            sx={{
              width: "50%",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {StudentQuery?.hoTen}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "calc(100% - 50.8px)",
          borderRight: "1px solid #e7e7e7",
        }}
      >
        <Box
          sx={{
            width: "80%",
            height: "100%",
            padding: "10px",
            borderRight: "1px solid #e7e7e7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {embbedLink === "" ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h3" color="gray">
                No file selected
              </Typography>
              <Typography variant="body1">Choose a file to view</Typography>
            </Box>
          ) : isLoading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress color="success" size="5rem" />
            </Box>
          ) : (
            <iframe
              title="File viewer"
              src={embbedLink}
              width="100%"
              height="100%"
            ></iframe>
          )}
        </Box>

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
          <Typography variant="subtitle2">
            Turned in on May 11, 2:58 PM
          </Typography>
          <List>
            {listAttachment.map((item) => {
              return (
                <FileItem
                  FileName={item.tenFile}
                  FileType="PDF"
                  HandleClick={() => fileItemHandle(item.ma_file)}
                />
              );
            })}
          </List>
          <TextField
            color="success"
            name="comment"
            label="Comment"
            variant="outlined"
            multiline
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // formik.handleSubmit(e);
              setOpen(true);
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <TextField
                name="score"
                color="success"
                label="Score"
                variant="outlined"
                onChange={formik.handleChange}
                error={formik.touched.score ? formik.errors.score : undefined}
                helperText={formik.errors.score}
              />

              <Typography
                variant="body2"
                sx={{
                  color: "gray",
                }}
              >
                /100
              </Typography>
            </Box>
            <Button
              variant="outlined"
              type="submit"
              sx={{
                backgroundColor: "#009265",
                color: "white",
                marginTop: "1rem",
                width: "100%",
              }}
              disabled={isLoadingHomeworkWork}
            >
              {isLoadingHomeworkWork ? "Returning..." : "Return"}
            </Button>
          </form>
          <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
          >
            <DialogTitle id="confirm-dialog-title">
              Confirm Submission
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="confirm-dialog-description">
                <Typography variant="subtitle2">
                  Student will be notified and can check any grade you've left
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  <Avatar src={avatar}></Avatar>
                  <Typography
                    variant="subtite2"
                    color="gray"
                    sx={{
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {StudentQuery?.hoTen}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "gray",
                    }}
                  >
                    {formik.values.score}/100
                  </Typography>
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </>
  );
}
