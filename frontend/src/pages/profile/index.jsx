import React, { useState } from "react";
import {
  Box,
  Paper,
  Tab,
  Typography,
  TextField,
  IconButton,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Link,
  Tooltip,
  Collapse,
  CircularProgress,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AccountCircleRounded,
  LockRounded,
  EditOutlined,
  DeleteOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import HomeNavbar from "components/HomeNavbar";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import profileImage from "assets/profile.jpg";
import { useGetUserQuery } from "state/api";

const profileCommonSchema = yup.object().shape({
  userid: yup.string().required("User ID is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  avatar: yup.string().required("required"),
});

const initialCommonValues = {
  userid: "",
  name: "",
  email: "",
  phone: "",
  avatar: "",
};

const profileChangePasswordSchema = yup.object().shape({
  currentpassword: yup.string().required("Current Password is required"),
  newpassword: yup.string().required("New Password is required"),
});

const initialChangePasswordValues = {
  currentpassword: "",
  newpassword: "",
};

const Profile = () => {
  const [value, setValue] = React.useState("1");
  const [avatar, setAvatar] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [clickedAvatar, setClickedAvatar] = useState(false);

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

  const { data, isLoading } = useGetUserQuery(
    "1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9",
  );

  console.log(data);

  return (
    <Box>
      <HomeNavbar IsNotHomePage={true} title="Your Account" />
      <Box
        sx={{
          width: "100%",
          height: "calc(100%-50.8px)",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "calc(100%-50.8px)",
            display: "flex",
            flexDirection: "row",
            gap: 3,
            margin: "20px auto 0",
            justifyContent: "center",
          }}
        >
          <TabContext value={value}>
            <Paper
              sx={{ height: "25%", width: "350px", padding: "20px" }}
              elevation={3}
            >
              <TabList
                orientation="vertical"
                onChange={handleChange}
                sx={{
                  "& .MuiTab-root": {
                    color: "#009265",
                    borderRadius: "5px",
                    minHeight: "50px",
                    justifyContent: "flex-start",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "white",
                    backgroundColor: "#009265",
                  },
                }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "unset",
                  },
                }}
              >
                <Tab
                  label="Common"
                  value="1"
                  icon={<AccountCircleRounded />}
                  iconPosition="start"
                />
                <Tab
                  label="Change Password"
                  value="2"
                  icon={<LockRounded />}
                  iconPosition="start"
                />
              </TabList>
            </Paper>
            <Paper sx={{ height: "auto", width: "60%" }} elevation={3}>
              {isLoading ? (
                <CircularProgress color="success" />
              ) : (
                <>
                  <TabPanel value="1">
                    <Formik
                      initialValues={initialCommonValues}
                      validationSchema={profileCommonSchema}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                      }) => (
                        <form>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              margin: "0 auto",
                            }}
                          >
                            <Tooltip title="Click to change avatar">
                              <Box
                                component="img"
                                alt="profile"
                                src={profileImage}
                                height="100px"
                                width="100px"
                                borderRadius="50%"
                                sx={{
                                  objectFit: "cover",
                                  "&:hover": {
                                    cursor: "pointer",
                                    boxShadow: "0 0 10px 0 #666666",
                                    transition: "0.3s",
                                  },
                                }}
                                onClick={() => setClickedAvatar(!clickedAvatar)}
                              />
                            </Tooltip>
                            <Collapse
                              orientation="horizontal"
                              in={clickedAvatar}
                            >
                              <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) => {
                                  setAvatar(acceptedFiles[0]);
                                }}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <FlexBetween width="70%">
                                    <Box
                                      {...getRootProps()}
                                      border="2px dashed #009265"
                                      p="20px 30px"
                                      borderRadius="5px"
                                      m="10px 20px"
                                      sx={{ "&:hover": { cursor: "pointer" } }}
                                      minWidth="600px"
                                    >
                                      <input {...getInputProps()} />
                                      {!avatar ? (
                                        <Typography
                                          variant="h6"
                                          fontWeight="bold"
                                          color="#666666"
                                        >
                                          Choose a file or drag it here
                                        </Typography>
                                      ) : (
                                        <FlexBetween>
                                          <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            color="#009265"
                                          >
                                            {avatar.name}
                                          </Typography>
                                          <EditOutlined
                                            sx={{ color: "#009265" }}
                                          />
                                        </FlexBetween>
                                      )}
                                    </Box>
                                    {avatar && (
                                      <IconButton
                                        onClick={() => setAvatar(null)}
                                      >
                                        <DeleteOutlined
                                          sx={{ color: "#009265" }}
                                        />
                                      </IconButton>
                                    )}
                                  </FlexBetween>
                                )}
                              </Dropzone>
                            </Collapse>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              flexWrap: "wrap",
                              justifyContent: "center",
                              width: "100%",
                              margin: "30px auto 0",
                              gap: 3,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "40%",
                              }}
                            >
                              <Typography
                                variant="h7"
                                color="#009265"
                                fontWeight="bold"
                              >
                                User ID
                              </Typography>
                              <TextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={data?.ma_taiKhoan}
                                name="userid"
                                color="success"
                                size="small"
                                disabled
                                error={
                                  Boolean(touched.userid) &&
                                  Boolean(errors.userid)
                                }
                                helperText={touched.userid && errors.userid}
                                sx={{ gridColumn: "span 2" }}
                                fullWidth
                              />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "40%",
                              }}
                            >
                              <Typography
                                variant="h7"
                                color="#009265"
                                fontWeight="bold"
                              >
                                Full name
                              </Typography>
                              <TextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={data?.hoTen}
                                name="name"
                                color="success"
                                placeholder="Full name"
                                size="small"
                                error={
                                  Boolean(touched.name) && Boolean(errors.name)
                                }
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                                fullWidth
                              />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "40%",
                              }}
                            >
                              <Typography
                                variant="h7"
                                color="#009265"
                                fontWeight="bold"
                              >
                                Email
                              </Typography>
                              <TextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={data?.email}
                                name="email"
                                color="success"
                                size="small"
                                disabled
                                error={
                                  Boolean(touched.email) &&
                                  Boolean(errors.email)
                                }
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                                fullWidth
                              />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: "40%",
                              }}
                            >
                              <Typography
                                variant="h7"
                                color="#009265"
                                fontWeight="bold"
                              >
                                Phone Number
                              </Typography>
                              <TextField
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={data?.dienThoai}
                                name="phone"
                                color="success"
                                placeholder="Phone Number"
                                size="small"
                                error={
                                  Boolean(touched.phone) &&
                                  Boolean(errors.phone)
                                }
                                helperText={touched.phone && errors.phone}
                                sx={{ gridColumn: "span 2" }}
                                fullWidth
                              />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "right",
                              marginTop: "20px",
                            }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#009265",
                                "&:hover": { backgroundColor: "#007850" },
                                width: "20%",
                              }}
                            >
                              Update
                            </Button>
                          </Box>
                        </form>
                      )}
                    </Formik>
                  </TabPanel>
                  <TabPanel value="2">
                    <Typography
                      variant="body1"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>
                        *You need to enter your current password to be able to
                        change your new password
                      </em>
                    </Typography>
                    <Formik
                      initialValues={initialChangePasswordValues}
                      validationSchema={profileChangePasswordSchema}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                      }) => (
                        <form>
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
                              <Typography
                                variant="h7"
                                color="#009265"
                                fontWeight="bold"
                              >
                                Current Password
                              </Typography>
                              <FormControl variant="outlined">
                                <OutlinedInput
                                  size="small"
                                  placeholder="Current Password"
                                  type={
                                    showCurrentPassword ? "text" : "password"
                                  }
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowCurrentPassword}
                                        onMouseDown={
                                          handleMouseDownCurrentPassword
                                        }
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
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.currentpassword}
                                  name="currentpassword"
                                  color="success"
                                  error={
                                    Boolean(touched.currentpassword) &&
                                    Boolean(errors.currentpassword)
                                  }
                                />
                                <FormHelperText sx={{ color: "red" }}>
                                  {touched.currentpassword &&
                                    errors.currentpassword}
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
                              <Typography
                                variant="h7"
                                color="#009265"
                                fontWeight="bold"
                              >
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
                                        {showNewPassword ? (
                                          <Visibility />
                                        ) : (
                                          <VisibilityOff />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.newpassword}
                                  name="newpassword"
                                  color="success"
                                  error={
                                    Boolean(touched.newpassword) &&
                                    Boolean(errors.newpassword)
                                  }
                                />
                                <FormHelperText sx={{ color: "red" }}>
                                  {touched.newpassword && errors.newpassword}
                                </FormHelperText>
                              </FormControl>
                            </Box>
                          </Box>
                          <FlexBetween mt="20px">
                            <Link
                              underline="hover"
                              fontWeight="bold"
                              color="#009265"
                              href="#"
                            >
                              Forgot Password?
                            </Link>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#009265",
                                "&:hover": { backgroundColor: "#007850" },
                                width: "20%",
                              }}
                            >
                              Update
                            </Button>
                          </FlexBetween>
                        </form>
                      )}
                    </Formik>
                  </TabPanel>
                </>
              )}
            </Paper>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
