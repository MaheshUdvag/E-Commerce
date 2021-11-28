import {
  Button,
  createStyles,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { approveOrder } from "../apis/orderApis";
import PayPal from "./PayPal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  })
);

const Payment: React.FC<any> = ({ order, token, shippingAddress }) => {
  const [paymentType, setPaymentType] = useState<string>("Cash On Delivery");
  const classes = useStyles();
  const history = useHistory();
  const handleChange = (event: any) => {
    const name = event.target.value;
    setPaymentType(name);
  };

  const placeOrder = async () => {
    console.log(paymentType);

    if (paymentType !== "") {
      const {
        data: { status },
      } = await approveOrder(order._id, paymentType, shippingAddress, token);
      if (status === "COMPLETED")
        history.push({
          pathname: "/orderSummary",
          state: { orderId: order._id, token },
        });
    }
  };

  return (
    <div>
      <Grid container spacing={5} style={{ marginTop: 10 }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <InputLabel id="demo-simple-select-helper-label">
            Choose Payment
          </InputLabel>
          <Select
            native
            labelId="demo-simple-select-helper-label"
            value={paymentType}
            onChange={handleChange}
            style={{ padding: 15 }}
            inputProps={{
              name: paymentType,
            }}
          >
            <option style={{ padding: 15 }} value="Cash On Delivery">
              Cash On Delivery
            </option>
            <option style={{ padding: 15 }} value="PayPal">
              PayPal
            </option>
          </Select>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {paymentType === "PayPal" ? (
            <PayPal
              order={order}
              token={token}
              shippingAddress={shippingAddress}
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={placeOrder}
            >
              Place Order
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Payment;
