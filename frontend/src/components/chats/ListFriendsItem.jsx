import { Box, ListItem, ListItemButton, Typography } from "@mui/material";
import AvatarName from "components/AvatarName";

const ListFriendsItem = ({ item, index, active, setActive }) => {
  return (
    <Box>
      {item && (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setActive(item);
            }}
            sx={{
              backgroundColor:
                active?.ma_taiKhoan === item.ma_taiKhoan
                  ? "#e7e7e7"
                  : "transparent",
              color:
                active?.ma_taiKhoan === item.ma_taiKhoan ? "black" : "#666666",
              height: "70px",
            }}
          >
            {/* <Box
                          component="img"
                          alt="profile"
                          src={profileImage}
                          height="48px"
                          width="48px"
                          borderRadius="50%"
                          sx={{ objectFit: "cover" }}
                        /> */}
            <Box borderRadius="50%">
              <AvatarName name={item.hoTen} />
            </Box>
            <Box
              ml="10px"
              sx={{
                width: "calc(100% - 58px)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                {item.hoTen}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#666666",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.noiDung}
              </Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      )}
    </Box>
  );
};

export default ListFriendsItem;
