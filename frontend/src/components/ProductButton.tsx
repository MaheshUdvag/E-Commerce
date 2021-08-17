import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrderAction, updateCart } from "../actions/orderActions";
import { IProduct } from "./Interface/IProduct";
import { IOrderItems } from "./Interface/IOrder";
import useActiveOrder from "../hooks/useActiveOrder";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    margin: 2,
  },
}));

const ProductButton = ({ product }: { product: IProduct }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { order } = useActiveOrder();

  const [inCart, setInCart] = useState(false);

  const addToCart = () => {
    if (order && Object.keys(order).length > 0) {
      dispatch(updateCart(order._id, product._id, 1));
    } else {
      dispatch(createOrderAction(product._id, 1));
    }
  };

  useEffect(() => {
    if (order && Object.keys(order).length > 0) {
      const itemExists = order.orderItems.filter(
        (item: IOrderItems) => item.product._id === product._id
      );
      if (itemExists.length > 0) {
        setInCart(true);
      }
    }
  }, [order, product._id]);

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
