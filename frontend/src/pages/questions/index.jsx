import React, { useState } from "react";
import { Box, Button, TextField, Paper } from "@mui/material";

import { DeleteRounded, AddRounded, EditRounded } from "@mui/icons-material";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import AddQuestionForm from "../../components/ModalAddQuestion";
import { useGetQuestionsQuery } from "state/api";

const columns = [
  { field: "ma_cauHoi", headerName: "ID", width: 150, editable: false },
  {
    field: "noiDung",
    headerName: "Title",
    width: 700,
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data, isLoading } = useGetQuestionsQuery(
    "1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9",
  );
  return (
    <Box sx={{ margin: "0 50px", padding: "30px" }}>
      <Header title="QUESTIONS" subtitle="List of questions" />
      <Box m="0 auto" width="1000px">
        <Paper>
          <Box
            mt="20px"
            minHeight="60vh"
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
              loading={isLoading || !data}
              rows={data || []}
              getRowId={(row) => row.ma_cauHoi}
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
      <AddQuestionForm open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Questions;
