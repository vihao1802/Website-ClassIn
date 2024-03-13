import React from "react";
import './SignInForm.css';
import ReactDOM from 'react-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import return_icon from "../../assets/return.png";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: validationSchema,
    onSubmit: () => {
      // if (formik.values.email.trim() === 'hybrid@gmail.com') {
      //   alert("Please enter your password.");
      //   // console.log("loi gmail")
      //   return;
      //   //console.log("email and password:",values.email,values.password)   
      // }
      //       // alert(JSON.stringify(values, null, 2));
      //alert("Hello")
    },

  });
  return (
    <div className="container">
      <div className="header">
        <img src={return_icon} alt="" />
        <div className="logo-text">ClassIn</div>
      </div>
      <div className="form-main">
        <form className="my-form" action="">
          <label className="sign-in-label" htmlFor="username">Sign In</label>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            size="small"
            style={{ marginBottom: '20px' }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            size="small"
            type="password"
            variant="outlined"
            style={{ marginBottom: '20px' }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            style={{ backgroundColor: '#009265', color: "white" }}
            variant="contained"
            fullWidth type="submit"
            onClick={() => {
              //const { email, password } = formik.values;
              //alert(`Email: ${email}, Password: ${password}`);
              if (formik.values.email=="hybrid@gmail.com")
              alert("trung gmail")
            }
            }
          >
            SIGN IN
          </Button>
          <label htmlFor="password" className="forgot-password-label">Forgot password?</label>
          <br />
          <label htmlFor="creat-accout" className="no-account-label">No account!<span>Creat one.</span></label>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
