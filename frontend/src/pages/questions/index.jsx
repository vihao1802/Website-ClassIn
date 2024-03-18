import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Modal,
  Typography,
  Tab,
  IconButton,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  DeleteRounded,
  AddRounded,
  CloseRounded,
  EditRounded,
  CheckCircleRounded,
} from "@mui/icons-material";
import { Radio, RadioGroup, Sheet, FormLabel, radioClasses } from "@mui/joy";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";

const columns = [
  { field: "id", headerName: "ID", width: 100, editable: false },
  {
    field: "title",
    headerName: "Title",
    width: 750,
    editable: false,
    sortable: false,
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    sortable: false,
    type: "actions",
    getActions: () => {
      return [
        <GridActionsCellItem
          icon={<EditRounded sx={{ color: "#1976D2" }} />}
          label="Edit"
          className="textPrimary"
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteRounded sx={{ color: "red" }} />}
          label="Delete"
          color="inherit"
        />,
      ];
    },
  },
];

const rows = [
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore illum excepturi iure aspernatur doloremque itaque odio ratione et animi, quibusdam quaerat accusantium. Tempora exercitationem veritatis corporis est nesciunt esse modi?",
  },
  { id: 2, title: "Câu hỏi 2" },
  { id: 3, title: "Câu hỏi 3" },
  { id: 4, title: "Câu hỏi 4" },
  { id: 5, title: "Câu hỏi 5" },
  { id: 6, title: "Câu hỏi 6" },
  { id: 7, title: "Câu hỏi 7" },
  { id: 8, title: "Câu hỏi 8" },
  { id: 9, title: "Câu hỏi 9" },
  { id: 10, title: "Câu hỏi 10" },
  { id: 11, title: "Câu hỏi 11" },
  { id: 12, title: "Câu hỏi 12" },
  { id: 13, title: "Câu hỏi 13" },
  { id: 14, title: "Câu hỏi 14" },
  { id: 15, title: "Câu hỏi 15" },
  { id: 16, title: "Câu hỏi 16" },
  { id: 17, title: "Câu hỏi 17" },
  { id: 18, title: "Câu hỏi 18" },
  { id: 19, title: "Câu hỏi 19" },
  { id: 20, title: "Câu hỏi 20" },
  { id: 21, title: "Câu hỏi 21" },
  { id: 22, title: "Câu hỏi 22" },
  { id: 23, title: "Câu hỏi 23" },
];

const Questions = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ margin: "0 50px", padding: "30px" }}>
      <Header title="QUESTIONS" subtitle="List of questions" />
      <Box m="0 auto" width="1000px">
        <Paper>
          <Box
            mt="20px"
            sx={{
              "& .MuiDataGrid-root": {
                border: "2px solid #e7e7e7",
                borderRadius: "7px",
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
              rows={rows}
              columns={columns}
              slots={{
                toolbar: () => {
                  return (
                    <GridToolbarContainer>
                      <FlexBetween width="100%">
                        <Button
                          color="primary"
                          startIcon={<AddRounded />}
                          onClick={handleOpen}
                        >
                          Add new question
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
              sx={{ padding: "10px 20px" }}
            />
          </Box>
        </Paper>
      </Box>
      <>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              height: "650px",
              bgcolor: "background.paper",
              border: "1px solid #e7e7e7",
              boxShadow: 24,
              borderRadius: "10px",
            }}
          >
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                  sx={{
                    color: "#009265",
                    "& .MuiTab-root.Mui-selected": {
                      color: "#009265",
                    },
                  }}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#009265",
                    },
                  }}
                >
                  <Tab label="Add a question" value="1" />
                  <Tab label="Add from file" value="2" />
                </TabList>
                <IconButton
                  sx={{
                    color: "#009265",
                    width: "40px",
                    marginRight: "30px",
                  }}
                  onClick={handleClose}
                >
                  <CloseRounded />
                </IconButton>
              </Box>
              <TabPanel
                value="1"
                sx={{
                  padding: "10px 20px",
                  height: "100%",
                }}
              >
                <Typography variant="h6" color="#009265">
                  Title of question:
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  fullWidth
                  color="success"
                />
                <Typography variant="h6" color="#009265" mt="10px">
                  List of answers:
                </Typography>
                <RadioGroup
                  aria-label="platform"
                  defaultValue="Website"
                  overlay
                  name="platform"
                  sx={{
                    flexDirection: "column",
                    gap: 1,
                    [`& .${radioClasses.checked}`]: {
                      [`& .${radioClasses.action}`]: {
                        inset: -1,
                        border: "3px solid",
                        borderColor: "#009265",
                      },
                    },
                    [`& .${radioClasses.radio}`]: {
                      display: "contents",
                      "& > svg": {
                        zIndex: 2,
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        bgcolor: "background.surface",
                        borderRadius: "50%",
                      },
                    },
                  }}
                >
                  {["A", "B", "C", "D"].map((value) => (
                    <Sheet
                      key={value}
                      variant="outlined"
                      sx={{
                        borderRadius: "md",
                        boxShadow: "sm",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1.5,
                        p: 2,
                        minWidth: 120,
                      }}
                    >
                      <Radio
                        id={value}
                        value={value}
                        color="success"
                        checkedIcon={<CheckCircleRounded />}
                      />
                      <FormLabel htmlFor={value}>{value}</FormLabel>
                      <TextField
                        type="text"
                        variant="outlined"
                        fullWidth
                        sx={{ zIndex: "1" }}
                        size="small"
                        color="success"
                      />
                    </Sheet>
                  ))}
                </RadioGroup>
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
                    }}
                  >
                    Add Question
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel
                value="2"
                sx={{
                  padding: "0 20px",
                  height: "100%",
                }}
              ></TabPanel>
            </TabContext>
          </Box>
        </Modal>
      </>
    </Box>
  );
};

export default Questions;
