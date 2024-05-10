import React, { useState } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Link,
  Box,
} from "@mui/material";
import AlertComponent from "../../../components/AlertComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import return_icon from "../../../assets/return.png";
import { useNavigate } from "react-router-dom";
import { usePostForgotPasswordMutation } from "../../../state/authApi";
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
  const [showFields, setShowFields] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [VerifyEmail, { isVerifingEmail }] = usePostForgotPasswordMutation();
  function handleInput(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    const fieldName = e.target.name;
    const fieldValue = e.target.value.replace(/[^0-9]/g, "");
    formik.setFieldValue(fieldName, fieldValue);
  }
  function handleSubmit() {
    const code =
      formik.values.digit1 +
      formik.values.digit2 +
      formik.values.digit3 +
      formik.values.digit4 +
      formik.values.digit5 +
      formik.values.digit6;

    if (code === generatedCode) {
      console.log("Mã xác nhận đúng:", code, generatedCode);
    } else {
      console.log("Mã xác nhận sai:", code, generatedCode);
    }
    // Chặn sự kiện mặc định của form submit
    //event.preventDefault();
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form data", values);
      if (!showFields) {
        try {
          const res = await VerifyEmail(values.email);
          setShowAlert({
            message: "Verify email successfully!",
            state: true,
            severity: "success",
          });
          if (res.status !== 200) {
            throw new Error("We don't recognize this email address.");
          }
          if (res.status === 500) {
            throw new Error(
              "We have some problem when sending email to your mailbox. Please try again later.",
            );
          }
          setShowFields(true);
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
    <Container maxWidth="sm">
      <AlertComponent
        severity={showAlert.severity}
        message={showAlert.message}
        open={showAlert.state}
        onClose={() => setShowAlert({ ...showAlert, state: false })}
      />
      <AppBar
        sx={{ bgcolor: "white", boxShadow: "0 0 4px 0 black", display: "flex" }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <img
              src={return_icon}
              alt="return"
              style={{ width: "40px", height: "40px" }}
              onClick={() => navigate(`/`)}
            />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, color: "#009265", fontWeight: "bold" }}
          >
            ClassIn
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "250px" }}
      >
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            {!showFields && (
              <>
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
                  Please enter your email address to receive a verification code
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
                />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  style={{ marginTop: "20px", backgroundColor: "#009265" }}
                  disabled={isVerifingEmail}
                >
                  {isVerifingEmail ? "Verifying..." : "Send"}
                </Button>
              </>
            )}
            {/* {showFields && (
              <>
                <Typography
                  variant="h4"
                  component="div"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  Nhập mã xác nhận
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginLeft: "10px",
                    marginTop: "50px",
                    gap: "45px",
                    width: "50px",
                    height: "50px",
                    fontSize: "40px",
                    fontWeight: "none",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="text"
                    name="digit1"
                    maxLength="1"
                    style={{ width: "50px", height: "50px" }}
                    onChange={handleInput}
                    value={formik.values.digit1}
                  />
                  <input
                    type="text"
                    name="digit2"
                    maxLength="1"
                    style={{ width: "50px", height: "50px" }}
                    onChange={handleInput}
                    value={formik.values.digit2}
                  />
                  <input
                    type="text"
                    name="digit3"
                    maxLength="1"
                    style={{ width: "50px", height: "50px" }}
                    onChange={handleInput}
                    value={formik.values.digit3}
                  />
                  <input
                    type="text"
                    name="digit4"
                    maxLength="1"
                    style={{ width: "50px", height: "50px" }}
                    onChange={handleInput}
                    value={formik.values.digit4}
                  />
                  <input
                    type="text"
                    name="digit5"
                    maxLength="1"
                    style={{ width: "50px", height: "50px" }}
                    onChange={handleInput}
                    value={formik.values.digit5}
                  />
                  <input
                    type="text"
                    name="digit6"
                    maxLength="1"
                    style={{ width: "50px", height: "50px" }}
                    onChange={handleInput}
                    value={formik.values.digit6}
                  />
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  style={{ marginTop: "100px", backgroundColor: "#009265" }}
                  onClick={() => handleSubmit()}
                >
                  Xác nhận
                </Button>
              </>
            )} */}
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPasswordForm;
