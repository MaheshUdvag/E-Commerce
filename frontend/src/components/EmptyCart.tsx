import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Image } from "cloudinary-react";
import React from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router";

const EmptyCart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      spacing={3}
    >
      <Grid item lg={12}>
        <Image
          cloudName="dvvxjkifm"
          crop="scale"
          width={isMobile && 300}
          src="https://res.cloudinary.com/dvvxjkifm/image/upload/v1631170743/ECommerce/no_cart_nywvpb.png"
        />
      </Grid>
      <Grid item lg={12}>
        <Typography variant={isMobile ? "h4" : "h2"}>
          Your cart is empty!
        </Typography>
      </Grid>
      <Grid item lg={12}>
        <Typography variant={isMobile ? "body2" : "body1"}>
          Looks like you have not added items to your cart yet. Start Shopping
          now by clicking below.
        </Typography>
      </Grid>
      <Grid item lg={12}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => history.push("/")}
        >
          Start Shopping
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmptyCart;
