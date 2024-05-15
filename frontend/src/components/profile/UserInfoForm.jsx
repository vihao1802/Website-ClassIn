import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import * as yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { useState } from "react";
import profileImage from "assets/profile.jpg";
import { useUpdateUserInfoMutation } from "state/api";
import AlertComponent from "components/AlertComponent";

const schemaUpdateInfo = yup.object({
  userid: yup.string().required("User ID is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^0[0-9]{9}$/,
      "Phone number must start with 0 and contain exactly 10 digits",
    )
    .required("Phone Number is required"),
  // avatar: yup.string().required("required"),
});

const UserInfoForm = ({ data, userId }) => {
  const [clickedAvatar, setClickedAvatar] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [updateUserInfo, { isLoading: loadingUpdateUserInfo }] =
    useUpdateUserInfoMutation();
  const [showAlert, setShowAlert] = useState({
    message: "",
    state: false,
    severity: "success",
  });
  const formikUpdateInfo = useFormik({
    initialValues: {
      userid: data.ma_taiKhoan,
      name: data.hoTen,
      email: data.email,
      phone: data.dienThoai,
    },
    validationSchema: schemaUpdateInfo,
    onSubmit: async (values) => {
      try {
        const updateInfo = await updateUserInfo({
          acc_id: userId,
          data: {
            hoTen: values.name.trim(),
            email: values.email,
            dienThoai: values.phone,
          },
        });
        if (updateInfo.error) {
          throw new Error(updateInfo.error.data.detail);
        }
        setShowAlert({
          message: "Update profile successfully!",
          state: true,
          severity: "success",
        });
      } catch (err) {
        console.log(err.message);
        setShowAlert({
          message: "Update profile failed!",
          state: true,
          severity: "error",
        });
      }
    },
  });
  return (
    <Box>
      <AlertComponent
        severity={showAlert.severity}
        message={showAlert.message}
        open={showAlert.state}
        onClose={() => setShowAlert({ ...showAlert, state: false })}
      />
      <form onSubmit={formikUpdateInfo.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <Tooltip title="Click to change avatar">
            <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="100px"
              width="100px"
              borderRadius="50%"
              sx={{
                objectFit: "cover",
                "&:hover": {
                  cursor: "pointer",
                  boxShadow: "0 0 10px 0 #666666",
                  transition: "0.3s",
                },
              }}
              onClick={() => setClickedAvatar(!clickedAvatar)}
            />
          </Tooltip>
          <Collapse orientation="horizontal" in={clickedAvatar}>
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => {
                setAvatar(acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween width="70%">
                  <Box
                    {...getRootProps()}
                    border="2px dashed #009265"
                    p="20px 30px"
                    borderRadius="5px"
                    m="10px 20px"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    minWidth="600px"
                  >
                    <input {...getInputProps()} />
                    {!avatar ? (
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#666666"
                      >
                        Choose a file or drag it here
                      </Typography>
                    ) : (
                      <FlexBetween>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="#009265"
                        >
                          {avatar.name}
                        </Typography>
                        <EditOutlined sx={{ color: "#009265" }} />
                      </FlexBetween>
                    )}
                  </Box>
                  {avatar && (
                    <IconButton onClick={() => setAvatar(null)}>
                      <DeleteOutlined sx={{ color: "#009265" }} />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Collapse>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            margin: "30px auto 0",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 24px)",
            }}
          >
            <Typography variant="h7" color="#009265" fontWeight="bold">
              User ID
            </Typography>
            <TextField
              value={formikUpdateInfo.values.userid}
              name="userid"
              color="success"
              size="small"
              disabled
              sx={{ gridColumn: "span 2" }}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 24px)",
            }}
          >
            <Typography variant="h7" color="#009265" fontWeight="bold">
              Full name
            </Typography>
            <TextField
              value={formikUpdateInfo.values.name}
              name="name"
              color="success"
              placeholder="Full name"
              size="small"
              onBlur={formikUpdateInfo.handleBlur}
              onChange={formikUpdateInfo.handleChange}
              error={
                Boolean(formikUpdateInfo.touched.name) &&
                Boolean(formikUpdateInfo.errors.name)
              }
              helperText={
                formikUpdateInfo.touched.name && formikUpdateInfo.errors.name
              }
              sx={{ gridColumn: "span 2" }}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 24px)",
            }}
          >
            <Typography variant="h7" color="#009265" fontWeight="bold">
              Email
            </Typography>
            <TextField
              value={formikUpdateInfo.values.email}
              name="email"
              color="success"
              size="small"
              disabled
              sx={{ gridColumn: "span 2" }}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "calc(50% - 24px)",
            }}
          >
            <Typography variant="h7" color="#009265" fontWeight="bold">
              Phone Number
            </Typography>
            <TextField
              value={formikUpdateInfo.values.phone}
              name="phone"
              color="success"
              placeholder="Phone Number"
              size="small"
              onBlur={formikUpdateInfo.handleBlur}
              onChange={formikUpdateInfo.handleChange}
              error={
                Boolean(formikUpdateInfo.touched.phone) &&
                Boolean(formikUpdateInfo.errors.phone)
              }
              helperText={
                formikUpdateInfo.touched.phone && formikUpdateInfo.errors.phone
              }
              sx={{ gridColumn: "span 2" }}
              fullWidth
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            marginTop: "20px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: loadingUpdateUserInfo ? "#ffffff" : "#009265",
              "&:hover": { backgroundColor: "#007850" },
              width: "20%",
            }}
            type="submit"
            disabled={loadingUpdateUserInfo}
          >
            {loadingUpdateUserInfo ? "Updating..." : "Update"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default UserInfoForm;
