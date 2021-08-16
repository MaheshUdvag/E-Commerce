import React from "react";
import { Container, Grid, Box, Link } from "@material-ui/core";

const footer = () => {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="#232f3e"
        color="#ffffff"
      >
        <Container maxwidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Social</Box>
              <Box py={{ xs: 0.3, sm: 0.5 }}>
                <Link href="/" color="secondary">
                  Facebook
                </Link>
              </Box>
              <Box py={{ xs: 0.3, sm: 0.5 }}>
                <Link href="/" color="secondary">
                  Twitter
                </Link>
              </Box>
              <Box py={{ xs: 0.3, sm: 0.5 }}>
                <Link href="/" color="secondary">
                  Instagram
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box py={{ xs: 0.3, sm: 0.5 }}>
                <Link href="/" color="secondary">
                  Payments
                </Link>
              </Box>
              <Box py={{ xs: 0.3, sm: 0.5 }}>
                <Link href="/" color="secondary">
                  Shipping
                </Link>
              </Box>
              <Box py={{ xs: 0.3, sm: 0.5 }}>
                <Link href="/" color="secondary">
                  Returns
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>About</Box>
              <Box py={{ xs: 0.3, sm: 0.5 }}>
                <Link href="/" color="secondary">
                  Contact Us
                </Link>
              </Box>
              <Box py={{ xs: 0.3, sm: 0.5 }}>
                <Link href="/" color="secondary">
                  About Us
                </Link>
              </Box>
              <Box py={{ xs: 0.3, sm: 0.5 }}>
                <Link href="/" color="secondary">
                  Careers
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Commerce &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default footer;
