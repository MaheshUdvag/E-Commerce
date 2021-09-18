import React, { useEffect, useState } from "react";
import { Button, Grid, Snackbar, Typography } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {
  createOrderAction,
  removeItemFromCart,
  updateCart,
} from "../actions/orderActions";
import { IProduct } from "./Interface/IProduct";
import { IOrderItems } from "./Interface/IOrder";
import useActiveOrder from "../hooks/useActiveOrder";
import { guestUser } from "../actions/userActions";
import useUserLogin from "../hooks/useUserLogin";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    margin: 2,
  },
  quantity: {
    justifyContent: "center",
    display: "flex",
  },
}));

const ProductButton = ({ product }: { product: IProduct }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [orderItem, setOrderItem] = useState<IOrderItems | null>();
  const { order } = useActiveOrder();
  const { user } = useUserLogin();
  const [inCart, setInCart] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const addToCart = async () => {
    if (order && Object.keys(order).length > 0) {
      let quantity = 1;
      if (orderItem) {
        quantity += orderItem.quantity;
      }
      await dispatch(updateCart(order._id, product._id, quantity));
      handleClick();
    } else {
      if (!user) {
        await dispatch(guestUser());
      }
      await dispatch(createOrderAction(product._id, 1));
    }
  };

  const removeFromCart = async () => {
    if (orderItem) {
      let quantity = orderItem.quantity;
      quantity -= 1;
      if (quantity <= 0) {
        dispatch(removeItemFromCart(order._id, product._id));
      } else {
        dispatch(updateCart(order._id, product._id, quantity));
      }
    }
  };

  useEffect(() => {
    if (order && Object.keys(order).length > 0) {
      const itemExists = order.orderItems.filter(
        (item: IOrderItems) => item.product._id === product._id
      );
      if (itemExists.length > 0) {
        setOrderItem(itemExists[0]);
        setInCart(true);
      }
    } else {
      setOrderItem(null);
      setInCart(false);
    }
  }, [order, product._id]);

  return (
    <div>
      {inCart ? (
        <Grid container>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={removeFromCart}
            >
              -
            </Button>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <Typography className={classes.quantity}>
              {orderItem?.quantity}
            </Typography>
          </Grid>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={addToCart}
            >
              +
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          startIcon={<CartIcon />}
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      )}

      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        startIcon={<BookmarkIcon />}
      >
        Save to wish list
      </Button>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductButton;
