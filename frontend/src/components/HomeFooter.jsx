import React from "react";
import { AppBar, Container, Grid, IconButton, Typography } from "@mui/material";
import { Facebook, YouTube, Mail } from "@mui/icons-material";

const Footer = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="space-between" style={{ padding: "20px 0", borderTop: "4px solid #ccc" }}>
          <Typography variant="body1" color="textSecondary">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
          <Grid item>
            <IconButton aria-label="Gmail">
                <span style={{ fontStyle: 'bold' }}>
                hybridcnpm@gmail.com    
                </span>
              <Mail />  
            </IconButton>
            <IconButton aria-label="YouTube">
              <YouTube />
            </IconButton>
            <IconButton aria-label="Facebook">
              <Facebook />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Footer;
