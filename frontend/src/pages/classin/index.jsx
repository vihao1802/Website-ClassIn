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
  Avatar,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  Add,
  LocalLibraryRounded,
  ExpandLessRounded,
  ExpandMoreRounded,
  SchoolRounded,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpg";
import ClassWidget from "components/ClassWidget";
import ModalHandleClass from "components/ModalHandleClass";
import { useGetClassQuery, useGetAllUserQuery } from "state/api";
import AvatarName from "components/AvatarName";
import Loading from "components/Loading";

const Classin = () => {
  const userId = "1cfa4d8e-5f63-45f6-9cc9-b1ecae2c14f9";
  // const userId = "ce6180fb-58f4-45da-9488-a00e8edeff2c";

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

  const [openTeaching, setOpenTeaching] = React.useState(false);

  const handleClickTeaching = () => {
    setOpenTeaching(!openTeaching);
  };

  const [openRegistered, setOpenRegistered] = React.useState(true);

  const handleClickRegistered = () => {
    setOpenRegistered(!openRegistered);
  };

  const { data: userList, isLoading: userListLoading } = useGetAllUserQuery();
  const [clientId, setClientId] = useState(null);

  const {
    data: classInfo,
    isLoading: isClassInfoLoading,
    refetch: refetchClassInfo,
  } = useGetClassQuery(userId);

  useEffect(() => {
    if (userList && userList.length > 0 && !clientId) {
      const uniqueUserIds = userList.map((user) => user.ma_taiKhoan);
      const nonDuplicateIds = uniqueUserIds.filter(
        (id, index) => uniqueUserIds.indexOf(id) === index,
      );
      const randomClientId =
        nonDuplicateIds[Math.floor(Math.random() * nonDuplicateIds.length)];
      //console.log(randomClientId);
      setClientId(randomClientId);
    }
  }, [userList, clientId]);

  const [activeClass, setActiveClass] = useState(null);
  useEffect(() => {
    setActiveClass(classInfo?.[0]);
  }, [classInfo, isClassInfoLoading]);

  if (isClassInfoLoading) {
    return <Loading />;
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
                userId={userId}
                refetchClassInfo={refetchClassInfo}
              />
              <MenuItem onClick={handleOpenModalCreate}>Create class</MenuItem>
              <ModalHandleClass
                open={isOpenModalCreate}
                handleClose={handleCLoseModalCreate}
                handleClass={handleCreate}
                title={"Create class"}
                userId={userId}
                refetchClassInfo={refetchClassInfo}
              />
            </Menu>
          </FlexBetween>
        </FlexBetween>
        <Box
          sx={{
            height: "100%",
            overflowY: "scroll",

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
          {/* Teaching */}
          <ListItemButton
            onClick={handleClickTeaching}
            sx={{ marginTop: "10px" }}
          >
            <ListItemIcon>
              <LocalLibraryRounded />
            </ListItemIcon>
            <ListItemText primary="Teaching" />
            {openTeaching ? <ExpandLessRounded /> : <ExpandMoreRounded />}
          </ListItemButton>
          <Collapse in={openTeaching} timeout="auto" unmountOnExit>
            {classInfo || !isClassInfoLoading ? (
              <List>
                {classInfo
                  ?.filter((item) => item.ma_giangVien === userId)
                  .map((item, index) => {
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
                          <AvatarName name={item.ten} />
                          {/* <Box
                    component="img"
                    alt="profile"
                    src={item.anhDaiDien}
                    height="48px"
                    width="48px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  /> */}

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
            ) : (
              <Loading />
            )}
          </Collapse>
          {/* Registered */}
          <ListItemButton
            onClick={handleClickRegistered}
            sx={{ marginTop: "10px" }}
          >
            <ListItemIcon>
              <SchoolRounded />
            </ListItemIcon>
            <ListItemText primary="Registered" />
            {openRegistered ? <ExpandLessRounded /> : <ExpandMoreRounded />}
          </ListItemButton>
          <Collapse in={openRegistered} timeout="auto" unmountOnExit>
            {classInfo || !isClassInfoLoading ? (
              <List>
                {classInfo
                  ?.filter((item) => item.ma_giangVien !== userId)
                  .map((item, index) => {
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
                          <AvatarName name={item.ten} />
                          {/* <Box
                              component="img"
                              alt="profile"
                              src={item.anhDaiDien}
                              height="48px"
                              width="48px"
                              borderRadius="50%"
                              sx={{ objectFit: "cover" }}
                            /> */}

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
            ) : (
              <Loading />
            )}
          </Collapse>
        </Box>
      </Box>
      {/* CENTER CONTAIN */}
      {activeClass ? (
        <ClassWidget classId={activeClass.ma_lopHoc} clientId={userId} />
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default Classin;
