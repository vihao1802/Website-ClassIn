import * as React from "react";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

const HomeNavbar = ({ IsNotHomePage }) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <FlexBetween
      sx={{
        width: "100%",
        height: "50px",
        backgroundColor: "white",
        borderBottom: "1px solid #e7e7e7",
        padding: "0 50px",
      }}
    >
      <FlexBetween>
        {IsNotHomePage && (
          <WestOutlinedIcon
            sx={{ color: "#009265", fontSize: "30px", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
        )}
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#009265",
            fontSize: "30px",
            marginLeft: "30px",
          }}
        >
          ClassIn
        </Typography>
      </FlexBetween>
      {!IsNotHomePage && (
        <>
          <Box sx={{ width: "300px", height: "40px" }}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ height: "40px" }}
            >
              <BottomNavigationAction
                label="Home"
                sx={{
                  color: "#009265",
                  width: "100px",
                  ".MuiBottomNavigationAction-label": { fontSize: "18px" },
                  ".MuiBottomNavigationAction-label.Mui-selected": {
                    fontSize: "18px",
                    borderBottom: "2px solid #009265",
                    color: "#009265",
                    fontWeight: "bold",
                  },
                  "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
                    color: "#009265",
                  },
                }}
              />
              <BottomNavigationAction
                label="About Us"
                sx={{
                  color: "#009265",
                  width: "100px",
                  ".MuiBottomNavigationAction-label": { fontSize: "18px" },
                  ".MuiBottomNavigationAction-label.Mui-selected": {
                    fontSize: "18px",
                    borderBottom: "2px solid #009265",
                    color: "#009265",
                    fontWeight: "bold",
                  },
                }}
              />
            </BottomNavigation>
          </Box>
          <FlexBetween sx={{ width: "20%", padding: "0 35px" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#009265",
                width: "100px",
                height: "35px",
                "&:hover": {
                  backgroundColor: "#007850",
                },
              }}
              onClick={() => navigate(`/login`)}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #009265",
                color: "#009265",
                width: "100px",
                height: "35px",
                "&:hover": {
                  border: "1px solid #009265",
                },
              }}
              onClick={() => navigate(`/login`)}
            >
              Sign Up
            </Button>
          </FlexBetween>
        </>
      )}
    </FlexBetween>
  );
};

export default HomeNavbar;
