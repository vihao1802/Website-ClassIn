import React, { useState } from "react";
import {
  Box,
  Typography,
  Tooltip,
  Button,
  Collapse,
  IconButton,
  TextField,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import {
  InfoOutlined,
  RecentActorsRounded,
  RemoveCircleOutlineRounded,
  PersonAddAltRounded,
} from "@mui/icons-material";
import HomeNavbar from "components/HomeNavbar";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import {
  EditOutlined,
  DeleteOutlined,
  CropFreeRounded,
} from "@mui/icons-material";
import profileImage from "assets/profile.jpg";
import ShowClassCode from "components/ModalShowClassCode";
import AddStudentToClass from "components/ModalAddStudentToClass";
import { useGetClassDetailsQuery } from "state/api";

const profileCommonSchema = yup.object().shape({
  classname: yup.string().required("Class Name is required"),
  description: yup.string().required("Description is required"),
  avatar: yup.string().required("required"),
});

const initialCommonValues = {
  classname: "Cong nghe phan mem",
  description:
    "This is a class for software engineering, which is very useful for students who want to become a software engineer. In this class, students will learn about the basic knowledge of software engineering, such as software development process, software testing, software maintenance, etc.",
  avatar: "",
};

const studentcolumns = [
  { field: "id", headerName: "ID", width: 50, editable: false },
  {
    field: "studentname",
    headerName: "Student Name",
    width: 250,
    editable: false,
    sortable: false,
    renderCell: (item) => {
      return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="32px"
            width="32px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          <Typography
            sx={{
              fontSize: "16px",
              color: "black",
              marginLeft: "10px",
              padding: "5px 0",
            }}
          >
            {item.value}
          </Typography>
        </Box>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: false,
    sortable: false,
  },
  {
    field: "phonenumber",
    headerName: "Phone Number",
    width: 200,
    editable: false,
    sortable: false,
  },
  {
    field: "remove",
    headerName: "Remove",
    width: 100,
    sortable: false,
    type: "actions",
    getActions: () => {
      return [
        <GridActionsCellItem
          icon={<RemoveCircleOutlineRounded sx={{ color: "red" }} />}
          label="Remove"
          className="textPrimary"
          color="inherit"
        />,
      ];
    },
  },
];

const studentrows = [
  {
    id: 1,
    studentname: "Jimmy",
    email: "jimmy@gmail.com",
    phonenumber: "0123456789",
  },
  {
    id: 2,
    studentname: "John",
    email: "john@gmail.com",
    phonenumber: "0123456789",
  },
  {
    id: 3,
    studentname: "Alice",
    email: "alice@gmail.com",
    phonenumber: "0123456789",
  },
  {
    id: 4,
    studentname: "Bob",
    email: "bob@gmail.com",
    phonenumber: "0123456789",
  },
  {
    id: 5,
    studentname: "Emily",
    email: "emily@gmail.com",
    phonenumber: "0123456789",
  },
  {
    id: 6,
    studentname: "Alex",
    email: "alex@gmail.com",
    phonenumber: "0123456789",
  },
  {
    id: 7,
    studentname: "Sarah",
    email: "sarah@gmail.com",
    phonenumber: "0123456789",
  },
  {
    id: 8,
    studentname: "Michael",
    email: "michael@gmail.com",
    phonenumber: "0123456789",
  },
  {
    id: 9,
    studentname: "Jessica",
    email: "jessica@gmail.com",
    phonenumber: "0123456789",
  },
  {
    id: 10,
    studentname: "David",
    email: "david@gmail.com",
    phonenumber: "0123456789",
  },
];

const ClassDetail = () => {
  const [clickedAvatar, setClickedAvatar] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openShowClassCode, setOpenShowClassCode] = useState(false);
  const handleOpenShowClassCode = () => setOpenShowClassCode(true);
  const handleCloseShowClassCode = () => setOpenShowClassCode(false);

  const [openAddStudentToClass, setOpenAddStudentToClass] = useState(false);
  const handleOpenAddStudentToClass = () => setOpenAddStudentToClass(true);
  const handleCloseAddStudentToClass = () => setOpenAddStudentToClass(false);

  const { data, isLoading } = useGetClassDetailsQuery(
    "3ca75f6c-5ef9-46a2-9c26-324ec4e81abf",
  );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <HomeNavbar IsNotHomePage={true} title="Class Information" />
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
          <Box
            sx={{
              height: "25%",
              width: "350px",
              padding: "20px",
              border: "1px solid #e7e7e7",
              borderRadius: "5px",
            }}
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
                label="Information"
                value="1"
                icon={<InfoOutlined />}
                iconPosition="start"
              />
              <Tab
                label="Student List"
                value="2"
                icon={<RecentActorsRounded />}
                iconPosition="start"
              />
            </TabList>
          </Box>

          <Box
            sx={{
              border: "1px solid #e7e7e7",
              width: "60%",
              height: "auto",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            {/* Class Information */}
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
                      <Collapse orientation="horizontal" in={clickedAvatar}>
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
                                    <EditOutlined sx={{ color: "#009265" }} />
                                  </FlexBetween>
                                )}
                              </Box>
                              {avatar && (
                                <IconButton onClick={() => setAvatar(null)}>
                                  <DeleteOutlined sx={{ color: "#009265" }} />
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
                        flexDirection: "column",
                        margin: "20px auto 10px",
                      }}
                    >
                      <Typography
                        variant="h7"
                        color="#009265"
                        fontWeight="bold"
                      >
                        Class Code
                      </Typography>
                      <FlexBetween>
                        <Typography variant="h7" color="#666666">
                          {data?.ma_lopHoc}
                        </Typography>
                        <Button
                          variant="primary"
                          sx={{
                            backgroundColor: "white",
                            color: "#009265",
                            gap: 1,
                          }}
                          onClick={handleOpenShowClassCode}
                        >
                          Show Code
                          <CropFreeRounded />
                        </Button>
                        <ShowClassCode
                          open={openShowClassCode}
                          handleClose={handleCloseShowClassCode}
                          classinfo={{ cid: data?.ma_lopHoc, cname: data?.ten }}
                        />
                      </FlexBetween>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="h7"
                          color="#009265"
                          fontWeight="bold"
                        >
                          Class Name
                        </Typography>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={data?.ten}
                          name="classname"
                          color="success"
                          size="small"
                          error={
                            Boolean(touched.classname) &&
                            Boolean(errors.classname)
                          }
                          helperText={touched.classname && errors.classname}
                          fullWidth
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="h7"
                          color="#009265"
                          fontWeight="bold"
                        >
                          Description
                        </Typography>
                        <TextField
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={data?.moTa}
                          name="description"
                          color="success"
                          placeholder="Description"
                          multiline
                          rows={5}
                          error={
                            Boolean(touched.description) &&
                            Boolean(errors.description)
                          }
                          helperText={touched.description && errors.description}
                          fullWidth
                        />
                      </Box>
                    </Box>
                    <FlexBetween mt="20px">
                      <Button variant="outlined" color="error">
                        Delete Class
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#009265",
                          "&:hover": { backgroundColor: "#007850" },
                        }}
                      >
                        Update
                      </Button>
                    </FlexBetween>
                  </form>
                )}
              </Formik>
            </TabPanel>

            {/* Student List */}
            <TabPanel value="2">
              <Box
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "unset",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #e7e7e7",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "white",
                    color: "#009265",
                    borderBottom: "1px solid #e7e7e7",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: "white",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "white",
                    color: "black",
                    borderTop: "1px solid #e7e7e7",
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `#009265 !important`,
                  },
                  "& .MuiTablePagination-selectLabel": {
                    margin: "unset",
                  },
                  "& .MuiTablePagination-displayedRows": {
                    margin: "unset",
                  },
                  overflow: "unset",
                }}
              >
                <DataGrid
                  rows={studentrows}
                  columns={studentcolumns}
                  slots={{
                    toolbar: () => {
                      return (
                        <GridToolbarContainer>
                          <FlexBetween width="100%">
                            <Button
                              color="primary"
                              startIcon={<PersonAddAltRounded />}
                              onClick={handleOpenAddStudentToClass}
                            >
                              Add student
                            </Button>
                            <Box pr="5px" width="300px">
                              <TextField
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                size="small"
                                color="success"
                                fullWidth
                              />
                            </Box>
                          </FlexBetween>
                        </GridToolbarContainer>
                      );
                    },
                  }}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
                  pageSizeOptions={[5, 10]}
                  sx={{ padding: "0 20px" }}
                />
                <AddStudentToClass
                  open={openAddStudentToClass}
                  handleClose={handleCloseAddStudentToClass}
                />
              </Box>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ClassDetail;
