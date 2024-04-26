import React, { useState, useCallback } from "react";
import { Link, Button, Box, Avatar, Typography } from "@mui/material";
import { Modal, Sheet, ModalClose, Input } from "@mui/joy";
import { v4 as uuidv4 } from "uuid";
export default function DohomeworkLink(props) {
  const [linkData, setLinkData] = useState({ items: [{ id: "" }] });
  const [inputData, setInputData] = useState("");
  const handleLinkSearch = async () => {
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

    setLinkData(data);
  };
  const handleAddLink = (title, subtitle, thumbnail) => {
    props.setListAttachment((currentList) => {
      return [
        ...currentList,
        {
          Vid_id: uuidv4(),
          Title: title,
          Subtitle: subtitle,
          Thumbnail: thumbnail,
        },
      ];
    });
  };
  return (
    <Modal
      aria-labelledby="close-modal-file-upload"
      open={props.open}
      onClose={() => {
        props.handleClose();
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
          width: "40%",
          height: "30%",
          borderRadius: "md",
          p: 3,
        }}
      >
        <ModalClose variant="outlined" />
        <Box
          sx={{
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "5%",
          }}
        >
          <Input
            sx={{
              width: "50%",
            }}
            placeholder="Type in the link..."
            variant="outlined"
            color="success"
            onChange={(e) => setInputData(e.target.value)}
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
              width: "50%",
            }}
            {...(inputData === ""
              ? "backgroundColor=gray"
              : "backgroundColor=#009265")}
            onClick={() => {
              handleAddLink(
                linkData.items[0].snippet.title,
                linkData.items[0].snippet.description,
                linkData.items[0].snippet.thumbnails.default.url,
              );
              props.handleClose();
            }}
            disabled={inputData === ""}
          >
            ADD
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
}
