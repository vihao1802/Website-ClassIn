import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "components/HomeNavbar";

import "../../../index.css";
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Siginform = () => {
  const COOKIES_EXPIRED_TIME = 60 * 60 * 24 * 7; // 30 days
  const navigate = useNavigate();
  const [SigningIn, setSigningIn] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSigningIn(true);
      fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: values.email,
          password: values.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSigningIn(false);
          if (data.access_token) {
            document.cookie = `user_token=${data.access_token}; expires=${COOKIES_EXPIRED_TIME}; path=/`;
            navigate(`/home`);
          }
        })
        .catch((err) => {
          setSigningIn(false);
          console.log("Error", err);
        });
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HomeNavbar IsNotHomePage={true} title="Sign In" />
      <Container
        sx={{
          height: "500px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100% !important",
          maxWidth: "500px",
        }}
      >
        <Paper elevation={3} sx={{ padding: "30px" }}>
          <Grid container justifyContent="center" width={"100%"}>
            <Grid item padding={"0 !important"}>
              <form onSubmit={formik.handleSubmit} style={{ padding: "0" }}>
                <Typography
                  variant="h4"
                  component="div"
                  gutterBottom
                  textAlign="center"
                  color="#009265"
                  fontWeight="bold"
                >
                  Sign In
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  color="success"
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ margin: "8px 0" }}
                />
                <TextField
                  fullWidth
                  size="small"
                  color="success"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ margin: "8px 0" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  style={{
                    marginTop: "8px",
                    backgroundColor: "#009265",
                  }}
                  disabled={SigningIn}
                >
                  {SigningIn ? (
                    <CircularProgress size={24} color="white" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ marginTop: "20px" }}
                >
                  <Link href="#" color="#009265" underline="none">
                    Forgot Password
                  </Link>
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ marginTop: "10px" }}
                >
                  No account!{" "}
                  <Link
                    href="#"
                    color="#009265"
                    onClick={() => navigate(`/signup`)}
                    underline="none"
                  >
                    Create one?
                  </Link>
                </Typography>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Siginform;
