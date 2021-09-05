import { Container, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getActiveOrder } from "../actions/orderActions";
import CartItems from "../components/CartItems";
import Error from "../components/Error";
import OrderSummary from "../components/OrderSummary";
import useActiveOrder from "../hooks/useActiveOrder";
import useUserLogin from "../hooks/useUserLogin";

const CartPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { user } = useUserLogin();
  const { order, error } = useActiveOrder();

  useEffect(() => {
    if ((user && Object.keys(user).length === 0) || user === undefined) {
      history.push("/");
    } else {
      dispatch(getActiveOrder());
    }
  }, [user, history, dispatch]);

  return (
    <Container>
      {order && Object.keys(order).length > 0 && !error ? (
        <Grid container spacing={5}>
          <Grid item lg={9} md={12} sm={12} xs={12}>
            <CartItems order={order} />
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <OrderSummary order={order} />
          </Grid>
        </Grid>
      ) : (
        <Error />
      )}
    </Container>
  );
};

export default CartPage;
