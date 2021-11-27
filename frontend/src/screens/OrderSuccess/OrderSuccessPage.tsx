import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { completedOrder } from "../../apis/orderApis";
import { IOrder } from "../../components/Interface/IOrder";
import { OrderInfo } from "../../components/OrderInfo";
import OrderSummary from "../../components/OrderSummary";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useHistory } from "react-router";

const OrderSuccessPage: React.FC<any> = (props) => {
  const { token, orderId } = (props.location && props.location.state) || {};
  const [order, setOrder] = useState<IOrder | null>(null);
  const history = useHistory();

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
      <Typography variant="h2">Thank you for your order!</Typography>
      <Typography variant="h6">Order Id: {order._id}</Typography>
      <Grid container spacing={2}>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => history.push("/")}
          >
            Continue Shopping
          </Button>
          <OrderInfo order={order} />
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <OrderSummary order={order} showCheckout={false} />
        </Grid>
      </Grid>
    </Container>
  ) : null;
};

export default OrderSuccessPage;
