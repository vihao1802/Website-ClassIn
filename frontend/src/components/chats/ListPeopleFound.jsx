import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import AlertComponent from "components/AlertComponent";
import AvatarName from "components/AvatarName";
import { Fragment, useEffect, useState } from "react";
import { useUpdateStatusFriendMutation } from "state/api";

const ListPeopleFound = ({ userData, userId }) => {
  // status textfield
  const hasPeopleWithEmpty = 1; // has people with empty textfield
  const hasPeopleWithNoEmpty = 0; // has people with no empty textfield
  const hasNoPeopleWithNoEmpty = 2; // has no people with no empty textfield
  const [listUser, setListUser] = useState(userData);
  const [isEmpty, setIsEmpty] = useState(hasPeopleWithEmpty);

  const handleFindPeople = (e) => {
    if (e.target.value === "") {
      setIsEmpty(hasPeopleWithEmpty);
      setListUser(userData);
    } else {
      const userFilter = userData.filter((item) =>
        item.email.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      setIsEmpty(hasPeopleWithNoEmpty);
      if (userFilter.length === 0) {
        setIsEmpty(hasNoPeopleWithNoEmpty);
      } else {
        setListUser(userFilter);
      }
    }
  };
  // update status friend
  const [showAlert, setShowAlert] = useState({ message: "", state: false });
  const [updateStatusFriend] = useUpdateStatusFriendMutation();
  const handleChangeStatusFriend = async (friendId, status, message, email) => {
    const response = await updateStatusFriend({
      acc_id: userId,
      friend_id: friendId,
      status: status,
    });
    if (response.data) {
      setShowAlert({
        message: message,
        state: true,
      });
      document.getElementById("text-field-search-people").value = email;
    } else {
      console.error("Error changing status friend");
    }
  };
  useEffect(() => {
    setListUser(
      userData.filter(
        (item) =>
          item.email ===
          document.getElementById("text-field-search-people").value,
      ),
    );
  }, [userData]);
  return (
    <>
      <AlertComponent
        severity="success"
        message={showAlert.message}
        open={showAlert.state}
        onClose={() => setShowAlert({ ...showAlert, state: false })}
      />
      <TextField
        color="success"
        size="small"
        id="text-field-search-people"
        label={"Email"}
        placeholder={"Enter email to search"}
        sx={{ width: "100%", marginTop: "15px" }}
        name={"email"}
        onChange={handleFindPeople}
      />
      {isEmpty === 2 && (
        <Typography
          sx={{
            fontSize: "18px",
            color: "#666666",
            fontWeight: "bold",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          No result found
        </Typography>
      )}
      <List
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: !isEmpty ? "250px" : "0",
          padding: !isEmpty ? "10px" : "0",
          marginTop: "10px",
          bgcolor: "background.paper",
          overflowY: "auto",
          borderRadius: "5px",
          border: !isEmpty ? "2px solid #e7e7e7" : "none",
        }}
      >
        {!isEmpty &&
          listUser &&
          listUser.map((item) => (
            <Box key={item.ma_taiKhoan}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  padding: "8px 0",
                }}
              >
                <ListItemAvatar>
                  <AvatarName name={item.hoTen} />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    overflowWrap: "break-word",
                    maxWidth: "280px",
                  }}
                  primary={item.hoTen}
                  secondary={
                    <Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                        fontWeight={"bold"}
                        fontSize={"18px"}
                      >
                        {item.email}
                      </Typography>
                    </Fragment>
                  }
                />
                {item.daKetBan === 0 && (
                  <Button
                    sx={{
                      margin: "auto 0",
                      backgroundColor: "#009265",
                      "&:hover": {
                        backgroundColor: "#007850",
                      },
                    }}
                    onClick={() =>
                      handleChangeStatusFriend(
                        item.ma_taiKhoan,
                        2,
                        "Request sent",
                        item.email,
                      )
                    }
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
                        Add friend
                      </Typography>
                    </Box>
                  </Button>
                )}
                {item.daKetBan === 1 && (
                  <Button
                    sx={{
                      margin: "auto 0",
                      "&:hover": {
                        backgroundColor: "#007850",
                      },
                      "&:disabled": {
                        backgroundColor: "grey",
                      },
                    }}
                    disabled
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
                        Your friend
                      </Typography>
                    </Box>
                  </Button>
                )}
                {item.daKetBan === 2 && (
                  <>
                    {item.ma_nguoiKetBan === userId ? (
                      <Button
                        sx={{
                          margin: "auto 0",
                          backgroundColor: "#009265",
                          "&:hover": {
                            backgroundColor: "#007850",
                          },
                          "&:disabled": {
                            backgroundColor: "#007850",
                          },
                        }}
                        disabled
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
                            Requested
                          </Typography>
                        </Box>
                      </Button>
                    ) : (
                      <Button
                        sx={{
                          margin: "auto 0",
                          backgroundColor: "#009265",
                          "&:hover": {
                            backgroundColor: "#007850",
                          },
                        }}
                        onClick={() =>
                          handleChangeStatusFriend(
                            item.ma_taiKhoan,
                            1,
                            "Accept friend request",
                          )
                        }
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
                            Accept
                          </Typography>
                        </Box>
                      </Button>
                    )}
                  </>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </Box>
          ))}
      </List>
    </>
  );
};

export default ListPeopleFound;
