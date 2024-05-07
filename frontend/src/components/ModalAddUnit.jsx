import React, { useState } from "react";
import {
  Modal,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
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
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            height: "30%",
            bgcolor: "background.paper",
            border: "1px solid #e7e7e7",
            boxShadow: 24,
            borderRadius: "10px",
            padding: "10px 20px",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <FlexBetween>
              <Typography variant="h6" color="#009265">
                Add Unit
              </Typography>
              <IconButton
                sx={{
                  color: "#009265",
                  width: "40px",
                }}
                onClick={handleClose}
              >
                <CloseRounded />
              </IconButton>
            </FlexBetween>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "75%",
                paddingTop: "10px",
              }}
            >
              <Typography variant="h7" color="#009265" fontWeight="bold">
                Unit Title
              </Typography>
              <TextField color="success" size="small" fullWidth />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                marginTop: "10px",
              }}
            >
              <Button
                ml="auto"
                variant="contained"
                sx={{
                  backgroundColor: "#009265",
                  "&:hover": { backgroundColor: "#007850" },
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ShowClassCode;
