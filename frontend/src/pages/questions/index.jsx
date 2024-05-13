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
import AddQuestionForm from "components/ModalAddQuestion";
import { useGetQuestionsQuery, useDeleteQuestionMutation } from "state/api";
import AlertComponent from "components/AlertComponent";
import { getUserId_Cookie } from "utils/handleCookies";

const Questions = () => {
  // const userId = "1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9";
  const userId = getUserId_Cookie();
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const { data, isLoading } = useGetQuestionsQuery(userId);

  const [deleteQuestion] = useDeleteQuestionMutation();
  const [selectedRow, setSelectedRow] = useState(null);
  const columns = [
    {
      field: "noiDung",
      headerName: "Title",
      width: 800,
      editable: false,
      sortable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      type: "actions",
      getActions: (item) => {
        return [
          <GridActionsCellItem
            icon={<EditRounded sx={{ color: "#1976D2" }} />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => {
              setSelectedRow(item.row);
              handleOpenEdit();
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteRounded sx={{ color: "red" }} />}
            label="Delete"
            color="inherit"
            onClick={() => {
              deleteQuestion(item.row.ma_cauHoi);
            }}
          />,
        ];
      },
    },
  ];
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <Box sx={{ margin: "0 50px", padding: "30px" }}>
      <AlertComponent
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ ...alert, open: false })}
      />
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
                      <Button
                        color="primary"
                        startIcon={<AddRounded />}
                        onClick={handleOpenAdd}
                      >
                        Add new question
                      </Button>
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
      <AddQuestionForm
        open={openAdd}
        handleClose={handleCloseAdd}
        mode="add"
        userId={userId}
        alertComponent={setAlert}
      />
      <AddQuestionForm
        open={openEdit}
        handleClose={handleCloseEdit}
        mode="edit"
        userId={userId}
        questionId={selectedRow?.ma_cauHoi}
        alertComponent={setAlert}
      />
    </Box>
  );
};

export default Questions;
