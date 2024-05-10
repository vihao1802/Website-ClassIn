import React, { useState, useEffect } from "react";
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
import { useFormik } from "formik";
import * as yup from "yup";
import { usePostAddUnitMutation, usePutEditUnitMutation } from "state/api";

const schema = yup.object({
  name: yup.string().required("Title is required"),
});

const ModalAddUnit = ({
  open,
  handleClose,
  classId,
  unit,
  mode,
  refetch,
  alert,
}) => {
  const [addUnit, dataAdd] = usePostAddUnitMutation();
  const forMikAdd = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      addUnit({ ma_lopHoc: classId, ten: values.name });
      refetch();
      handleClose();
      alert({
        message: "Add Unit successfully",
        severity: "success",
        open: true,
      });
    },
  });

  const [editUnit] = usePutEditUnitMutation();

  useEffect(() => {
    if (mode === "edit") forMikEdit.setValues({ name: unit.name });
  }, [unit]);
  const forMikEdit = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      editUnit({ ma_chuong: unit.id, ten: values.name });
      refetch();
      handleClose();
      alert({
        message: "Edit Unit successfully",
        severity: "success",
        open: true,
      });
    },
  });

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
                {mode === "add" ? "Add Unit" : "Edit Unit"}
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
              <TextField
                color="success"
                size="small"
                name="name"
                value={
                  mode === "add"
                    ? forMikAdd.values.name
                    : forMikEdit.values.name
                }
                onChange={
                  mode === "add"
                    ? forMikAdd.handleChange
                    : forMikEdit.handleChange
                }
                error={
                  mode === "add"
                    ? forMikAdd.touched.name && Boolean(forMikAdd.errors.name)
                    : forMikEdit.touched.name && Boolean(forMikEdit.errors.name)
                }
                helperText={
                  mode === "add"
                    ? forMikAdd.touched.name && forMikAdd.errors.name
                    : forMikEdit.touched.name && forMikEdit.errors.name
                }
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
                onClick={() =>
                  mode === "add"
                    ? forMikAdd.submitForm()
                    : forMikEdit.submitForm()
                }
              >
                {mode === "add" ? "Add" : "Update"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalAddUnit;
