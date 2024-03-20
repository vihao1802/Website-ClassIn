import React from 'react';
import { Container, AppBar, Toolbar, Typography, TextField, Button, IconButton,Grid,Link } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import return_icon from "../../../assets/return.png"
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
});

const Siginform = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //console.log('Form data:', values);
      alert('Email: ' + values.email + ', Password: ' + values.password);
    }
  });

  return (
    <Container maxWidth="sm">
      <AppBar  sx={{bgcolor: 'white',boxShadow:'0 0 4px 0 black',display:'flex'}} >
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            <img 
              src={return_icon} 
              alt="return" 
              style={{ width: '40px', height: '40px' }} 
              onClick={() => navigate(`/`)}  
            />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1,color:'#009265',fontWeight:'bold' }}>
            ClassIn
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '250px' }}>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h4" component="div" gutterBottom sx={{textAlign:'center'}}>
              Sign In
            </Typography>
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                type="submit" 
                style={{ marginTop: '20px',backgroundColor:'#009265' }}>
              Sign In
            </Button>
            <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
              <Link href="#" color="#009265">
                Forgot Password
              </Link>
            </Typography>
            <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                No account!
              <Link href="#" color="#009265" onClick={() => navigate(`/signup`)}>
                Create one?
              </Link>
            </Typography>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Siginform;
