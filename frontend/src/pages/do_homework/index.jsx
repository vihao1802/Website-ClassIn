import React, { useEffect } from "react";
import HomeNavbar from "../../components/HomeNavbar";
import {
  useGetHomeWorkByHomeworkIdQuery,
  useGetFileHomeworkByHomeworkIdQuery,
} from "state/api";
import { Typography, Box, Button } from "@mui/material";
import {
  Add,
  FileUploadOutlined,
  InsertLinkRounded,
} from "@mui/icons-material";
import { MenuItem, Menu, Dropdown, MenuButton } from "@mui/joy";
import { useState } from "react";
import AttachmentLink from "components/homework/AttachmentLink";
import DohomeworkFile from "components/homework/DohomeworkFile";

export default function DoHomework({ mabaitap }) {
  const { data: HomeworkQuery, isLoading: isLoadingHomeworkQuery } =
    useGetHomeWorkByHomeworkIdQuery("366b71e2-d12d-4a57-9240-b7411b3b84bd");
  const { data: FileQuery, isLoading: isLoadingFileQuery } =
    useGetFileHomeworkByHomeworkIdQuery("366b71e2-d12d-4a57-9240-b7411b3b84bd");
  const [homework, setHomework] = useState({});
  const [fileHomework, setFileHomework] = useState([]);
  const [listAttachment, setListAttachment] = useState([]);
  const handleClose = () => setAnchorEl(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const isOpen = Boolean(anchorEl);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
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
      const formData = new FormData();
      formData.append("file", listAttachment[0].file);
      // console.log(formData);
      const response = await fetch(
        "https://www.googleapis.com/upload/drive/v2/files?uploadType=media",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_DRIVE_API_KEY}`,
          },
          body: formData,
        },
      );
      const data = await response.json();
      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
      });
    }
  }, [FileQuery, isLoadingFileQuery]);

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
        handleSubmit(e);
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
                justifyContent: "space-between",
                gap: "2%",
              }}
            >
              {listAttachment.map((attachment) => (
                <AttachmentLink
                  Title={attachment.Title}
                  Subtitle={attachment.Subtitle}
                  Thumbnail={attachment.Thumbnail}
                  handleRemove={() => removeAnswerAttachment(attachment.Vid_id)}
                />
              ))}
            </Box>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
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
            >
              <MenuItem onClick={handleOpenModalFile}>Upload file</MenuItem>
              <DohomeworkFile
                open={openUploadFile}
                handleClose={handleCloseModalFile}
                // handleClass={handleJoin}
                title={"Join class"}
                setListAttachment={setListAttachment}
              />
            </Menu>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#009265",
                "&:hover": { backgroundColor: "#007850" },
                width: "100%",
                alignSelf: "flex-end",
              }}
              disabled={listAttachment.length === 0 ? true : false}
              type="submit"
            >
              {listAttachment.length === 0 ? "Add your work" : "Turn in"}
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
