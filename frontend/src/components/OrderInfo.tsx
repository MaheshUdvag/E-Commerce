import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Image } from "cloudinary-react";
import React from "react";
import { IOrder } from "./Interface/IOrder";
import PaymentInfo from "./PaymentInfo";

const useStyles = makeStyles(() => ({
  grid: {
    marginTop: 15,
  },
  title: {
    paddingBottom: 5,
  },
  separator: {
    borderTop: "2px solid #f2f2f2",
  },
}));

interface IOrderInfo {
  order: IOrder;
}

const OrderInfo: React.FC<IOrderInfo> = ({ order }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.grid}>
      <Grid item lg={12} md={12} sm={12} xs={12} className={classes.separator}>
        <PaymentInfo payment={order.payment} />
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12} className={classes.separator}>
        <Typography variant="h4" className={classes.title}>
          Address
        </Typography>
        <Grid container spacing={1}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="body1">
              Name : {order.address.lastName}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="body1">
              Address :{" "}
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
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} className={classes.separator}>
        <Typography variant="h4" className={classes.title}>
          Order Items
        </Typography>
        {order.orderItems.map((orderItem) => (
          <Grid container key={orderItem._id} alignItems="center" spacing={1}>
            <Grid item lg={2} md={2} sm={2} xs={3}>
              <Image
                cloudName="dvvxjkifm"
                style={{ maxHeight: 45, paddingRight: 10, height: "auto" }}
                crop="scale"
                src={orderItem.product.description[0].thumbnailImage}
              ></Image>
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5}>
              <Typography variant="subtitle2">
                {orderItem.product.name}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Typography variant="subtitle2">
                {orderItem.quantity} X {orderItem.product.price.offerPrice} ={" "}
                {orderItem.price}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export { OrderInfo };
