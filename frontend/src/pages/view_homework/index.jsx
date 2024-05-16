import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetHomeWorkByHomeworkIdQuery,
  useGetFileHomeworkByHomeworkIdQuery,
} from "state/api";
import AttachmentLink from "components/homework/AttachmentLink";
import HomeNavbar from "components/HomeNavbar";
import { Box, Typography } from "@mui/material";
import AlertComponent from "components/AlertComponent";
import dayjs from "dayjs";
import { format, parseISO } from "date-fns";
export default function ViewHomework() {
  const { homeworkId } = useParams();
  const [homework, setHomework] = useState({});
  const [showAlert, setShowAlert] = useState({ state: false, message: "" });
  const { data: HomeworkQuery, isLoading: isLoadingHomeworkQuery } =
    useGetHomeWorkByHomeworkIdQuery(homeworkId);
  const { data: FileQuery, isLoading: isLoadingFileQuery } =
    useGetFileHomeworkByHomeworkIdQuery(homeworkId);
  const [fileHomework, setFileHomework] = useState([]);

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
  const formatDateTime = (dateTime) => {
    return format(parseISO(dateTime), "dd/MM/yyyy HH:mm");
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
            <Typography variant="subtitle1" sx={{ marginBottom: "1rem" }}>
              {"From " +
                dayjs(homework.thoiGianBatDau).format("HH:mm DD/MM/YYYY") +
                " to " +
                dayjs(homework.thoiGianKetThuc).format("HH:mm DD/MM/YYYY")}
            </Typography>
            <Typography variant="subtitle1">
              {homework.noiDungBaiTap}
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
      </Box>
    </Box>
  );
}
