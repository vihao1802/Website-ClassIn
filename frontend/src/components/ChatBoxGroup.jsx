import React, { useEffect, useState, useRef } from "react";
import { SendRounded, DeleteRounded, ArrowDownward } from "@mui/icons-material";
import {
  IconButton,
  Box,
  Typography,
  TextField,
  MenuItem,
  Menu,
  CircularProgress,
  Modal,
  Button,
  Skeleton,
  Tooltip,
} from "@mui/material";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpg";
import {
  usePostMessageClassMutation,
  useGetMessageClassQuery,
  useDeleteMessageClassMutation,
  useUpdateStatusFriendMutation,
} from "state/api";
import AvatarName from "./AvatarName";
import AlertComponent from "./AlertComponent";
import { useNavigate } from "react-router-dom";
const ChatBoxGroup = ({ classItem, clientId }) => {
  // scroll to bottom of chat box
  const boxRef = useRef(null);

  // handle on scroll
  const [userScrolled, setUserScrolled] = useState(false);
  // const [notification, setNotification] = useState(0);
  const notification = useRef(0);
  const navigate = useNavigate();

  // handle message text field
  let messageTextField = "";
  if (document.getElementById("text-field-message")) {
    messageTextField = document.getElementById("text-field-message").value;
  }

  // handle action menu message
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  // web socket
  // const [webSocket, setWebSocket] = useState(null);
  const webSocket = useRef(null);

  // message loading data to chat box
  // const [maNhomChat, setMaNhomChat] = useState("");
  const maNhomChat = useRef("");
  const {
    data: messageData,
    // isLoading: messageLoading,
    refetch: refetchMessageData,
  } = useGetMessageClassQuery({
    class_id: classItem?.ma_lopHoc,
    acc_id: clientId,
  });
  console.log(messageData);

  // scroll to bottom of chat box
  useEffect(() => {
    if (messageData) {
      if (maNhomChat.current !== classItem.ma_nhomChat) {
        // setMaNhomChat(messageData[0]?.ma_nhomChat);
        maNhomChat.current = classItem.ma_nhomChat;
        // console.log("maNhomChat: " + maNhomChat.current);
      }
    }
  }, [messageData, maNhomChat, classItem]);

  useEffect(() => {
    const scrollContainer = boxRef.current;
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
      // console.log("scroll to bottom");
    }
  }, [messageData, userScrolled]);

  useEffect(() => {
    setUserScrolled(false);
  }, [classItem]);

  // handle on scroll
  const handleOnScroll = () => {
    const scrollContainer = boxRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(isScroll);
      // console.log("why not here");
      if (
        scrollContainer.scrollTop >=
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 1
      ) {
        // console.log("why not hide notification");
        // setNotification(0);
        notification.current = 0;
      }
    }
  };
  const scrollDown = () => {
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
    setUserScrolled(false);
    // setNotification(0);
    notification.current = 0;
  };

  // handle message text field
  const [postMessageClass, { isLoading: loadingPostMessage }] =
    usePostMessageClassMutation();
  const handleTextFieldChange = (event) => {
    messageTextField = event.target.value;
    // console.log(messageTextField);
    if (messageTextField.trim() !== "") {
      document.getElementById("send-message-button-icon").style.color =
        "#009265";
    } else {
      document.getElementById("send-message-button-icon").style.color = "gray";
    }
  };
  const handleSendMessageTF = async () => {
    messageTextField = messageTextField.trim();
    // console.log(messageTextField);
    // console.log("in TF " + maNhomChat.current);
    if (!messageTextField) return;
    const response = await postMessageClass({
      noiDung: messageTextField,
      acc_id: clientId,
      chatGroup_id: maNhomChat.current,
    });
    if (response.data) {
      sendMessage(clientId);
      messageTextField = "";
      document.getElementById("text-field-message").value = "";
    } else {
      console.error("Error posting message");
    }
  };

  // handle action menu message
  const handleActionMenuMessage = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  // const messageIdDeleted = useRef("");
  const handleClickOpenConfirmDelete = () => {
    setOpenConfirmDelete(true);
    // messageIdDeleted.current = id;
  };
  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
    handleClose();
  };
  // delete message
  const [deleteMessageClass] = useDeleteMessageClassMutation();
  const handleDeleteMessage = async (messageIdDeleted) => {
    // console.log("Message delete" + messageIdDeleted);
    const response = await deleteMessageClass({
      messageId: messageIdDeleted,
    });
    if (response.data) {
      /* webSocket.send(
        JSON.stringify({
          type: "deleteMessage",
          messageId: messageIdDeleted,
        }),
      ); */
      webSocket.current.send("deleteMessage");
      setOpenConfirmDelete(false);
      handleClose();
    } else {
      console.error("Error deleting message");
    }
  };

  // web socket
  useEffect(() => {
    // Connect to WebSocket
    if (clientId && maNhomChat) {
      const url = `${process.env.REACT_APP_WEBSOCKET_URL}/tai-khoan/${clientId}`;
      const ws = new WebSocket(url);
      console.log("connecting to " + url);

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const messageContent = JSON.parse(event.data);
        if (messageData) {
          refetchMessageData();
        }
        // console.log("Message by id in websocket: " + messageContent.sendById);
        if (messageContent.type === "deleteMessage") {
        } else if (messageContent.type === "sendMessage") {
          const scrollContainer = boxRef.current;
          if (
            scrollContainer.scrollTop <
            scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
          ) {
            // setNotification((current) => current + 1);
            if (messageContent.sendById !== clientId) {
              notification.current += 1;
            } else {
              scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
          }
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      // setWebSocket(ws); // Save WebSocket connection
      webSocket.current = ws;

      // Clean up WebSocket connection
      return () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close();
        }
      };
    }
  }, [clientId, maNhomChat, refetchMessageData]);

  const sendMessage = (id) => {
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      // console.log("send by id: " + id);
      webSocket.current.send("sendMessage");
    }
  };

  // change status friend
  const [showAlert, setShowAlert] = useState({ message: "", state: false });
  const [updateStatusFriend] = useUpdateStatusFriendMutation();
  const handleChangeStatusFriend = async (friendId, status, message) => {
    const response = await updateStatusFriend({
      acc_id: clientId,
      friend_id: friendId,
      status: status,
    });
    if (response.data) {
      // console.log("Change status friend success");
      // show AlertComponent
      setShowAlert({
        message: message,
        state: true,
      });
      navigate("/chats");
    } else {
      console.error("Error changing status friend");
    }
  };
  return (
    <>
      <Box
        ref={boxRef}
        sx={{
          height: "100%",
          overflowY: "scroll",
          backgroundColor: "#e7e7e7",
          padding: "10px",
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
        onScroll={handleOnScroll}
      >
        <AlertComponent
          severity="success"
          message={showAlert.message}
          open={showAlert.state}
          onClose={() => setShowAlert({ ...showAlert, state: false })}
        />
        {messageData?.map((item, index) => {
          return (
            item.anTinNhan === 0 && (
              <Box
                key={item.ma_tinNhan}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: item.position,
                    marginBottom: "5px",
                  }}
                >
                  <Tooltip
                    title={
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          Width: "400px",
                          padding: "10px",
                        }}
                      >
                        <FlexBetween>
                          <Typography
                            id="modal-title"
                            variant="h6"
                            component="h2"
                            fontWeight={600}
                          >
                            {`Profile`}
                          </Typography>
                          <Box borderRadius="50%">
                            <AvatarName name={item.ten_taiKhoan} />
                          </Box>
                        </FlexBetween>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                          {`Name: ${item.ten_taiKhoan}`}
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                          {`Email: ${item.email}`}
                        </Typography>
                        {item.position === "right" && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "end",
                              gap: "10px",
                              mt: 3,
                            }}
                          >
                            <Button
                              sx={{
                                backgroundColor: "#009265",
                                color: "white",
                                border: "2px solid #009265",
                                padding: "5px 15px",
                                "&:hover": {
                                  backgroundColor: "#007850",
                                },
                                "&:disabled": {
                                  color: "white",
                                },
                                width: "100%",
                              }}
                              disabled
                            >
                              You
                            </Button>
                          </Box>
                        )}
                        {item.position === "left" && item.daKetBan === 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "end",
                              gap: "10px",
                              mt: 3,
                            }}
                          >
                            <Button
                              sx={{
                                backgroundColor: "#009265",
                                color: "white",
                                border: "2px solid #009265",
                                padding: "5px 15px",
                                "&:hover": {
                                  backgroundColor: "#007850",
                                },
                                width: "100%",
                              }}
                              onClick={() =>
                                handleChangeStatusFriend(
                                  item.ma_taiKhoan,
                                  2,
                                  "Request sent",
                                )
                              }
                            >
                              Add friend
                            </Button>
                          </Box>
                        )}
                        {item.position === "left" && item.daKetBan === 1 && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "end",
                              gap: "10px",
                              mt: 3,
                            }}
                          >
                            <Button
                              sx={{
                                backgroundColor: "#009265",
                                color: "white",
                                border: "2px solid #009265",
                                padding: "5px 15px",
                                "&:hover": {
                                  backgroundColor: "#007850",
                                },
                                "&:disabled": {
                                  color: "white",
                                },
                                width: "100%",
                              }}
                              disabled
                            >
                              Your friend
                            </Button>
                          </Box>
                        )}
                        {item.position === "left" && item.daKetBan === 2 && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "end",
                              gap: "10px",
                              mt: 3,
                            }}
                          >
                            {item.ma_nguoiKetBan === item.ma_taiKhoan ? (
                              <Button
                                sx={{
                                  backgroundColor: "#009265",
                                  color: "white",
                                  border: "2px solid #009265",
                                  padding: "5px 15px",
                                  "&:hover": {
                                    backgroundColor: "#007850",
                                  },
                                  width: "100%",
                                }}
                                onClick={() =>
                                  handleChangeStatusFriend(
                                    item.ma_taiKhoan,
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
                                  border: "2px solid #009265",
                                  padding: "5px 15px",
                                  "&:hover": {
                                    backgroundColor: "#007850",
                                  },
                                  "&:disabled": {
                                    color: "white",
                                  },
                                  width: "100%",
                                }}
                                disabled
                              >
                                Requested
                              </Button>
                            )}
                          </Box>
                        )}
                      </Box>
                    }
                    placement="top-start"
                    variant="outlined"
                    arrow
                    backgroundColor="white"
                    PopperProps={{
                      popperOptions: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -5], // Change these values to move the tooltip
                            },
                          },
                        ],
                      },
                    }}
                  >
                    {/* <Box
                      component="img"
                      alt="profile"
                      src={profileImage}
                      height="36px"
                      width="36px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover" }}
                    /> */}
                    <Box borderRadius="50%">
                      <AvatarName name={item.ten_taiKhoan} />
                    </Box>
                  </Tooltip>
                </Box>
                {item ? (
                  <MessageBox
                    replyButton={
                      item.ma_taiKhoan === clientId && classItem?.anLopHoc === 0
                        ? true
                        : false
                    }
                    onReplyClick={
                      item.ma_taiKhoan === clientId
                        ? handleActionMenuMessage
                        : null
                    }
                    /* onTitleClick={
                      item.ma_taiKhoan !== clientId
                        ? () =>
                            handleClickOpenUserDetail(
                              item.email,
                              item.ten_taiKhoan,
                            )
                        : null
                    } */
                    position={item.position}
                    type={"text"}
                    text={item.noiDung}
                    date={item.thoiGianGui}
                    title={
                      item.position === "right"
                        ? "You"
                        : item.isTeacher
                        ? item.ten_taiKhoan + " (Teacher)"
                        : item.ten_taiKhoan
                    }
                    titleColor="#009265"
                    styles={{ maxWidth: "400px" }}
                  />
                ) : (
                  <Skeleton variant="rectangular" width={300} height={200} />
                )}

                {item.ma_taiKhoan === clientId && (
                  <Box>
                    <Menu
                      anchorEl={anchorEl}
                      open={isOpen}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      sx={{
                        boxShadow: "none",
                      }}
                      style={{ boxShadow: "none" }}
                    >
                      <MenuItem
                        onClick={handleClickOpenConfirmDelete}
                        sx={{
                          boxShadow: "none",
                        }}
                        style={{
                          boxShadow: "none",
                          fontWeight: "bold",
                        }}
                      >
                        <DeleteRounded
                          sx={{
                            marginRight: "5px",
                            fontSize: "24px",
                          }}
                        />{" "}
                        Delete
                      </MenuItem>
                    </Menu>
                    <Modal
                      open={openConfirmDelete}
                      onClose={handleCloseConfirmDelete}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "100%",
                          maxWidth: "600px",
                          bgcolor: "background.paper",
                          borderRadius: 2,
                          border: "none",
                          boxShadow: 4,
                          p: 3,
                        }}
                      >
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          fontWeight={600}
                        >
                          {`Do you want to continue deleting this message?`}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          This action cannot be undone. This will permanently
                          delete the message and cannot be recovered.
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "end",
                            gap: "10px",
                            mt: 3,
                          }}
                        >
                          <Button
                            sx={{
                              color: "#009265",
                              border: "2px solid #009265",
                              padding: "5px 15px",
                            }}
                            onClick={handleCloseConfirmDelete}
                          >
                            Cancel
                          </Button>
                          <Button
                            sx={{
                              backgroundColor: "#009265",
                              color: "white",
                              border: "2px solid #009265",
                              padding: "5px 15px",
                              "&:hover": {
                                backgroundColor: "#007850",
                              },
                            }}
                            onClick={() => handleDeleteMessage(item.ma_tinNhan)}
                          >
                            Confirm
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </Box>
                )}
              </Box>
            )
          );
        })}
      </Box>
      <Box
        sx={{
          position: "relative",
          height: "auto",
          padding: "5px 10px 15px",
          backgroundColor: "#e7e7e7",
        }}
      >
        {userScrolled && (
          <Box
            sx={{
              position: "absolute",
              top: "-50px",
              width: "auto",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
            }}
          >
            {notification.current !== 0 ? (
              <Box
                sx={{
                  margin: "auto",
                  backgroundColor: "#009265",
                  padding: 1,
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={scrollDown}
              >
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  New {notification.current} messages
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#009265",
                  borderRadius: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  cursor: "pointer",
                  transition: "all",
                  "&:hover": {
                    transform: "scale(1.10)",
                  },
                }}
                onClick={scrollDown}
              >
                <ArrowDownward
                  sx={{
                    color: "white",
                    fontSize: 30,
                  }}
                />
              </Box>
            )}
          </Box>
        )}
        {classItem?.anLopHoc === 0 && (
          <FlexBetween
            backgroundColor="white"
            borderRadius="9px"
            padding="0.1rem 1.5rem 0.1rem 0.5rem"
          >
            <TextField
              id="text-field-message"
              placeholder="Type a message..."
              sx={{
                width: "100%",
                padding: "0",
                color: "black",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
              variant="outlined"
              size="small"
              InputProps={{
                maxRows: 10,
                multiline: true,
              }}
              inputProps={{
                maxLength: 1000, // Add this line
              }}
              onChange={handleTextFieldChange}
              onKeyDown={async (event) => {
                const messageText = event.target.value.trim();
                if (event.key === "Enter" && event.shiftKey) {
                  // allow new line
                  return;
                } else if (event.key === "Enter" && messageText !== "") {
                  event.preventDefault(); // prevent new line
                  handleSendMessageTF();
                } else if (event.key === "Enter" && messageText === "") {
                  event.preventDefault(); // prevent new line
                }
              }}
            />
            {loadingPostMessage ? (
              <CircularProgress color="success" size={"26px"} />
            ) : (
              <IconButton
                id="send-message-button"
                sx={{
                  marginTop: "auto",
                }}
                onClick={handleSendMessageTF}
              >
                <SendRounded
                  id="send-message-button-icon"
                  sx={{ color: "gray" }}
                />
              </IconButton>
            )}
          </FlexBetween>
        )}
      </Box>
    </>
  );
};

export default ChatBoxGroup;
