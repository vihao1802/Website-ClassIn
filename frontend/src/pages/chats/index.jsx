import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemButton,
  InputBase,
  IconButton,
} from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpg";
import "react-chat-elements/dist/main.css";
import { ChatItem, MessageBox } from "react-chat-elements";

const usersItems = [
  {
    name: "Stephen Chow",
    image: profileImage,
  },
  {
    name: "John Cena",
    image: profileImage,
  },
  {
    name: "Hu Chuynh",
    image: profileImage,
  },
  {
    name: "Jackie Chan",
    image: profileImage,
  },
  {
    name: "Bruce Lee",
    image: profileImage,
  },
];

const messageItems = [
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed ducimus inventore rerum! In earum nesciunt est velit omnis illo qui adipisci, vel obcaecati molestiae ipsum voluptate repellendus dicta aperiam aspernatur.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed ducimus inventore rerum! In earum nesciunt est velit omnis illo qui adipisci, vel obcaecati molestiae ipsum voluptate repellendus dicta aperiam aspernatur.",
    position: "left",
    name: "Admin",
  },
  {
    text: "Xin chào! Bạn cần hỗ trợ gì hôm nay?",
    position: "left",
    name: "User1",
  },
  {
    text: "Tôi đang tìm hiểu về các tính năng của ứng dụng.",
    position: "right",
    name: "Admin",
  },
  {
    text: "Rất vui được giúp đỡ. Bạn muốn biết điều gì cụ thể?",
    position: "right",
    name: "User1",
  },
  {
    text: "Có tính năng nào giúp tìm kiếm bạn bè không?",
    position: "left",
    name: "Admin",
  },
  {
    text: "Có, bạn có thể sử dụng tính năng tìm kiếm để tìm kiếm bạn bè.",
    position: "right",
    name: "User1",
  },
  {
    text: "Tôi thấy rất hứng thú! Làm thế nào để kết bạn mới?",
    position: "left",
    name: "Admin",
  },
  {
    text: "Bạn có thể sử dụng chức năng kết bạn và gửi lời mời kết bạn đến người khác.",
    position: "left",
    name: "User1",
  },
  {
    text: "Cảm ơn bạn! Tôi sẽ thử ngay bây giờ.",
    position: "right",
    name: "Admin",
  },
  {
    text: "Chúc bạn có trải nghiệm tuyệt vời! Hãy thông báo nếu cần thêm sự hỗ trợ.",
    position: "left",
    name: "Admin",
  },
  { text: "Message 11", position: "right", name: "User1" },
  { text: "Message 12", position: "left", name: "User2" },
  { text: "Message 13", position: "left", name: "User3" },
  { text: "Message 14", position: "right", name: "User2" },
  { text: "Message 15", position: "left", name: "User1" },
  { text: "Message 16", position: "right", name: "Admin" },
  { text: "Message 17", position: "left", name: "User3" },
  { text: "Message 18", position: "right", name: "User2" },
  { text: "Message 19", position: "right", name: "User1" },
  { text: "Message 20", position: "left", name: "User3" },
];

const Chats = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [active, setActive] = useState("");

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
          {usersItems.map((item) => {
            return (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActive(item.name);
                  }}
                  sx={{
                    backgroundColor:
                      active === item.name ? "#e7e7e7" : "transparent",
                    color: active === item.name ? "black" : "#666666",
                    height: "70px",
                  }}
                >
                  <Box
                    component="img"
                    alt="profile"
                    src={item.image}
                    height="48px"
                    width="48px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  />
                  <Box ml="10px">
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#666666" }}>
                      You: What a wonderful day!
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
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
            Stephen Chow
          </Typography>
        </Box>
        {/* MESSAGE BOX */}
        <Box
          sx={{
            minHeight: "500px",
            padding: "10px",
            height: "500px",
            overflowY: "scroll",
            backgroundColor: "#e7e7e7",
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
          {messageItems.map((item) => {
            return (
              <Box
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
                  <Box
                    component="img"
                    alt="profile"
                    src={profileImage}
                    height="36px"
                    width="36px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  />
                </Box>
                <MessageBox
                  position={item.position}
                  type={"text"}
                  text={item.text}
                  date={new Date()}
                  title={item.name}
                  titleColor="#009265"
                  styles={{ maxWidth: "400px" }}
                />
              </Box>
            );
          })}
        </Box>
        {/* TEXT FIELD */}
        <Box p="0 20px" mt="10px">
          <FlexBetween
            backgroundColor="white"
            border="1px solid #e7e7e7"
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Aa" />
            <IconButton>
              <SendRounded sx={{ color: "#009265" }} />
            </IconButton>
          </FlexBetween>
        </Box>
      </Box>
    </Box>
  );
};

export default Chats;
