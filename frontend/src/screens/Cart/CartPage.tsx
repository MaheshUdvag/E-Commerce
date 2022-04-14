import { Container, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getActiveOrder } from "../../actions/orderActions";
import CartItems from "../../components/CartItems";
import EmptyCart from "../../components/EmptyCart";
import OrderSummary from "../../components/OrderSummary";
import useActiveOrder from "../../hooks/useActiveOrder";

const CartPage = () => {
  const dispatch = useDispatch();
  const { order, error } = useActiveOrder();

  useEffect(() => {
    if (!order) {
      dispatch(getActiveOrder());
    }
    window.scrollTo(0, 0);
  }, [dispatch, order]);

  return (
    <Container>
      {order && Object.keys(order).length > 0 && !error ? (
        <Grid container spacing={5}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography component="h4" variant="h4">
              Your Cart
            </Typography>
          </Grid>
          <Grid item lg={9} md={12} sm={12} xs={12}>
            <CartItems order={order} />
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <OrderSummary order={order} />
          </Grid>
        </Grid>
      ) : (
        <EmptyCart />
      )}
    </Container>
  );
};

export default CartPage;
