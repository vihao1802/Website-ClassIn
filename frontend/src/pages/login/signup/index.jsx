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
    .oneOf([yup.ref("password")], "Passwords must match")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Siginform = () => {
  const navigate = useNavigate();
  const [SigningUp, setSigningUp] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phonenumber: "",
      passwordverify: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSigningUp(true);
      fetch("http://localhost:8000/auth/signup", {
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
            setSigningUp(false);
            navigate(`/signin`);
          }
          return response.json();
        })
        .catch((err) => {
          setSigningUp(false);
          console.error(err);
        });
    },
  });

  return (
    <Box>
      <HomeNavbar IsNotHomePage={true} />
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ marginTop: "10px" }}
        >
          <Grid item xs={12}>
            <form onSubmit={formik.handleSubmit}>
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
                label="Name"
                variant="outlined"
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
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
              />
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
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                {...(SigningUp
                  ? {
                      disabled: true,
                      style: {
                        backgroundColor: "gray",
                        color: "black",
                        marginTop: "20px",
                      },
                    }
                  : {
                      style: { marginTop: "20px", backgroundColor: "#009265" },
                    })}
              >
                Sign In
              </Button>
              <Typography
                variant="body2"
                align="center"
                style={{ marginTop: "20px" }}
              >
                <Link href="#" color="#009265">
                  Forgot Password
                </Link>
              </Typography>
              <Typography
                variant="body2"
                align="center"
                style={{ marginTop: "10px" }}
              >
                Already have an account
                <Link
                  href="#"
                  color="#009265"
                  onClick={() => navigate(`/signin`)}
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
