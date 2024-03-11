import React, { useState } from "react";
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  TextField,
  Tab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Add, MoreHorizOutlined } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpg";
import ClassWidget from "components/ClassWidget";

const classItems = [
  {
    name: "Công nghệ phần mềm",
    image: profileImage,
  },
  {
    name: "Kỹ thuật lập trình",
    image: profileImage,
  },
  {
    name: "Cơ sở trí tuệ nhân tạo",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Thiết kế giao diện",
    image: profileImage,
  },
  {
    name: "Phát tiển phần mềm mã nguồn mở",
    image: profileImage,
  },
];

const Clasin = () => {
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
        <FlexBetween>
          <Typography
            sx={{
              color: "#009265",
              fontSize: "18px",
              textAlign: "center",
              marginLeft: "10px",
            }}
          >
            Your classes
          </Typography>
          <FlexBetween>
            <Button
              onClick={handleClick}
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
                  New
                </Typography>
              </Box>
              <Add sx={{ color: "white", fontSize: "18px" }} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleClose}>Join class</MenuItem>
              <MenuItem onClick={handleClose}>Create class</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
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
          {classItems.map(({ name, image }) => {
            return (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActive(name);
                  }}
                  sx={{
                    backgroundColor:
                      active === name ? "#e7e7e7" : "transparent",
                    color: active === name ? "black" : "#666666",
                  }}
                >
                  <Box
                    component="img"
                    alt="profile"
                    src={image}
                    height="32px"
                    width="32px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  />
                  <ListItemText
                    primary={name}
                    sx={{ paddingLeft: "10px" }}
                    primaryTypographyProps={{
                      style: {
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* CENTER CONTAIN */}
      <ClassWidget />
    </Box>
  );
};

export default Clasin;
