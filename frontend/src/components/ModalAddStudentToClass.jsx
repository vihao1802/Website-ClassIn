import React from "react";
import {
  Box,
  Modal,
  IconButton,
  Typography,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

const emailItems = Array.from({ length: 100 }, (_, index) => ({
  title: `email${index + 1}@example.com`,
}));

const AddStudentToClass = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          height: "auto",
          bgcolor: "background.paper",
          border: "1px solid #e7e7e7",
          boxShadow: 24,
          borderRadius: "5px",
          padding: "10px 20px",
        }}
      >
        <FlexBetween>
          <Typography variant="h6" color="#009265">
            Add Student
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h7" color="#009265" fontWeight="bold">
              Student Email
            </Typography>
            <Autocomplete
              multiple
              id="tags-standard"
              options={emailItems}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Email"
                  size="small"
                  color="success"
                />
              )}
            />
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "right", marginTop: "10px" }}
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
    </Modal>
  );
};

export default AddStudentToClass;
