import { Container, Grid, Typography } from "@material-ui/core";
import { Image } from "cloudinary-react";
import React from "react";

const FutureImplementation = () => {
  return (
    <Container>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Image
            cloudName="dvvxjkifm"
            style={{ maxHeight: 200, paddingRight: 10, maxWidth: 200 }}
            crop="scale"
            alt="work in progress"
            src="https://res.cloudinary.com/dvvxjkifm/image/upload/v1646474410/ECommerce/work-in-progress_w525mw.jpg"
          ></Image>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6">
            Stay tuned for more updates. Coming Soon!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FutureImplementation;
