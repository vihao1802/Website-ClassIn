import React, { useEffect } from "react";
import HomeNavbar from "../../components/HomeNavbar";

import { Typography, Box, Button, CircularProgress } from "@mui/material";
import { Add, AttachFile, InsertLink } from "@mui/icons-material";
import { MenuItem, Menu } from "@mui/joy";
import { useState } from "react";
import AttachmentLink from "components/homework/AttachmentLink";
import DohomeworkFile from "components/homework/DohomeworkFile";
import DohomeworkLink from "components/homework/DohomeworkLink";
import { useParams } from "react-router-dom";
import {
  usePostHomeworkWorkMutation,
  usePostHomeworkWorkFileMutation,
  useGetWorkByUserIdAndHomeworkIdQuery,
  useGetFileHomeworkWorkByWorkIdQuery,
  useDeleteHomeworkWorkFileMutation,
  useDeleteHomeworkWorkMutation,
  usePostAccessTokenMutation,
  useGetHomeWorkByHomeworkIdQuery,
  useGetFileHomeworkByHomeworkIdQuery,
} from "state/api";
import AlertComponent from "../../components/AlertComponent";

import { deleteFileFromDrive } from "utils/google_ulti";
import { getUserId_Cookie } from "../../utils/handleCookies";
export default function DoHomework() {
  const [showAlert, setShowAlert] = useState({ message: "", state: false });

  const { homeworkId } = useParams();
  const userId = getUserId_Cookie();
  const { data: HomeworkQuery, isLoading: isLoadingHomeworkQuery } =
    useGetHomeWorkByHomeworkIdQuery(homeworkId);
  const { data: FileQuery, isLoading: isLoadingFileQuery } =
    useGetFileHomeworkByHomeworkIdQuery(homeworkId);
  const { data: WorkQuery, isLoading: isLoadingWorkQuery } =
    useGetWorkByUserIdAndHomeworkIdQuery({
      userId: userId,
      homeworkId: homeworkId,
    });
  const {
    data: FileHomeworkWorkQuery,
    isLoading: isLoadingFileHomeworkWork,
    refetch: refetchFileHomeworkWork,
  } = useGetFileHomeworkWorkByWorkIdQuery(WorkQuery?.[0]?.ma_baiLamBaiTap);
  const [postHomeworkWork, { isLoading: loadingPostHomeworkWork }] =
    usePostHomeworkWorkMutation();
  const [postHomeworkFileWork, { isLoading: loadingPostHomeworkFileWork }] =
    usePostHomeworkWorkFileMutation();
  const [accessToken] = usePostAccessTokenMutation();

  const [deleteWorkFile] = useDeleteHomeworkWorkFileMutation();
  const [deleteWork] = useDeleteHomeworkWorkMutation();

  const [homework, setHomework] = useState({});
  const [fileHomework, setFileHomework] = useState([]);
  const [listAttachment, setListAttachment] = useState([]);
  const handleClose = () => setAnchorEl(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [openUploadLink, setOpenUploadLink] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const handleClick = (event) => {
    if (isOpenMenu) {
      setIsOpenMenu(false);
    } else {
      setAnchorEl(event.currentTarget);
      setIsOpenMenu(true);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const access_token = await accessToken();
      const userWorkData = await postHomeworkWork({
        ma_baiTap: homeworkId,
        ma_taiKhoan: userId,
        nopTre:
          HomeworkQuery.thoiGianKetThuc < new Date().toISOString() ? 1 : 0,
      });
      listAttachment.forEach(async (attachment) => {
        const metadata = {
          name: attachment.file.name,
          mimeType: attachment.file.type,
          parents: ["11QuuncFo8yO4u8xZUgBeHwjXTBHkMLoP"],
        };
        // Multpart POST body
        const formData = new FormData();
        formData.append(
          "metadata",
          new Blob([JSON.stringify(metadata)], { type: "application/json" }),
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
        console.log(data);
        if (data.error) {
          throw new Error("Upload file failed! Please try again.");
        } else {
          try {
            const fileDataResponse = await postHomeworkFileWork({
              ma_baiLamBaiTap: userWorkData.data.ma_baiLamBaiTap,
              maFile: data.id,
              tenFile: data.name,
            });
          } catch (error) {
            throw new Error(
              "There was an error while submitting your work. Please try again later.",
            );
          }
        }
        setIsSubmited(true);
      });
      setShowAlert({
        message: "Create homework successfully!",
        state: true,
        severity: "success",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setShowAlert({
        message: "Turn in failed!",
        state: true,
        severity: "error",
      });
    }
  };

  const handleUnsubmit = async (e) => {
    setIsSubmiting(true);
    deleteFileFromDrive(FileHomeworkWorkQuery)
      .then(() => {
        deleteWorkFile({ ma_baiLamBaiTap: WorkQuery[0].ma_baiLamBaiTap });
        deleteWork({ ma_baiLamBaiTap: WorkQuery[0].ma_baiLamBaiTap });
        setIsSubmited(false);
        setIsSubmiting(false);
      })
      .catch((error) => {
        setIsSubmiting(false);

        console.error(error);
      });
  };
  const removeAnswerAttachment = (id) => {
    setListAttachment((prevList) =>
      prevList.filter((item) => item.Vid_id !== id),
    );
  };
  const handleOpenModalFile = () => {
    setOpenUploadFile(true);
  };
  const handleCloseModalFile = () => {
    setOpenUploadFile(false);
  };
  const handleOpenModalLink = () => {
    setOpenUploadLink(true);
  };
  const handleCloseModalLink = () => {
    setOpenUploadLink(false);
  };
  useEffect(() => {
    if (!isLoadingHomeworkQuery && HomeworkQuery) {
      setHomework(HomeworkQuery);
    }
  }, [HomeworkQuery, isLoadingHomeworkQuery]);
  useEffect(() => {
    if (!isLoadingFileQuery && FileQuery) {
      if (FileQuery.length === 0) return;
      const google_drive_url = "https://www.googleapis.com/drive/v2/files";
      FileQuery.forEach(async (file) => {
        if (!file.isYoutubeLink) {
          const data = await (
            await fetch(
              `${google_drive_url}/${file.ma_file}?key=${process.env.REACT_APP_GOOGLE_DRIVE_API_KEY}`,
              {
                method: "GET",
              },
            )
          ).json();
          // listFile.push({});
          setFileHomework((currentList) => {
            return [
              ...currentList,
              {
                title: data.title,
                thumbnail: data.thumbnailLink,
                downloadUrl: data.downloadUrl,
                embedLink: data.embedLink,
                laFileDapAn: file.laFileDapAn,
              },
            ];
          });
        } else {
          console.log(file);
          const url =
            "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
            file.ma_file +
            "&key=" +
            process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
          try {
            const data = await (await fetch(url)).json();
            console.log(data);
            setFileHomework((currentList) => {
              return [
                ...currentList,
                {
                  title: data.items[0].snippet.title,
                  thumbnail: data.items[0].snippet.thumbnails.high.url,
                  downloadUrl: "",
                  embedLink: `https://www.youtube.com/watch?v=${file.ma_file}`,
                  laFileDapAn: file.laFileDapAn,
                },
              ];
            });
          } catch (err) {
            console.error(err);
          }
        }
      });
    }
  }, [FileQuery, isLoadingFileQuery]);

  useEffect(() => {
    if (!isLoadingFileHomeworkWork && FileHomeworkWorkQuery) {
      if (FileHomeworkWorkQuery.length === 0) return;
      const google_drive_url = "https://www.googleapis.com/drive/v2/files";
      FileHomeworkWorkQuery.forEach(async (file) => {
        console.log(file);
        const data = await (
          await fetch(
            `${google_drive_url}/${file.ma_file}?key=${process.env.REACT_APP_GOOGLE_DRIVE_API_KEY}`,
            {
              method: "GET",
            },
          )
        ).json();
        setListAttachment((currentList) => {
          return [
            ...currentList,
            {
              Vid_id: file.ma_file,
              Title: data.title,
              Subtitle: data.downloadUrl,
              Thumbnail: data.thumbnailLink,
            },
          ];
        });
      });
    }
  }, [FileHomeworkWorkQuery, isLoadingFileHomeworkWork]);

  useEffect(() => {
    if (WorkQuery?.length !== 0) {
      setIsSubmited(true);
    } else {
      setIsSubmited(false);
    }
  }, [WorkQuery]);

  return (
    <form
      id="container"
      sx={{
        width: "100vw",
        height: "100%",
        maxHeight: "auto",
      }}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <HomeNavbar IsNotHomePage={true} />
      <AlertComponent
        severity="success"
        message={showAlert.message}
        open={showAlert.state}
        onClose={() => setShowAlert({ ...showAlert, state: false })}
      />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            padding: "20px 20px",
            width: "60%",
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                textAlign: "justify",
              }}
              color="#009265"
            >
              {homework.tieuDe}
            </Typography>
            <Typography variant="subtitle1">
              {homework.noiDungBaiTap}
            </Typography>
            <Typography variant="subtitle1">
              {homework.thoiGianKetThuc}
            </Typography>
            <hr />
          </Box>
          <Box
            sx={{
              height: "100vh",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "start",
                gap: "2%",
                height: "auto",
                maxHeight: "10rem",
                overflowY: "auto",
              }}
            >
              {fileHomework.map((attachment) => {
                if (attachment.laFileDapAn === 0) {
                  return (
                    <AttachmentLink
                      width="45%"
                      Title={attachment.title}
                      Thumbnail={attachment.thumbnail}
                      linkAttachment={attachment.embedLink}
                      isRemoveAble={false}
                    />
                  );
                } else {
                  return null;
                }
              })}
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "2%",
                width: "100%",
              }}
              id="add-answer-container"
            >
              <Typography variant="subtitle1">
                {homework.noiDungDapAn}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "start",
                  gap: "2%",
                  height: "auto",
                  maxHeight: "10rem",
                  overflowY: "auto",
                }}
              >
                {fileHomework.map((attachment) => {
                  if (attachment.laFileDapAn === 1) {
                    return (
                      <AttachmentLink
                        width="45%"
                        Title={attachment.title}
                        Thumbnail={attachment.thumbnail}
                        linkAttachment={attachment.embedLink}
                        isRemoveAble={false}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          {/* WORK */}
          <Box
            sx={{
              width: "100%",
              padding: "20px 20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              border: "1px solid gray ",
              borderRadius: "5px",
              // height: "fit-content",
              boxShadow: "0px 0px 5px 0px #000000",
            }}
          >
            <Typography color="#009265" variant="h6" fontWeight="bold">
              Your work
            </Typography>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "right",
              }}
            >
              <Box
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  gap: "5px",
                }}
              >
                {listAttachment.map((attachment) => (
                  <AttachmentLink
                    Title={attachment.Title}
                    Subtitle={attachment.Subtitle}
                    Thumbnail={attachment.Thumbnail}
                    handleRemove={() => {
                      removeAnswerAttachment(attachment.Vid_id);
                    }}
                    isRemoveAble={!isSubmited}
                  />
                ))}
              </Box>
              <Button
                onClick={handleClick}
                sx={{
                  display: !isSubmited ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                  color: "#009265",
                  marginBottom: "20px",
                  border: "1px solid #009265",
                }}
              >
                <Add sx={{ color: "#009265", fontSize: "18px" }} />
                Add your work
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={isOpenMenu}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                sx={{
                  width: "22%",
                }}
              >
                <MenuItem
                  sx={{
                    paddingLeft: "10%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10%",
                  }}
                  onClick={handleOpenModalFile}
                >
                  <AttachFile />
                  <Typography variant="subtitle1">File</Typography>
                </MenuItem>
                <DohomeworkFile
                  open={openUploadFile}
                  handleClose={handleCloseModalFile}
                  setListAttachment={setListAttachment}
                />
                <MenuItem
                  sx={{
                    paddingLeft: "10%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10%",
                  }}
                  onClick={handleOpenModalLink}
                >
                  <InsertLink />
                  <Typography variant="subtitle1">Link</Typography>
                </MenuItem>
                <DohomeworkLink
                  open={openUploadLink}
                  handleClose={handleCloseModalLink}
                  setListAttachment={setListAttachment}
                />
              </Menu>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "red",
                  marginBottom: "20px",
                  backgroundColor: "#ff00001a",
                  borderRadius: "5px",
                  display: errorMessage === "" ? "none" : "block",
                }}
              >
                {errorMessage}
              </Typography>
              {(WorkQuery?.[0]?.diem <= -1 || WorkQuery?.length === 0) && (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#009265",
                      "&:hover": { backgroundColor: "#007850" },
                      width: "100%",
                      alignSelf: "flex-end",
                      display: isSubmited ? "none" : "initial",
                    }}
                    disabled={
                      loadingPostHomeworkWork || loadingPostHomeworkFileWork
                    }
                    type="submit"
                  >
                    {listAttachment.length === 0 ? (
                      "Add your work"
                    ) : loadingPostHomeworkWork ||
                      loadingPostHomeworkFileWork ? (
                      <CircularProgress
                        sx={{
                          color: "white",
                        }}
                        size="1rem"
                      />
                    ) : (
                      "Turn In"
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#009265",
                      "&:hover": { backgroundColor: "#007850" },
                      width: "100%",
                      alignSelf: "flex-end",
                      display: isSubmited ? "initial" : "none",
                    }}
                    onClick={handleUnsubmit}
                  >
                    {isSubmiting ? (
                      <CircularProgress
                        sx={{
                          color: "white",
                        }}
                        size="1rem"
                      />
                    ) : (
                      "Unsubmit"
                    )}
                  </Button>
                </>
              )}
            </Box>
          </Box>
          {/* SCORE DISPLAY  */}
          <Box
            sx={{
              width: "100%",
              padding: "20px 20px",
              margin: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              border: "1px solid gray ",
              borderRadius: "5px",
              height: "fit-content",
              boxShadow: "0px 0px 5px 0px #000000",
            }}
          >
            <Typography color="#009265" variant="h6" fontWeight="bold">
              Your score:
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                height: "100%",
              }}
            >
              <Typography variant="h4" sx={{ color: "#009265" }}>
                {WorkQuery?.[0]?.diem === -1
                  ? "Not graded"
                  : WorkQuery?.[0]?.diem}
              </Typography>
              <Typography variant="subtitle1">
                {WorkQuery?.[0]?.diem === -1
                  ? "Your work has not been graded yet"
                  : "Your work has been graded"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
