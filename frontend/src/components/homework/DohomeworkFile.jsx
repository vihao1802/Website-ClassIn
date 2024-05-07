import React, { useState, useCallback } from "react";
import { Link, Button, Box, Avatar, Typography } from "@mui/material";
import { Modal, Sheet, ModalClose, MenuItem } from "@mui/joy";
import { v4 as uuidv4 } from "uuid";

import { useDropzone } from "react-dropzone";
export default function AddFileUploadButton(props) {
  const onDrop = useCallback((acceptedFile) => {
    // console.log(acceptedFile);
    props.handleClose();

    props.setListAttachment((currentList) => {
      return [
        ...currentList,
        {
          Vid_id: uuidv4(),
          Title: acceptedFile[0].name,
          Subtitle: "." + acceptedFile[0].name.split(".")[1],
          Thumbnail: URL.createObjectURL(acceptedFile[0]),
          file: acceptedFile[0],
        },
      ];
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
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
            width: "50%",
            height: "70%",
            borderRadius: "md",
            p: 3,
          }}
        >
          <ModalClose variant="outlined" />
          <Box
            {...getRootProps()}
            sx={{
              height: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Box>
        </Sheet>
      </Modal>
    </>
  );
}
