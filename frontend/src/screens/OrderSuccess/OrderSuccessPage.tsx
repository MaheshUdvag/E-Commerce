import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { completedOrder } from "../../apis/orderApis";
import { IOrder } from "../../components/Interface/IOrder";
import { OrderInfo } from "../../components/OrderInfo";
import OrderSummary from "../../components/OrderSummary";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router";
import OrderConfirmationSkeleton from "../../components/Skeletons/OrderConfirmationSkeleton";

const useStyles = makeStyles(() => ({
  title: {
    paddingBottom: 10,
  },
}));

const OrderSuccessPage: React.FC<any> = (props) => {
  const { token, orderId } = (props.location && props.location.state) || {};
  const [order, setOrder] = useState<IOrder | null>(null);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    const orderResponse = async () => {
      const { data } = await completedOrder(token, orderId);
      setOrder(data);
    };

    if (orderId !== null && token !== null) {
      orderResponse();
    }

    return () => {
      history.replace("", null);
    };
  }, [token, orderId, history]);

  return order !== null ? (
    <Container>
      <Typography variant="h2" className={classes.title}>
        Thank you for your order!
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="body1">
                Your Order Id is {order.orderId}
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography variant="body1">
                We will email the order confirmation details shortly.
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => {
                  history.replace("", null);
                  history.push("/");
                }}
              >
                Continue Shopping
              </Button>
            </Grid>
          </Grid>

          <OrderInfo order={order} />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <OrderSummary order={order} showCheckout={false} />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <OrderConfirmationSkeleton />
  );
};

export default OrderSuccessPage;
