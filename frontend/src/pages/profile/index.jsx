import React from "react";
import { Box, Paper, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { AccountCircleRounded, LockRounded } from "@mui/icons-material";
import HomeNavbar from "components/HomeNavbar";
import { useGetUserQuery } from "state/api";
import { getUserId_Cookie } from "utils/handleCookies";
import Loading from "components/Loading";
import UserInfoForm from "components/profile/UserInfoForm";
import ChangePasswordForm from "components/profile/ChangePasswordForm";

const Profile = () => {
  const userId = getUserId_Cookie();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isLoading } = useGetUserQuery(userId);

  return (
    <Box>
      <HomeNavbar IsNotHomePage={true} title="Your Account" />
      <Box
        sx={{
          width: "100%",
          height: "calc(100%-50.8px)",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "calc(100%-50.8px)",
            display: "flex",
            flexDirection: "row",
            gap: 3,
            margin: "20px auto 0",
            justifyContent: "center",
          }}
        >
          <TabContext value={value}>
            <Paper
              sx={{ height: "25%", width: "350px", padding: "20px" }}
              elevation={3}
            >
              <TabList
                orientation="vertical"
                onChange={handleChange}
                sx={{
                  "& .MuiTab-root": {
                    color: "#009265",
                    borderRadius: "5px",
                    minHeight: "50px",
                    justifyContent: "flex-start",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "white",
                    backgroundColor: "#009265",
                  },
                }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "unset",
                  },
                }}
              >
                <Tab
                  label="Common"
                  value="1"
                  icon={<AccountCircleRounded />}
                  iconPosition="start"
                />
                <Tab
                  label="Change Password"
                  value="2"
                  icon={<LockRounded />}
                  iconPosition="start"
                />
              </TabList>
            </Paper>
            <Paper sx={{ height: "auto", width: "60%" }} elevation={3}>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <TabPanel value="1">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <UserInfoForm data={data} userId={userId} />
                    )}
                  </TabPanel>
                  <TabPanel value="2">
                    <Typography
                      variant="body1"
                      color="#666666"
                      fontWeight="bold"
                    >
                      <em>
                        *You need to enter your current password to be able to
                        change your new password
                      </em>
                    </Typography>
                    <ChangePasswordForm userId={userId} />
                  </TabPanel>
                </>
              )}
            </Paper>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
