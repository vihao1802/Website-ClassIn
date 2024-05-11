import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useFormik } from "formik";
import * as yup from "yup";
import { usePutEditTestMutation } from "state/api";

const schema = yup.object({
  name: yup.string().required("Title is required"),
});

const ModalEditTest = ({ open, handleClose, refetch, alert, test }) => {
  const [editTest] = usePutEditTestMutation();
  const forMikEdit = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      editTest({
        tid: test.id,
        testTitle: values.name,
      });
      refetch();
      handleClose();
      alert({
        open: true,
        message: "Test Updated Successfully!",
        severity: "success",
      });
    },
  });

  useEffect(() => {
    if (forMikEdit.values.name !== test.title) {
      forMikEdit.setValues({
        name: test.title,
      });
    }
  }, [test]);

  return (
    <>
      <Modal open={open}>
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
                Edit Test
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
                Test Title
              </Typography>
              <TextField
                color="success"
                size="small"
                name="name"
                value={forMikEdit.values.name}
                onChange={forMikEdit.handleChange}
                error={
                  forMikEdit.touched.name && Boolean(forMikEdit.errors.name)
                }
                helperText={forMikEdit.touched.name && forMikEdit.errors.name}
                fullWidth
              />
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
                onClick={forMikEdit.submitForm}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalEditTest;
