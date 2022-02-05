import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  approvePayPalOrder,
  createPayPayOrder,
  updateOrderShippingAddress,
} from "../apis/orderApis";
import { IOrder } from "./Interface/IOrder";
import { IAddress } from "./Interface/IUser";

interface IPayPal {
  order: IOrder;
  token: string;
  shippingAddress: IAddress;
}

const PayPal: React.FC<IPayPal> = ({ order, token, shippingAddress }) => {
  const [buttonRendered, setButtonRendered] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!buttonRendered) {
      // @ts-ignore
      paypal
        .Buttons({
          createOrder: async () => {
            const { data } = await createPayPayOrder(
              order._id,
              token,
              shippingAddress._id
            );
            const id = data.id;

            return id;
          },
          onApprove: async (data: any, actions: any) => {
            const { orderID: payPalOrderId } = data;
            const response = await approvePayPalOrder(
              payPalOrderId,
              order._id,
              token
            );
            if (response.data.status !== 201) {
              console.log("reject " + response.data.status);

              actions.reject();
            }
            history.push({
              pathname: "/orderSummary",
              state: { orderId: order._id, token },
            });
            console.log("success " + response.data.status);
          },
          onShippingChange: async (data: any, actions: any) => {
            const { orderID: payPalOrderId, shipping_address: address } = data;
            const {
              data: { addressUpdate },
            } = await updateOrderShippingAddress(
              payPalOrderId,
              order._id,
              token,
              address
            );
            if (!addressUpdate) {
              actions.reject();
            }
          },
          onError: (err: any) => {
            console.error(err);
          },
        })
        .render("#paypal");

      setButtonRendered(true);
    }
  }, [buttonRendered, history, order._id, shippingAddress._id, token]);

  return <div id="paypal"></div>;
};

export default PayPal;
