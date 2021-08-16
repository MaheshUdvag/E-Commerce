import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { Image } from "cloudinary-react";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeItemFromCart, updateCart } from "../actions/orderActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  cartItems: {
    [theme.breakpoints.up("sm")]: {
      boxShadow: "5px 10px 18px #888888",
      padding: 25,
      marginBottom: 50,
    },
  },
  cartItem: {
    borderTop: "2px solid #f0f0f0",
    padding: 15,
  },
  image: {
    height: "100px",
    [theme.breakpoints.down("sm")]: {
      height: "50px",
    },
    [theme.breakpoints.between(0, 300)]: {
      height: "35px",
    },
  },
  quantity: {
    width: 60,
    [theme.breakpoints.down("sm")]: {
      width: 50,
    },
  },
  button: {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
  },
  product: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
    },
    display: "block",
  },
}));
const CartItems = ({ order }) => {
  const classes = useStyles();
  const orderId = order._id;

  const dispatch = useDispatch();
  const removeItem = (productId) => {
    dispatch(removeItemFromCart(orderId, productId));
  };

  const updateProduct = (event) => {
    const numbers = /^[0-9]+$/;
    const quantity = event.target.value;
    if (quantity.match(numbers)) {
      if (quantity > 0) {
        dispatch(updateCart(orderId, event.target.id, event.target.value));
      } else {
        event.target.value = 1;
      }
    }
  };

  return (
    <div className={classes.cartItems}>
      <Typography variant="h5" component="h5">
        CART ({order.orderItems.length} ITEMS)
      </Typography>
      <br />
      <br />
      <Grid container spacing={5} className={classes.cartItem}>
        <Grid item lg={3} md={3} sm={4} xs={3}>
          <Typography variant="subtitle2" component="p">
            Product
          </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Typography variant="subtitle2" component="p">
            Quantity
          </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={2} xs={3}>
          <Typography variant="subtitle2" component="p">
            Price
          </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={3}>
          <Typography variant="subtitle2" component="p">
            Remove
          </Typography>
        </Grid>
      </Grid>
      {order
        ? order.orderItems.map((orderItem) => (
            <Grid
              key={orderItem._id}
              container
              spacing={5}
              className={classes.cartItem}
            >
              <Grid item lg={3} md={3} sm={4} xs={3}>
                <div className={classes.product}>
                  <Image
                    cloudName="dvvxjkifm"
                    style={{ height: 50, paddingRight: 10 }}
                    crop="scale"
                    src={orderItem.product.description[0].thumbnailImage}
                  ></Image>
                  <Typography variant="body2" component="p">
                    {orderItem.product.name.substring(0, 40)}...
                  </Typography>
                </div>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <TextField
                  size="small"
                  fullWidth={true}
                  id={orderItem.product._id}
                  type="text"
                  defaultValue={orderItem.quantity}
                  variant="outlined"
                  onChange={updateProduct}
                  error={orderItem.quantity > 10}
                  helperText={
                    orderItem.quantity > 10
                      ? "Maximum units allowed is 10"
                      : null
                  }
                  className={classes.quantity}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={2} xs={3}>
                <Typography variant="body2" component="p">
                  {orderItem.price.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={3}>
                <Button
                  color="primary"
                  id={orderItem.product._id}
                  variant="contained"
                  className={classes.button}
                  onClick={() => removeItem(orderItem.product._id)}
                >
                  <DeleteIcon />
                </Button>
              </Grid>
            </Grid>
          ))
        : null}
    </div>
  );
};

export default CartItems;
