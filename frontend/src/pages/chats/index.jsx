import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Skeleton,
  TextField,
  List,
  ListItem,
  ListItemButton,
  Button,
} from "@mui/material";
import "react-chat-elements/dist/main.css";
import {
  useGetAllFriendsQuery,
  useUpdateStatusFriendMutation,
} from "state/api";
import ChatBoxFriend from "components/ChatBoxFriend";
import FlexBetween from "components/FlexBetween";
import { getUserId_Cookie } from "utils/handleCookies";
import AvatarName from "components/AvatarName";
import AlertComponent from "components/AlertComponent";
import CardDetailFriend from "components/chats/CardDetailFriend";
import ListFriendsItem from "components/chats/ListFriendsItem";
import Loading from "components/Loading";
import ModalFindPeople from "components/chats/ModalFindPeople";

const Chats = () => {
  const clientId = getUserId_Cookie();
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
    } else if (active && storeFriend && friends) {
      setActive(friends.find((item) => item.ma_taiKhoan === storeFriend));
      setStoreFriend("");
    }
  }, [friends]);

  // update status friend
  const [showAlert, setShowAlert] = useState({ message: "", state: false });
  const [updateStatusFriend] = useUpdateStatusFriendMutation();
  const [storeFriend, setStoreFriend] = useState("");
  const handleChangeStatusFriend = async (friendId, status, message) => {
    const response = await updateStatusFriend({
      acc_id: clientId,
      friend_id: friendId,
      status: status,
    });
    if (response.data) {
      // show AlertComponent
      setStoreFriend(friendId);
      setShowAlert({
        message: message,
        state: true,
      });
    } else {
      console.error("Error changing status friend");
    }
  };

  // handle modal find people
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  if (loadingAllFriends && !friends) return <Loading />;

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
        <FlexBetween>
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

          <Button
            onClick={handleOpenModal}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              gap: "1rem",
              backgroundColor: "#009265",
              "&:hover": {
                backgroundColor: "#007850",
              },
            }}
          >
            <Box textAlign="left">
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                Find People
              </Typography>
            </Box>
          </Button>
        </FlexBetween>
        <ModalFindPeople open={open} handleCloseModal={handleCloseModal} />
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
                <ListFriendsItem
                  item={item}
                  key={index}
                  active={active}
                  setActive={setActive}
                />
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
          {/* <Box
            component="img"
            alt="profile"
            src={profileImage}
            height="39px"
            width="39px"
            borderRadius="50%"
            sx={{ objectFit: "cover" }}
          /> */}
          <Box borderRadius="50%">
            <AvatarName name={active && active.hoTen} />
          </Box>
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
          <AlertComponent
            severity="success"
            message={showAlert.message}
            open={showAlert.state}
            onClose={() => setShowAlert({ ...showAlert, state: false })}
          />
          {clientId && active ? (
            <>
              {active.daKetBan === 2 ? (
                <CardDetailFriend
                  active={active}
                  clientId={clientId}
                  handleChangeStatusFriend={handleChangeStatusFriend}
                />
              ) : (
                <ChatBoxFriend
                  clientId={clientId}
                  friend={active}
                  refetchAllFriends={refetchAllFriends}
                  setActive={setActive}
                />
              )}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  color: "#666666",
                  fontWeight: "bold",
                }}
              >
                No friends available
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Chats;
