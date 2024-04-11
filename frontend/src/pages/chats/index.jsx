import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Skeleton,
  TextField,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import profileImage from "assets/profile.jpg";
import "react-chat-elements/dist/main.css";
import { useGetAllFriendsQuery } from "state/api";
import ChatBoxFriend from "components/ChatBoxFriend";
import Loading from "components/Loading";

const Chats = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const clientId = "58824edd-2ce6-46e8-97f3-8ca6970d8cbf"; // Huy Hoang
  // const clientId = "1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9"; // Hao Tuan
  // const clientId = "17593a02-3763-4b70-9454-d71c3af0bd19"; // Vi Hao
  const {
    data: friends,
    isLoading: loadingAllFriends,
    refetch: refetchAllFriends,
  } = useGetAllFriendsQuery(clientId);
  console.log(friends?.length);

  const [active, setActive] = useState("");
  useEffect(() => {
    if (active === "" && friends) {
      setActive(friends?.[0]);
    }
  }, [friends]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "calc(100% - 50.8px)",
      }}
    >
      {/* LEFT SIDEBAR */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
          height: "100%",
          padding: "10px",
          borderRight: "1px solid #e7e7e7",
        }}
      >
        <Typography
          sx={{
            color: "#009265",
            fontSize: "18px",
            textAlign: "Left",
            marginLeft: "10px",
          }}
        >
          Your Friends
        </Typography>

        <TextField
          fullWidth
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          color="success"
          sx={{ marginTop: "10px" }}
        />
        <List
          sx={{
            height: "100%",
            overflowY: "scroll",
            marginTop: "10px",
            "::-webkit-scrollbar": { width: "10px" },
            "::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#858585",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#777",
            },
          }}
        >
          {loadingAllFriends && !friends
            ? [...Array(8)].map((_, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    sx={{
                      padding: "0",
                      gap: "10px",
                    }}
                  >
                    <Skeleton
                      variant="circular"
                      width={48}
                      height={48}
                      sx={{
                        padding: "0",
                      }}
                    />
                    <Skeleton
                      variant="rounded"
                      width={"calc(100% - 58px)"}
                      height={30}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            : friends?.map((item, index) => (
                <Box key={index}>
                  {item && (
                    <ListItem key={index} disablePadding>
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
                            active?.ma_taiKhoan === item.ma_taiKhoan
                              ? "black"
                              : "#666666",
                          height: "70px",
                        }}
                      >
                        <Box
                          component="img"
                          alt="profile"
                          src={profileImage}
                          height="48px"
                          width="48px"
                          borderRadius="50%"
                          sx={{ objectFit: "cover" }}
                        />
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
              ))}
        </List>
      </Box>

      {/* MESSAGE CONTAINER */}
      <Box
        sx={{
          width: "80%",
          height: "100%",
          borderRight: "1px solid #e7e7e7",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            height: "50px",
            borderBottom: "1px solid #e7e7e7",
            padding: "5px 20px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="39px"
            width="39px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          />
          <Typography
            sx={{
              margin: "7px 0 7px 20px",
              fontSize: "18px",
            }}
          >
            {friends && active && active.hoTen}
          </Typography>
        </Box>
        {/* MESSAGE BOX */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "unset",
            height: "calc(100% - 50px)",
          }}
        >
          {clientId && active ? (
            <ChatBoxFriend
              clientId={clientId}
              friend={active}
              refetchAllFriends={refetchAllFriends}
              setActive={setActive}
            />
          ) : (
            <Loading />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Chats;
