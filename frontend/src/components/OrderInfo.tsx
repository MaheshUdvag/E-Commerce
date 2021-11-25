import { Grid, Typography } from "@material-ui/core";
import { Image } from "cloudinary-react";
import React from "react";
import { IOrder } from "./Interface/IOrder";
import PaymentInfo from "./PaymentInfo";

interface IOrderInfo {
  order: IOrder;
}

const OrderInfo: React.FC<IOrderInfo> = ({ order }) => {
  return (
    <div>
      <PaymentInfo payment={order.payment} />
      <div>
        <Typography variant="h4">Address</Typography>
        <Typography variant="body1">Name: {order.address.lastName}</Typography>
        <Typography variant="body1">
          Address:{" "}
          {order.address.street1 +
            (order.address.street2
              ? ", " + order.address.street2 + ", "
              : ", ") +
            order.address.city +
            ", " +
            order.address.state +
            ", " +
            order.address.country +
            ", " +
            order.address.zipcode}
        </Typography>
      </div>
      <div>
        <Typography variant="h4">Order Items</Typography>
        {order.orderItems.map((orderItem) => (
          <Grid container key={orderItem._id} alignItems="center">
            <Grid item lg={2} md={2} sm={2} xs={2}>
              <Image
                cloudName="dvvxjkifm"
                style={{ maxHeight: 50, paddingRight: 10, height: "auto" }}
                crop="scale"
                src={orderItem.product.description[0].thumbnailImage}
              ></Image>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Typography variant="subtitle1">
                {orderItem.product.name}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Typography variant="subtitle1">
                {orderItem.quantity} X {orderItem.product.price.offerPrice} ={" "}
                {orderItem.price}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </div>
      {/* <CartItems order={order} page="summary" /> */}
    </div>
  );
};

export { OrderInfo };
