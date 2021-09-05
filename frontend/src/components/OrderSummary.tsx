import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IOrder } from "./Interface/IOrder";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  summary: {
    [theme.breakpoints.up("sm")]: {
      boxShadow: "5px 10px 18px #888888",
    },
    border: "2px solid #f0f0f0",
    padding: 25,
    marginBottom: 50,
  },
  grid: {
    borderTop: "2px solid #f0f0f0",
    padding: 5,
    [theme.breakpoints.up("sm")]: {
      padding: 10,
    },
  },
  total: {
    fontWeight: "bolder",
  },
}));
const OrderSummary = ({ order }: { order: IOrder }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.summary}>
      <Typography variant="h6">ORDER SUMMARY</Typography>
      <br />
      <Grid container className={classes.grid}>
        <Grid item lg={7} md={7} sm={7} xs={7}>
          <Typography>Sub Total</Typography>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={5}>
          <Typography>$ {order.total.toFixed(2)}</Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item lg={7} md={7} sm={7} xs={7}>
          <Typography>Sales Tax</Typography>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={5}>
          <Typography>$ {order.totalSalesTax.toFixed(2)}</Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item lg={7} md={7} sm={7} xs={7}>
          <Typography>Shipping Tax</Typography>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={5}>
          <Typography>$ {order.totalShippingTax.toFixed(2)}</Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.grid}>
        <Grid item lg={7} md={7} sm={7} xs={7}>
          <Typography className={classes.total}>Grand Total</Typography>
        </Grid>
        <Grid item lg={5} md={5} sm={5} xs={5}>
          <Typography className={classes.total}>
            ${" "}
            {(
              order.total +
              order.totalSalesTax +
              order.totalShippingTax
            ).toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button
            color="primary"
            fullWidth={true}
            variant="contained"
            onClick={() => history.push("/checkout")}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderSummary;
