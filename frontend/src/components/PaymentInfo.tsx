import { Grid, makeStyles, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { IPayment } from "./Interface/IOrder";

const useStyles = makeStyles(() => ({
  title: {
    paddingBottom: 5,
  },
}));
interface IPaymentInfo {
  payment?: IPayment;
}

const PaymentInfo: React.FC<IPaymentInfo> = ({ payment }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h4" className={classes.title}>
            Payment
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="body1">
            Method : {payment?.paymentType}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="body1">
            Reference Number : {payment?.paymentId}
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          {payment?.status === "COMPLETED" ? (
            <Alert severity="success">Payment Success</Alert>
          ) : (
            <Alert severity="error">Payment Failed</Alert>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentInfo;
