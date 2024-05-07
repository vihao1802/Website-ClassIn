import React, { useState, useCallback } from "react";
import { Link, Box, Avatar } from "@mui/material";
import { Modal, Sheet, ModalClose, Button, Input } from "@mui/joy";
import { Search } from "@mui/icons-material";
import { asyncThunkCreator } from "@reduxjs/toolkit";
import { randomNumberBetween } from "@mui/x-data-grid/utils/utils";
import { v4 as uuidv4 } from "uuid";

export default function AddFileUploadButton({
  Icon,
  iconSize,
  setListAttachment,
}) {
  const [open, setOpen] = useState(false);
  const handleSearchLink = async () => {
    const inputValue = document.getElementById("link-to-upload").value;
    if (inputValue === "") return;
    setListAttachment((currentList) => {
      return [
        ...currentList,
        {
          Vid_id: uuidv4(),
          Title: inputValue,
          Subtitle: "",
          Thumbnail: "../../assets/placeholder.png",
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
        aria-labelledby="close-modal-file-upload"
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
            width: "30%",
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
              justifyContent: "end",
              gap: "20%",
            }}
          >
            <Input
              id="link-to-upload"
              label="Link"
              placeholder="Link"
              variant="outlined"
              color="success"
              size="lg"
              fullWidth
              endDecorator={
                <Search
                  sx={{
                    fontSize: "1.5rem",
                  }}
                />
              }
            />
            <Box
              sx={{
                alignSelf: "end",
                display: "flex",
                flexDirection: "row",
                justifyContent: "right",

                gap: "5%",
              }}
            >
              <Button
                variant="text"
                sx={{
                  color: "gray",
                  border: "1px solid gray",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#009265",
                  color: "white",
                }}
                onClick={handleSearchLink}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
