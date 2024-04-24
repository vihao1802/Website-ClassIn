import { Box, Button, Typography } from "@mui/material";
import AvatarName from "components/AvatarName";

const CardDetailFriend = ({ active, clientId, handleChangeStatusFriend }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#e7e7e7",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
          height: "500px",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Box borderRadius="50%" textAlign={"center"}>
          <AvatarName name={active.hoTen} />
        </Box>
        <Typography
          id="modal-description"
          sx={{ mt: 2, fontSize: "20px", fontWeight: "bold" }}
        >
          {`${active.hoTen}`}
        </Typography>
        <Typography
          id="modal-description"
          sx={{ mt: 2, fontSize: "20px", color: "#666666" }}
        >
          {`${active.email}`}
        </Typography>
        {active.ma_nguoiKetBan !== clientId ? (
          <Button
            sx={{
              backgroundColor: "#009265",
              color: "white",
              border: "2px solid #009265",
              padding: "5px 15px",
              mt: 2,
              "&:hover": {
                backgroundColor: "#007850",
              },
              width: "100%",
            }}
            onClick={() =>
              handleChangeStatusFriend(
                active.ma_taiKhoan,
                1,
                "Accept friend request",
              )
            }
          >
            Accept
          </Button>
        ) : (
          <Button
            sx={{
              backgroundColor: "#009265",
              color: "white",
              border: "2px solid grey",
              padding: "5px 15px",
              mt: 2,
              "&:disabled": {
                color: "white",
                backgroundColor: "#007850",
              },
              width: "100%",
            }}
            disabled
          >
            Requested
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CardDetailFriend;
