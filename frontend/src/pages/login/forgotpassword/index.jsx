import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import AlertComponent from "../../../components/AlertComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { usePostForgotPasswordMutation } from "../../../state/api";
import HomeNavbar from "components/HomeNavbar";
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState({
    message: "",
    state: false,
    severity: "success",
  });
  const [showFields, setShowFields] = useState(true);
  const [VerifyEmail, { isLoading: loadingVerify }] =
    usePostForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (showFields) {
        try {
          const res = await VerifyEmail(values.email);
          setShowAlert({
            message: "Verify email successfully!",
            state: true,
            severity: "success",
          });
          setShowFields(false);

          if (res.data.status !== 200) {
            throw new Error("We don't recognize this email address.");
          }
          if (res.data.status === 500) {
            throw new Error(
              "We have some problem when sending email to your mailbox. Please try again later.",
            );
          }
        } catch (error) {
          setShowAlert({
            message: error.message,
            state: true,
            severity: "error",
          });
        }
      }
    },
  });

  return (
    <Box>
      <HomeNavbar title="ClassIn" IsNotHomePage={true} />
      <AlertComponent
        severity={showAlert.severity}
        message={showAlert.message}
        open={showAlert.state}
        onClose={() => setShowAlert({ ...showAlert, state: false })}
      />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          {showFields && (
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                Forgot Password
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                sx={{ textAlign: "center", color: "gray" }}
              >
                Please enter your email address to receive a verification link
              </Typography>
              <TextField
                fullWidth
                color="success"
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                disabled={loadingVerify}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                style={{
                  marginTop: "20px",
                  backgroundColor: loadingVerify ? "#bbbdbd" : "#009265",
                  color: loadingVerify ? "#797a7a" : "white",
                }}
                disabled={loadingVerify}
              >
                {loadingVerify ? "Verifying..." : "Send"}
              </Button>
            </Box>
          )}
          {!showFields && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleOutline
                sx={{
                  fontSize: "4rem",
                  color: "#009265",
                  textAlign: "center",
                  marginBottom: "50px",
                }}
              />
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                We have sent a verification link to your email.<br></br>Please
                check your mailbox to recovery your password.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  marginTop: "20px",
                  backgroundColor: "#009265",
                }}
                onClick={() => navigate("/signin")}
              >
                Go to sign in
              </Button>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
