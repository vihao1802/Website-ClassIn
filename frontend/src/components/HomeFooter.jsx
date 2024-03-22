import React, { useState } from "react";
import { AppBar, Container, Grid, IconButton, Typography } from "@mui/material";
import { Mail } from "@mui/icons-material";

const Footer = () => {
  const [copySuccess, setCopySuccess] = useState("");
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied to clipboard!");
    } catch (err) {
      setCopySuccess("Failed to copy text");
    }
  };

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
              aria-label="Gmail"
              sx={{ gap: "10px", alignItems: "center", padding: "0" }}
              onClick={() => copyToClipboard("hybridcnpm@gmail.com")}
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
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Footer;
