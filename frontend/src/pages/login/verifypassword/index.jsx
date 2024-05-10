import React, { useState } from "react";
import * as yup from "yup";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  useUpdatePasswordMutation,
  useChangePasswordWithLinkMutation,
} from "state/api";
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
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .trim("No leading or trailing whitespace allowed")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*.])(?=.*[0-9]).{1,}$/,
      "Have at least one Uppercase and one special character and one number",
    )
    .min(8, "Password Verify should be of minimum 8 characters length")
    .required("New Password is required"),
  cfmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "Confirm Password must match New Password",
    )
    .required("Confirm Password is required"),
});
const VerifyPassword = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/signin");
  }
  const userId = jwtDecode(token).id;
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
    useChangePasswordWithLinkMutation();
  const [showAlert, setShowAlert] = useState({
    message: "",
    state: false,
    severity: "success",
  });

  const formikChangePassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      cfmPassword: "",
    },
    validationSchema: schemaChangePassword,
    onSubmit: async (values) => {
      try {
        const result = await updatePassword({
          acc_id: userId,
          data: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        });
        setShowAlert({
          message: "Change password successfully!",
          state: true,
          severity: "success",
        });
        if (result.error) {
          throw new Error(result.error.data.detail);
        }
      } catch (err) {
        console.log(err);
        setShowAlert({
          message: err.message,
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
      <form onSubmit={formikChangePassword.handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h3" color="black">
            Change Password
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
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
                        {showCurrentPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  onBlur={formikChangePassword.handleBlur}
                  onChange={formikChangePassword.handleChange}
                  value={formikChangePassword.values.currentPassword}
                  name="currentPassword"
                  color="success"
                  disabled={loadingUpdatePassword}
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
                  disabled={loadingUpdatePassword}
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
                  placeholder="Confirm Password"
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
                  value={formikChangePassword.values.cfmPassword}
                  name="cfmPassword"
                  color="success"
                  disabled={loadingUpdatePassword}
                  error={
                    Boolean(formikChangePassword.touched.cfmPassword) &&
                    Boolean(formikChangePassword.errors.cfmPassword)
                  }
                />
                <FormHelperText sx={{ color: "red" }}>
                  {formikChangePassword.touched.cfmPassword &&
                    formikChangePassword.errors.cfmPassword}
                </FormHelperText>
              </FormControl>
            </Box>
          </Box>
          <FlexBetween
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            mt="20px"
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: loadingUpdatePassword ? "#ffffff" : "#009265",
                "&:hover": { backgroundColor: "#007850" },
                width: "50%",
              }}
              disabled={loadingUpdatePassword}
              type="submit"
            >
              {loadingUpdatePassword ? "Updating..." : "Update"}
            </Button>
          </FlexBetween>
        </Box>
      </form>
    </Box>
  );
};
export default VerifyPassword;
