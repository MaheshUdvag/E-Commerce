import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import AddressCard from "./AddressCard";
import CartItems from "./CartItems";
import { IOrder } from "./Interface/IOrder";
import OrderSummary from "./OrderSummary";

interface IOrderDetail {
  order: IOrder | undefined;
  setOrderById: (id: Number) => void;
}

const OrderDetail: React.FC<IOrderDetail> = ({ order, setOrderById }) => {
  const { id } = useParams<any>();
  const history = useHistory();

  useEffect(() => {
    if (!order) {
      setOrderById(Number(id));
    }
  }, [order, id, setOrderById]);

  return order ? (
    <Grid container spacing={4} style={{ minHeight: "55vh" }}>
      <Grid item lg={12} md={12} sm={12} xs={12} style={{ padding: 10 }}>
        <Typography variant="h4">
          Order Details for Order # {order.orderId}
        </Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} style={{ padding: 10 }}>
        <Button size="large" onClick={() => history.goBack()}>
          Back
        </Button>
      </Grid>
      <Grid item lg={8} md={8} sm={12} xs={12} style={{ padding: 10 }}>
        <CartItems order={order} page="summary" />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} style={{ padding: 10 }}>
        <OrderSummary order={order} showCheckout={false} />
        <Typography variant="h5" style={{ padding: 10 }}>
          Delivery Address
        </Typography>
        <AddressCard address={order.address} page="summary" />
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default OrderDetail;
