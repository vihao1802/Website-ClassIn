import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const schemaJoin = yup.object({
  code: yup.string().required("Code is required"),
});
const schemaCreate = yup.object({
  name: yup
    .string()
    .max(50, "Name characters must be shorter than 50")
    .required("Name is required"),
});

const ModalHandleCLass = (props) => {
  const forMikJoin = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: schemaJoin,
    onSubmit: (values) => {
      //   console.log("Form data:", values);
      alert("Code: " + values.code);
      props.handleClass();
    },
  });
  const forMikCreate = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schemaCreate,
    onSubmit: (values) => {
      //   console.log("Form data:", values);
      alert("Name: " + values.name);
      props.handleClass();
    },
  });

  return (
    <div>
      <Modal
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "520px",
            height: "530px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#009265" }}
          >
            {props.title}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography
              id="modal-modal-description"
              sx={{ fontWeight: "bold", color: "#374254" }}
            >
              {props.title === "Join class"
                ? "Enter class's code"
                : "Enter class's name"}
            </Typography>
            <TextField
              id="outlined-textarea"
              label={props.title === "Join class" ? "Code" : "Name"}
              placeholder={
                props.title === "Join class"
                  ? "Ex: awfbe2fvq"
                  : "Ex: Math class"
              }
              sx={{ width: "100%", marginTop: "15px" }}
              name={props.title === "Join class" ? "code" : "name"}
              value={
                props.title === "Join class"
                  ? forMikJoin.values.code
                  : forMikCreate.values.name
              }
              onChange={
                props.title === "Join class"
                  ? forMikJoin.handleChange
                  : forMikCreate.handleChange
              }
              error={
                props.title === "Join class"
                  ? forMikJoin.touched.code && Boolean(forMikJoin.errors.code)
                  : forMikCreate.touched.name &&
                    Boolean(forMikCreate.errors.name)
              }
              helperText={
                props.title === "Join class"
                  ? forMikJoin.touched.code && forMikJoin.errors.code
                  : forMikCreate.touched.name && forMikCreate.errors.name
              }
              // multiline
            />
            <Typography
              id="modal-modal-description"
              sx={{ fontWeight: "bold", color: "#374254", marginTop: "15px" }}
            >
              {props.title === "Join class"
                ? "To get in the class"
                : "To create the class"}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ marginTop: "15px", paddingLeft: "20px" }}
            >
              {props.title === "Join class"
                ? "Ask teacher for the class code then enter it here."
                : "Enter the class name and click create."}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              marginTop: "auto",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#9da5b1",
                color: "black",
                maxWidth: "100px",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#8690a3",
                },
              }}
              onClick={() => props.handleClose()}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "#009265",
                color: "white",
                maxWidth: "100px",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#007850",
                },
              }}
              onClick={() => {
                if (props.title === "Join class") {
                  forMikJoin.submitForm();
                } else {
                  forMikCreate.submitForm();
                }
              }}
            >
              {props.title === "Join class" ? "Join" : "Create"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalHandleCLass;
