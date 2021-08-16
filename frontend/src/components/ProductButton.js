import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAction, updateCart } from "../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    margin: 2,
  },
}));

const ProductButton = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const activeOrder = useSelector((state) => {
    return state.activeOrder;
  });
  const { order } = activeOrder;

  const [inCart, setInCart] = useState(false);

  const addToCart = () => {
    console.log(order);
    if (order && Object.keys(order).length > 0) {
      dispatch(updateCart(order._id, product._id, 1));
    } else {
      dispatch(createOrderAction(product._id, 1));
    }
  };

  useEffect(() => {
    if (order && Object.keys(order).length > 0) {
      const itemExists = order.orderItems.filter(
        (item) => item.product._id === product._id
      );
      if (itemExists.length > 0) {
        setInCart(true);
      }
    }
  }, [order]);

  const goToCart = () => {
    history.push("/cart");
  };

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        startIcon={<CartIcon />}
        onClick={inCart ? goToCart : addToCart}
      >
        {inCart ? "Go To Cart" : "Add to Cart"}
      </Button>

      <Button
        color="primary"
        variant="contained"
        className={classes.button}
        startIcon={<BookmarkIcon />}
      >
        Save to wish list
      </Button>
    </div>
  );
};

export default ProductButton;
