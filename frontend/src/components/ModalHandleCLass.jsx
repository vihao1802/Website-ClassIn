import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";
import { useFormik } from "formik";
import * as yup from "yup";
import { DeleteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import profileImage from "assets/profile.jpg";
import {
  usePostUserResigeterMutation,
  usePostCreateClassMutation,
} from "state/api";

const schemaJoin = yup.object({
  code: yup.string().required("Code is required"),
});
const schemaCreate = yup.object({
  name: yup
    .string()
    .max(50, "Name characters must be shorter than 50")
    .required("Name is required"),
  avatar: yup
    .mixed()
    .required("An image is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= 1048576, // 1MB
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) =>
        value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type),
    ),
});

const ModalHandleClass = (props) => {
  const [addUsersRegister, data] = usePostUserResigeterMutation();
  const forMikJoin = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: schemaJoin,
    onSubmit: (values) => {
      addUsersRegister({
        ma_lopHoc: values.code,
        ma_taiKhoan: props.userId,
      });
      props.refetchClassInfo();
      props.handleClose();
    },
  });
  const [createClass, dataCreate] = usePostCreateClassMutation();
  const forMikCreate = useFormik({
    initialValues: {
      name: "",
      avatar: null,
    },
    validationSchema: schemaCreate,
    onSubmit: async (values) => {
      if (!values.avatar) {
        forMikCreate.setFieldError("avatar", "An image is required");
        return;
      }
      if (values.name.length <= 0) {
        forMikCreate.setFieldError("name", "Name is required");
        return;
      }
      const response = await createClass({
        ma_taiKhoan: props.userId,
        ten: values.name,
        moTa: "",
        anhDaiDien: "",
      });
      props.refetchClassInfo();
      props.handleClose();
    },
  });
  const { errors } = forMikCreate;
  const [open, setOpen] = useState(false);

  const handleOpenSnack = () => {
    setOpen(true);
  };

  const handleCloseSnack = () => {
    setOpen(false);
  };

  const action = (
    <Button color="secondary" size="small" onClick={handleCloseSnack}>
      Dismiss
    </Button>
  );

  const [avatar, setAvatar] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // Function to prevent default behavior for drag over
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle image drop
  const handleDrop = (event) => {
    event.preventDefault();
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewImage(URL.createObjectURL(file));
      setAvatar(file);
      forMikCreate.setFieldValue("avatar", file);
      forMikCreate.setFieldError("avatar", undefined);
    } else {
      handleOpenSnack();
    }
  };

  const handleCLear = () => {
    setPreviewImage(null);
    setAvatar(null);
    forMikCreate.setFieldValue("avatar", null);
    forMikCreate.setFieldError("avatar", undefined);
  };

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
            bgcolor: "background.paper",
            borderRadius: 2,
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
              color="success"
              size="small"
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
            />
            <Typography
              id="modal-modal-description"
              sx={{ fontWeight: "bold", color: "#374254", marginTop: "15px" }}
            >
              {props.title === "Join class"
                ? "To get in the class"
                : "Add avatar for the class"}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ marginTop: "15px", paddingLeft: "20px" }}
            >
              {props.title === "Join class"
                ? "Ask teacher for the class code then enter it here."
                : null}
            </Typography>
            {props.title !== "Join class" ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  position: "relative",
                  margin: "0 auto",
                  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                }}
              >
                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleCloseSnack}
                  message="Choose an image file"
                  action={action}
                  style={{
                    position: "absolute",
                    top: "0",
                  }}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                />
                {avatar && (
                  <IconButton
                    onClick={handleCLear}
                    sx={{
                      position: "absolute",
                      marginLeft: "auto",
                      width: "40px",
                      height: "40px",
                      right: "0",
                      top: "0",
                      padding: "0",
                      zIndex: "10",
                      ":hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <DeleteOutlined
                      sx={{
                        color: "gray",
                        ":hover": {
                          color: "red",
                        },
                      }}
                    />
                  </IconButton>
                )}
                <Dropzone
                  acceptedFiles={["image/jpeg", "image/png"]}
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    if (previewImage) {
                      URL.revokeObjectURL(previewImage);
                    }
                    if (acceptedFiles[0].type.startsWith("image/")) {
                      setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
                      setAvatar(acceptedFiles[0]);
                      forMikCreate.setFieldValue("avatar", acceptedFiles[0]);
                      forMikCreate.setFieldError("avatar", undefined);
                    } else {
                      handleOpenSnack();
                    }
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <FlexBetween height={"100%"}>
                      <Box
                        {...getRootProps()}
                        sx={{
                          "&:hover": { cursor: "pointer" },
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: "10px",
                          borderRadius: "10px",
                        }}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          {...getInputProps()}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                            padding: "15px 0 0",
                            backgroundColor: "white",
                            borderRadius: "10px",
                          }}
                        >
                          <Box
                            component="img"
                            alt="profile"
                            src={previewImage ? previewImage : profileImage}
                            height="100px"
                            width="100px"
                            borderRadius="50%"
                            sx={{
                              margin: "0 auto",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            padding: "5px 10px",
                          }}
                        >
                          {!avatar ? (
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              color="#666666"
                              textAlign={"center"}
                              marginTop={"auto"}
                            >
                              Choose a file or drag it here
                            </Typography>
                          ) : (
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              color="#009265"
                              width={"100%"}
                              textAlign={"center"}
                            >
                              {avatar.name.length > 20
                                ? avatar.name.slice(0, 20) +
                                  "..." +
                                  avatar.name.slice(-5)
                                : avatar.name}
                            </Typography>
                          )}
                        </Box>
                        {errors.avatar && (
                          <Typography
                            color={"red"}
                            padding={"5px 0"}
                            fontSize={"15px"}
                            align="center"
                          >
                            {errors.avatar}
                          </Typography>
                        )}
                      </Box>
                    </FlexBetween>
                  )}
                </Dropzone>
              </Box>
            ) : (
              <></>
            )}
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
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#009265",
                maxWidth: "100px",
                width: "100%",
                border: "1px solid #009265",
                "&:hover": {
                  border: "1px solid #009265",
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

export default ModalHandleClass;
