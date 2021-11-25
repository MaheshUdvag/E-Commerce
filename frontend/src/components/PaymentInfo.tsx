import { Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { IPayment } from "./Interface/IOrder";

interface IPaymentInfo {
  payment?: IPayment;
}

const PaymentInfo: React.FC<IPaymentInfo> = ({ payment }) => {
  return (
    <div>
      <Typography variant="h4">Payment</Typography>
      <Typography variant="body1">Method : {payment?.paymentType}</Typography>
      <Typography variant="body1">Payment Id : {payment?.paymentId}</Typography>
      {payment?.status === "COMPLETED" ? (
        <Alert severity="success">Payment Success</Alert>
      ) : (
        <Alert severity="error">Payment Failed</Alert>
      )}
    </div>
  );
};

export default PaymentInfo;
