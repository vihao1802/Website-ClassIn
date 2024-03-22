import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import HomeNavbar from "components/HomeNavbar";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().min(1, "Name is required").required("Name is required"),
  phonenumber: yup
    .string()
    .matches(
      /^0[0-9]{9}$/,
      "Phone number must start with 0 and contain exactly 10 digits",
    )
    .required("Phone Number is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  passwordverify: yup
    .string()
    .oneOf([yup.ref("password")], "Password Verify must match with Password")
    .min(8, "Password Verify should be of minimum 8 characters length")
    .required("Password Verify is required"),
});

const Siginform = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordverify: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form data:", values);
      alert("Email: " + values.email + ", Password: " + values.password);
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
      <HomeNavbar IsNotHomePage={true} />
      <Container
        sx={{
          height: "500px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100% !important",
          maxWidth: "500px !important",
        }}
      >
        <Grid container justifyContent="center" width={"100%"}>
          <Grid item padding={"0 !important"}>
            <form onSubmit={formik.handleSubmit} style={{ padding: "0" }}>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                Sign up
              </Typography>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="User Name"
                margin="normal"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ margin: "8px 0" }}
              />
              {/* <TextField
                fullWidth
                id="phonenumber"
                name="phonenumber"
                label="Phone Number"
                variant="outlined"
                margin="normal"
                value={formik.values.phonenumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phonenumber &&
                  Boolean(formik.errors.phonenumber)
                }
                helperText={
                  formik.touched.phonenumber && formik.errors.phonenumber
                }
              /> */}
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ margin: "8px 0" }}
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                sx={{ margin: "8px 0" }}
              />
              <TextField
                fullWidth
                id="passwordverify"
                name="passwordverify"
                label="Password Verify"
                type="password"
                variant="outlined"
                margin="normal"
                value={formik.values.passwordverify}
                onChange={formik.handleChange}
                error={
                  formik.touched.passwordverify &&
                  Boolean(formik.errors.passwordverify)
                }
                helperText={
                  formik.touched.passwordverify && formik.errors.passwordverify
                }
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
                  height: "45px",
                }}
              >
                Sign Up
              </Button>

              <Typography
                variant="body2"
                align="center"
                style={{ marginTop: "20px" }}
              >
                Already have an account.{" "}
                <Link
                  href="#"
                  color="#009265"
                  onClick={() => navigate(`/signin`)}
                  underline="none"
                >
                  Sign In?
                </Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Siginform;
