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
  const [paymentType, setPaymentType] = useState();
  const classes = useStyles();
  const handleChange = (event: any) => {
    const name = event.target.value;
    setPaymentType(name);
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
