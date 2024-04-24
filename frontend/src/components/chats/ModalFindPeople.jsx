import { Box, Button, Modal, Typography } from "@mui/material";
import { useGetAllUserWithStatusQuery } from "state/api";
import { getUserId_Cookie } from "utils/handleCookies";
import ListPeopleFound from "./ListPeopleFound";
import Loading from "components/Loading";

const ModalFindPeople = ({ open, handleCloseModal }) => {
  const userId = getUserId_Cookie();
  const { data: userData } = useGetAllUserWithStatusQuery(userId);
  console.log(userData);
  return (
    <Modal
      open={open}
      onClose={() => handleCloseModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "520px",
          height: "530px",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ color: "#009265" }}
        >
          Find people
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography
            id="modal-modal-description"
            sx={{ fontWeight: "bold", color: "#374254" }}
          >
            Search people by email
          </Typography>
          {userData ? (
            <ListPeopleFound userData={userData} userId={userId} />
          ) : (
            <Loading />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: "10px",
            marginTop: "auto",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "white",
              color: "#009265",
              maxWidth: "100px",
              width: "100%",
              border: "1px solid #009265",
              "&:hover": {
                border: "1px solid #009265",
              },
            }}
            onClick={() => handleCloseModal()}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalFindPeople;
