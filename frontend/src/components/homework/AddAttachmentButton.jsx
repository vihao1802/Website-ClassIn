import { useState } from "react";
import { Modal, Link, Box, Avatar, TextField } from "@mui/material";
import { Button } from "@mui/joy";
import { ModalClose, Sheet } from "@mui/joy";
import { Search, YouTube } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";

export default function AddAttachmentButton({
  Icon,
  iconSize,
  setListAttachment,
}) {
  const [open, setOpen] = useState(false);
  const [videoData, setVideoData] = useState({ items: [{ id: "" }] });
  const handleYoutubeLinkSearch = async () => {
    const youtubeLink = document.getElementById("youtube-link").value;
    if (!youtubeLink) return;
    const startIndex = youtubeLink.search("v=");

    const videoId = youtubeLink.slice(startIndex + 2);
    const url =
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
      videoId +
      "&key=" +
      process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
    const data = await (await fetch(url)).json();

    setVideoData(data);
  };
  const handleAddLink = (videoId, title, subtitle, thumbnail) => {
    setListAttachment((currentList) => {
      return [
        ...currentList,
        {
          Vid_id: videoId,
          Title: title,
          Subtitle: subtitle,
          Thumbnail: thumbnail,
        },
      ];
    });
  };
  return (
    <>
      <Link
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid  rgba(128, 128, 128, 0.5)",
          borderRadius: "50%",
          padding: "10px",
          color: "black",
          "&:hover": {
            border: "1px solid  #009265",
            color: "#009265",
          },
          transition: "0.5s",
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Icon
          sx={{
            fontSize: iconSize,
          }}
        />
      </Link>
      <Modal
        aria-labelledby="close-modal-youtube"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: "50%",
            height: "70%",
            borderRadius: "md",
            p: 3,
          }}
        >
          <ModalClose variant="outlined" />
          <Box>
            <Avatar
              src="https://vtv1.mediacdn.vn/zoom/640_400/2017/youtube-new-logo-1504151703840.png"
              sx={{
                width: "5rem",
                height: "2.5rem",
              }}
            />
            <hr style={{ margin: "10px 0", padding: "0" }} />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "70%",
              gap: "5%",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoData.items[0].id}`}
              frameborder="0"
              allowfullscreen
              title={"Hello"}
              style={
                videoData.items[0].id !== ""
                  ? { display: "initial", width: "100%", height: "90%" }
                  : { display: "none" }
              }
            ></iframe>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "2%",
            }}
          >
            <TextField
              id="youtube-link"
              label="Youtube Link"
              variant="outlined"
              size="normal"
              color="success"
              sx={{
                width: "90%",
                marginTop: "1rem",
              }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={(e) => handleYoutubeLinkSearch(e)}
                    >
                      <Search
                        sx={{
                          fontSize: "1.5rem",
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              color="success"
              sx={{
                marginTop: "1rem",

                "&:hover": {
                  color: "white",
                  border: "1px solid  #009265",
                  backgroundColor: "#009265",
                },
              }}
              onClick={() => {
                handleAddLink(
                  videoData.items[0].id,
                  videoData.items[0].snippet.title,
                  videoData.items[0].snippet.description,
                  videoData.items[0].snippet.thumbnails.default.url,
                );
                setOpen(false);
              }}
              disabled={videoData.items[0].id === ""}
            >
              ADD
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
