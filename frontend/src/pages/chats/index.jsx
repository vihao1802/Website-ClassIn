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

const classItems = [
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

const Chats = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [active, setActive] = useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      {/* LEFT SIDEBAR */}
      <Box
        sx={{
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
          Your Messages
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
            height: "500px",
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
          {classItems.map((item) => {
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
        <Box sx={{ minHeight: "500px", padding: "10px" }}></Box>
        {/* TEXT FIELD */}
        <Box p="0 20px">
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
