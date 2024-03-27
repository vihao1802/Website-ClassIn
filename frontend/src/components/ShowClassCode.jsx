import React, { useState } from "react";
import {
  Modal,
  Box,
  IconButton,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";
import { CloseRounded, ContentCopyRounded } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

const ShowClassCode = ({ open, handleClose }) => {
  const [copy, setCopy] = useState(false);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "50%",
            bgcolor: "background.paper",
            border: "1px solid #e7e7e7",
            boxShadow: 24,
            borderRadius: "10px",
            padding: "10px 20px",
          }}
        >
          <Box textAlign="right">
            <IconButton
              sx={{
                color: "#009265",
                width: "40px",
              }}
              onClick={handleClose}
            >
              <CloseRounded />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "70%",
                padding: "20px",
                borderBottom: "2px solid #009265",
              }}
            >
              <Typography fontSize="128px" color="#009265">
                cd5y78
              </Typography>
            </Box>
            <FlexBetween p="10px 0">
              <Typography variant="h6" color="#009265">
                Cong nghe phan mem
              </Typography>
              <Button
                variant="primary"
                sx={{
                  backgroundColor: "white",
                  color: "#009265",
                  gap: 1,
                }}
                onClick={() => {
                  navigator.clipboard.writeText("");
                  setCopy(true);
                }}
              >
                Copy Code
                <ContentCopyRounded />
              </Button>
            </FlexBetween>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={copy}
        autoHideDuration={1200}
        message="Class code copied"
        onClose={() => setCopy(false)}
      />
    </>
  );
};

export default ShowClassCode;
