import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpg";
import ClassWidget from "components/ClassWidget";
import ModalHandleClass from "components/ModalHandleClass";
import { useGetClassQuery, useGetAllUserQuery } from "state/api";
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
    name: "Phát tiển phần mềm mã nguồn mở",
    image: profileImage,
  },
  {
    name: "Web Development",
    image: profileImage,
  },
  {
    name: "Data Science",
    image: profileImage,
  },
  {
    name: "Mobile App Development",
    image: profileImage,
  },
  {
    name: "Artificial Intelligence",
    image: profileImage,
  },
  {
    name: "Machine Learning",
    image: profileImage,
  },
  {
    name: "Database Management",
    image: profileImage,
  },
  {
    name: "Network Security",
    image: profileImage,
  },
  {
    name: "Cloud Computing",
    image: profileImage,
  },
  {
    name: "UI/UX Design",
    image: profileImage,
  },
  {
    name: "Game Development",
    image: profileImage,
  },
  {
    name: "Class 16",
    image: profileImage,
  },
  {
    name: "Class 17",
    image: profileImage,
  },
  {
    name: "Class 18",
    image: profileImage,
  },
  {
    name: "Class 19",
    image: profileImage,
  },
  {
    name: "Class 20",
    image: profileImage,
  },
  {
    name: "Class 21",
    image: profileImage,
  },
  {
    name: "Class 22",
    image: profileImage,
  },
  {
    name: "Class 23",
    image: profileImage,
  },
  {
    name: "Class 24",
    image: profileImage,
  },
  {
    name: "Class 25",
    image: profileImage,
  },
  {
    name: "Class 26",
    image: profileImage,
  },
  {
    name: "Class 27",
    image: profileImage,
  },
  {
    name: "Class 28",
    image: profileImage,
  },
  {
    name: "Class 29",
    image: profileImage,
  },
  {
    name: "Class 30",
    image: profileImage,
  },
  {
    name: "Class 31",
    image: profileImage,
  },
  {
    name: "Class 32",
    image: profileImage,
  },
  {
    name: "Class 33",
    image: profileImage,
  },
  {
    name: "Class 34",
    image: profileImage,
  },
  {
    name: "Class 35",
    image: profileImage,
  },
  {
    name: "Class 36",
    image: profileImage,
  },
  {
    name: "Class 37",
    image: profileImage,
  },
  {
    name: "Class 38",
    image: profileImage,
  },
  {
    name: "Class 39",
    image: profileImage,
  },
  {
    name: "Class 40",
    image: profileImage,
  },
];

const Clasin = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenModalJoin, setOpenModalJoin] = useState(false);
  const [isOpenModalCreate, setOpenModalCreate] = useState(false);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleOpenModalJoin = () => {
    setOpenModalJoin(true);
  };
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };
  const handleCLoseModalJoin = () => {
    setOpenModalJoin(false);
  };
  const handleCLoseModalCreate = () => {
    setOpenModalCreate(false);
  };
  const handleJoin = () => {
    console.log("Join");
  };
  const handleCreate = () => {
    console.log("Create");
  };
  /* const { data, isLoading } = useGetClassQuery(
    "1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9",
  ); */

  const { data: userList, isLoading: userListLoading } = useGetAllUserQuery();
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    if (userList && userList.length > 0 && !clientId) {
      const uniqueUserIds = userList.map((user) => user.ma_taiKhoan);
      const nonDuplicateIds = uniqueUserIds.filter(
        (id, index) => uniqueUserIds.indexOf(id) === index,
      );
      const randomClientId =
        nonDuplicateIds[Math.floor(Math.random() * nonDuplicateIds.length)];
      console.log(randomClientId);
      setClientId(randomClientId);
    }
  }, [userList, clientId]);

  const { data, isLoading } = useGetClassQuery(clientId);

  const [activeClass, setActiveClass] = useState(null);
  useEffect(() => {
    setActiveClass(data?.[0]);
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "calc(100% - 50.8px)",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

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
          width: "20%",
          height: "100%",
          padding: "10px",
          borderRight: "1px solid #e7e7e7",
          display: "flex",
          flexDirection: "column",
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
            Your Classes
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
              <MenuItem onClick={handleOpenModalJoin}>Join class</MenuItem>
              <ModalHandleClass
                open={isOpenModalJoin}
                handleClose={handleCLoseModalJoin}
                handleClass={handleJoin}
                title={"Join class"}
              />
              <MenuItem onClick={handleOpenModalCreate}>Create class</MenuItem>
              <ModalHandleClass
                open={isOpenModalCreate}
                handleClose={handleCLoseModalCreate}
                handleClass={handleCreate}
                title={"Create class"}
              />
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
          {data &&
            data.map((item, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setActiveClass(item);
                    }}
                    sx={{
                      backgroundColor:
                        activeClass?.ma_lopHoc === item.ma_lopHoc
                          ? "#e7e7e7"
                          : "transparent",
                      color:
                        activeClass?.ma_lopHoc === item.ma_lopHoc
                          ? "black"
                          : "#666666",
                    }}
                  >
                    <Box
                      component="img"
                      alt="profile"
                      src={item.anhDaiDien}
                      height="48px"
                      width="48px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover" }}
                    />
                    <ListItemText
                      primary={item.ten}
                      sx={{ paddingLeft: "10px", maxWidth: "195px" }}
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
      {activeClass ? (
        <ClassWidget classItem={activeClass} clientId={clientId} />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "calc(100% - 50.8px)",
          }}
        >
          <CircularProgress color="success" />
        </Box>
      )}
    </Box>
  );
};

export default Clasin;
