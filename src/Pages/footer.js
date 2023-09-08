import React from "react";
import { Container, Typography, Grid, Link } from "@mui/material";
import { LinkedIn, Instagram, GitHub } from "@mui/icons-material";

const footerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "20px 0",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const centerText = {
  textAlign: "center",
  color: "#fff",
};

const socialIcons = {
  display: "flex",
  justifyContent: "center", // Center icons horizontally
  marginBottom: "20px", // Add some spacing between icons and text
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Container maxWidth="lg" style={containerStyle}>
      <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" style={centerText}>
              Social Media
            </Typography>
          </Grid>
        <div style={socialIcons}>
          <Link href="#" color="inherit">
            <LinkedIn fontSize="large" />
          </Link>
          <Link href="#" color="inherit">
            <Instagram fontSize="large" />
          </Link>
          <Link href="#" color="inherit">
            <GitHub fontSize="large" />
          </Link>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} style={centerText}>
            <Typography variant="h4">IEDC-SNMIMT</Typography>
            <Typography variant="body2">
              Maliankara P.O, Moothankunnam,
              <br />
              Ernakulam Dt. Kerala-683516, India
            </Typography>
          </Grid>
          
        </Grid>
        <Typography variant="body2" style={centerText}>
          &copy; IEDC-SNMIMT. All rights reserved
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
