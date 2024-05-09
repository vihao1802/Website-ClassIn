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

const Sigupform = () => {
  const navigate = useNavigate();
  const [SigningUp, setSigningUp] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phonenumber: "",
      password: "",
      passwordverify: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSigningUp(true);
      fetch("http://192.168.1.103:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hoTen: values.name,
          email: values.email,
          dienThoai: values.phonenumber,
          anhDaiDien: "",
          matKhau: values.password,
          cfm_password: values.passwordverify,
          ma_nhomQuyen: "8cb96e51-9749-40c9-9799-bb5e25057816",
        }),
      })
        .then((response) => {
          if (response.ok) {
            navigate(`/signin`);
          }
          return response.json();
        })
        .then((data) => {
          setSigningUp(false);
          setMessage(data.detail);
        })
        .catch((err) => {
          setSigningUp(false);
          // setMessage("Server error");
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
      <HomeNavbar IsNotHomePage={true} title="Sign Up" />
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
                  Sign up
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    backgroundColor: "#f8d7da",
                    color: "#721c24",
                    textAlign: "center",
                    lineHeight: "2.5rem",
                  }}
                >
                  {message}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  color="success"
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
                <TextField
                  fullWidth
                  size="small"
                  color="success"
                  id="phonenumber"
                  name="phonenumber"
                  label="Phone Number"
                  variant="outlined"
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phonenumber &&
                    Boolean(formik.errors.phonenumber)
                  }
                  helperText={
                    formik.touched.phonenumber && formik.errors.phonenumber
                  }
                  sx={{ margin: "8px 0" }}
                />
                <TextField
                  fullWidth
                  size="small"
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
                  size="small"
                  color="success"
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
                    formik.touched.passwordverify &&
                    formik.errors.passwordverify
                  }
                  sx={{ margin: "8px 0" }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  color="success"
                  type="submit"
                  style={{
                    marginTop: "8px",
                    backgroundColor: "#009265",
                  }}
                  disabled={SigningUp}
                >
                  {SigningUp ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: "white",
                      }}
                    />
                  ) : (
                    "Sign up"
                  )}
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
        </Paper>
      </Container>
    </Box>
  );
};

export default Sigupform;
