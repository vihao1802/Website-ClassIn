import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import {
  useGetUnregisteredUsersQuery,
  usePostUserResigeterMutation,
} from "state/api";
import AlertComponent from "./AlertComponent";
import state from "state";

const AddStudentToClass = ({
  open,
  handleClose,
  setShowAlert,
  refetchStudents,
}) => {
  const { classId } = useParams();
  const {
    data: users,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetUnregisteredUsersQuery(classId);
  const [emailItems, setEmailItems] = useState([]);

  const [selectedEmails, setSelectedEmails] = useState([]);
  useEffect(() => {
    if (users && !usersLoading) {
      setEmailItems(
        users.map((user) => ({
          id: user.ma_taiKhoan,
          cid: classId,
          title: user.email,
        })),
      );
    }
  }, [users, usersLoading]);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const [addUsersRegister, data] = usePostUserResigeterMutation();
  const handleClickAddUsersRegister = () => {
    if (selectedEmails.length === 0) {
      setIsEmailEmpty(true);
      return;
    }
    addUsersRegister(
      selectedEmails.map((item) => ({
        ma_lopHoc: item.cid,
        ma_taiKhoan: item.id,
      })),
    );
    refetchUsers();
    refetchStudents();
    setSelectedEmails([]);
    handleClose();
    setShowAlert({ message: "Add student successfully", state: true });
  };

  return (
    <Modal open={open}>
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
              value={selectedEmails}
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => {
                setSelectedEmails(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Email"
                  size="small"
                  color={isEmailEmpty ? "error" : "success"}
                  onChange={() => setIsEmailEmpty(false)}
                  helperText={isEmailEmpty && "Email is required"}
                  error={isEmailEmpty}
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
            onClick={handleClickAddUsersRegister}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddStudentToClass;
