import React, { useEffect, useState } from "react";
import { Button, Grid, Snackbar, Typography } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { createOrderAction } from "../actions/orderActions";
import { IProduct } from "./Interface/IProduct";
import { IOrderItems } from "./Interface/IOrder";
import useActiveOrder from "../hooks/useActiveOrder";
import { guestUser } from "../actions/userActions";
import useUserLogin from "../hooks/useUserLogin";
import { Alert, Color } from "@material-ui/lab";
import { ACTIVE_ORDER_SUCCESS } from "../ActionTypes/order";
import { addUpdateItem, removeItem } from "../apis/orderApis";

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
  const { order, error } = useActiveOrder();
  const { user } = useUserLogin();
  const [inCart, setInCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState<Color | undefined>("success");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const showMessage = (message: any, type?: any) => {
    if (error) {
      setMessage(error);
    } else {
      setMessage(message);
    }
    setSeverity(type || "success");
    setOpen(true);
  };

  const addToCart = async () => {
    if (order && Object.keys(order).length > 0) {
      let quantity = 1;
      if (orderItem) {
        quantity += orderItem.quantity;
      }
      updateQuantity(order._id, product._id, quantity, user.token);
    } else {
      if (!user) {
        await dispatch(guestUser());
      }
      await dispatch(createOrderAction(product._id, 1));
    }
  };

  const updateQuantity = async (
    order: any,
    product: any,
    quantity: any,
    token: any
  ) => {
    let response;
    let emptyCart = false;
    if (quantity) {
      response = await addUpdateItem(order, product, quantity, token);
    } else {
      emptyCart = true;
      response = await removeItem(order, product, token);
    }

    if (response.status === 200 || response.status === 201) {
      showMessage("Updated cart successfully", "success");
      if (emptyCart) {
        dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: {} });
      } else {
        dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: response.data });
      }
    } else {
      showMessage("Error occured while updating cart", "error");
    }
  };

  const removeFromCart = async () => {
    if (orderItem) {
      let quantity = orderItem.quantity;
      quantity -= 1;
      if (quantity <= 0) {
        updateQuantity(order._id, product._id, 0, user.token);
      } else {
        updateQuantity(order._id, product._id, quantity, user.token);
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

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductButton;
