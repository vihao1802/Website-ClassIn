import React, { useState } from "react";
import * as yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "state/api";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  Link,
} from "@mui/material";
import AlertComponent from "components/AlertComponent";
import FlexBetween from "components/FlexBetween";
const schemaChangePassword = yup.object({
  currentPassword: yup
    .string()
    .trim("No leading or trailing whitespace allowed")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{1,}$/,
      "Have at least one Uppercase and one special character and one number",
    )
    .min(8, "Password should be of minimum 8 characters length")
    .required("Current Password is required"),
  newPassword: yup
    .string()
    .trim("No leading or trailing whitespace allowed")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{1,}$/,
      "Have at least one Uppercase and one special character and one number",
    )
    .min(8, "Password Verify should be of minimum 8 characters length")
    .required("New Password is required"),
});
const VerifyPassword = () => {
  const { token } = useParams();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const handleMouseDownCurrentPassword = (event) => {
    event.preventDefault();
  };
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };
  const [updatePassword, { isLoading: loadingUpdatePassword }] =
    useUpdatePasswordMutation();
  const [showAlert, setShowAlert] = useState({
    message: "",
    state: false,
    severity: "success",
  });

  const formikChangePassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: schemaChangePassword,
    onSubmit: async (values) => {
      const result = await updatePassword({
        acc_id: jwtDecode(token).id,
        data: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
      }); // replace yourPasswordData with actual data
      if (result.error) {
        setShowAlert({
          message: result.error.data.detail,
          state: true,
          severity: "error",
        });
      } else {
        setShowAlert({
          message: "Change password successfully!",
          state: true,
          severity: "success",
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
      <form onSubmit={formikChangePassword.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: 3,
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Typography variant="h7" color="#009265" fontWeight="bold">
              Current Password
            </Typography>
            <FormControl variant="outlined">
              <OutlinedInput
                size="small"
                placeholder="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCurrentPassword}
                      onMouseDown={handleMouseDownCurrentPassword}
                      edge="end"
                    >
                      {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                onBlur={formikChangePassword.handleBlur}
                onChange={formikChangePassword.handleChange}
                value={formikChangePassword.values.currentPassword}
                name="currentPassword"
                color="success"
                error={
                  Boolean(formikChangePassword.touched.currentPassword) &&
                  Boolean(formikChangePassword.errors.currentPassword)
                }
              />
              <FormHelperText sx={{ color: "red" }}>
                {formikChangePassword.touched.currentPassword &&
                  formikChangePassword.errors.currentPassword}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Typography variant="h7" color="#009265" fontWeight="bold">
              New Password
            </Typography>
            <FormControl variant="outlined">
              <OutlinedInput
                size="small"
                placeholder="New Password"
                type={showNewPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                onBlur={formikChangePassword.handleBlur}
                onChange={formikChangePassword.handleChange}
                value={formikChangePassword.values.newPassword}
                name="newPassword"
                color="success"
                error={
                  Boolean(formikChangePassword.touched.newPassword) &&
                  Boolean(formikChangePassword.errors.newPassword)
                }
              />
              <FormHelperText sx={{ color: "red" }}>
                {formikChangePassword.touched.newPassword &&
                  formikChangePassword.errors.newPassword}
              </FormHelperText>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Typography variant="h7" color="#009265" fontWeight="bold">
              Confirm Password
            </Typography>
            <FormControl variant="outlined">
              <OutlinedInput
                size="small"
                placeholder="New Password"
                type={showNewPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleMouseDownNewPassword}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                onBlur={formikChangePassword.handleBlur}
                onChange={formikChangePassword.handleChange}
                value={formikChangePassword.values.newPassword}
                name="newPassword"
                color="success"
                error={
                  Boolean(formikChangePassword.touched.newPassword) &&
                  Boolean(formikChangePassword.errors.newPassword)
                }
              />
              <FormHelperText sx={{ color: "red" }}>
                {formikChangePassword.touched.newPassword &&
                  formikChangePassword.errors.newPassword}
              </FormHelperText>
            </FormControl>
          </Box>
        </Box>
        <FlexBetween mt="20px">
          <Button
            variant="contained"
            sx={{
              backgroundColor: loadingUpdatePassword ? "#ffffff" : "#009265",
              "&:hover": { backgroundColor: "#007850" },
              width: "20%",
            }}
            disabled={loadingUpdatePassword}
            type="submit"
          >
            {loadingUpdatePassword ? "Updating..." : "Update"}
          </Button>
        </FlexBetween>
      </form>
    </Box>
  );
};
export default VerifyPassword;
