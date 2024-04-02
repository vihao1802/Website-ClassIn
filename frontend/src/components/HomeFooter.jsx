import React, { useState } from "react";
import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Typography,
  Popover,
} from "@mui/material";
import { Mail } from "@mui/icons-material";

const Footer = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const copyToClipboard = async (event) => {
    setAnchorEl(event.currentTarget);
    await navigator.clipboard.writeText("hybridcnpm@gmail.com");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          style={{ padding: "20px 0", borderTop: "4px solid #ccc" }}
        >
          <Typography variant="body1" color="textSecondary">
            &copy; {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </Typography>
          <Grid item>
            <IconButton
              aria-describedby={id}
              variant="contained"
              sx={{ gap: "10px", alignItems: "center", padding: "0" }}
              onClick={copyToClipboard}
            >
              <p style={{ fontStyle: "bold", fontSize: "18px", margin: "0" }}>
                hybridcnpm@gmail.com
              </p>
              <Mail />
            </IconButton>

            {/* <IconButton aria-label="YouTube">
              <YouTube />
            </IconButton>
            <IconButton aria-label="Facebook">
              <Facebook />
            </IconButton> */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              sx={{
                marginRight: "-40px",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography
                sx={{
                  borderRadius: "20px",
                  padding: "5px 10px",
                  textAlign: "center",
                }}
              >
                Copied!
              </Typography>
            </Popover>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Footer;
