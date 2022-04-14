import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { IOrder } from "./Interface/IOrder";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Skeleton } from "@material-ui/lab";

interface IOrderList {
  orders: IOrder[];
  selectOrder: (order: IOrder) => void;
  loading: boolean;
}

const useStyles = makeStyles((theme) => ({
  orders: {
    [theme.breakpoints.up("md")]: {
      boxShadow: "5px 10px 18px #888888",
      width: "70%",
    },
    [theme.breakpoints.down(350)]: {
      padding: 5,
    },
    border: "2px solid #f0f0f0",
    marginBottom: 50,
    padding: 20,
  },
  order: {
    borderTop: "2px solid #f0f0f0",
    padding: 15,
  },
  viewMore: {
    cursor: "pointer",
  },
}));

const OrderList: React.FC<IOrderList> = ({ orders, selectOrder, loading }) => {
  const classes = useStyles();

  return (
    <Container className={classes.orders}>
      <Grid container className={classes.order}>
        <Typography variant="h4">Orders</Typography>
      </Grid>
      <Grid container className={classes.order}>
        <Grid item lg={3} md={4} sm={4} xs={5}>
          <Typography>Order ID</Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Typography>Total</Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Typography>Status</Typography>
        </Grid>
        <Grid item lg={3} md={2} sm={2} xs={1}></Grid>
      </Grid>
      {orders?.map((order) => (
        <Grid container key={order._id} className={classes.order}>
          <Grid item lg={3} md={4} sm={4} xs={5}>
            <Typography variant="body2">{order.orderId}</Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Typography variant="body2">{order.total.toFixed(2)}</Typography>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Typography variant="body2">
              {order.status === "S" ? "Placed" : "Failed"}
            </Typography>
          </Grid>
          <Grid item lg={3} md={2} sm={2} xs={1}>
            <VisibilityIcon
              fontSize="small"
              className={classes.viewMore}
              onClick={() => selectOrder(order)}
            />
          </Grid>
        </Grid>
      ))}
      {!orders && loading ? (
        [1, 2, 3, 4].map((index) => (
          <Grid container key={index} className={classes.order}>
            <Grid item lg={3} md={4} sm={4} xs={5}>
              <Skeleton variant="rect" height={15} width={90} />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Skeleton variant="rect" height={15} width={90} />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Skeleton variant="rect" height={15} width={90} />
            </Grid>
            <Grid item lg={3} md={2} sm={2} xs={1}>
              <Skeleton variant="rect" height={15} width={10} />
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid container className={classes.order}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6">No Orders Available.</Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default OrderList;
