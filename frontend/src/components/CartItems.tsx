import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  Snackbar,
} from "@material-ui/core";
import { Image } from "cloudinary-react";
import DeleteIcon from "@material-ui/icons/Delete";
import { getActiveOrder, updateCart } from "../actions/orderActions";
import { useDispatch } from "react-redux";
import { IOrder } from "./Interface/IOrder";
import { useHistory } from "react-router";
import useUserLogin from "../hooks/useUserLogin";
import { addUpdateItem, removeItem } from "../apis/orderApis";
import { Alert, Color } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  cartItems: {
    [theme.breakpoints.up("sm")]: {
      boxShadow: "5px 10px 18px #888888",
    },
    [theme.breakpoints.up(350)]: {
      padding: 25,
      border: "2px solid #f0f0f0",
      marginBottom: 50,
    },
  },
  cartItem: {
    borderTop: "2px solid #f0f0f0",
    padding: 15,
    [theme.breakpoints.down(350)]: {
      padding: 5,
    },
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
    "&:hover": {
      "text-decoration": "underline",
    },
    cursor: "pointer",
  },
}));
const CartItems = ({ order, page }: { order: IOrder; page?: string }) => {
  const classes = useStyles();
  const orderId = order._id;
  const [errors, setErrors] = useState<string[]>([]);
  const {
    user: { token },
  } = useUserLogin();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [severity, setSeverity] = useState<Color | undefined>("success");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const updateProduct = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    currentQuantity: number
  ) => {
    const numbers = /^[0-9]+$/;
    const targetValue = event.target.value;
    if (targetValue.match(numbers)) {
      const quantity: number = parseInt(targetValue);
      if (quantity > 0 && quantity <= 10) {
        updateQuantity(orderId, event.target.id, quantity);
        const displayError = errors.filter(
          (error) => error !== event.target.id
        );
        setErrors(displayError);
      } else if (quantity <= 0) {
        const displayError = errors.filter(
          (error) => error !== event.target.id
        );
        setErrors(displayError);
      } else {
        setErrors([...errors, event.target.id]);
      }
    } else {
      // event.target.value = currentQuantity.toString();
      // setErrors([...errors, event.target.id]);
    }
  };

  const showMessage = (message: any, type?: any) => {
    // if (error) {
    //   setMessage(error);
    // } else {
    setMessage(message);
    // }
    setSeverity(type || "success");
    setOpen(true);
  };

  const updateQuantity = async (order: any, product: any, quantity: any) => {
    let response;
    let remove = false;
    if (quantity) {
      response = await addUpdateItem(order, product, quantity, token);
    } else {
      remove = true;
      response = await removeItem(order, product, token);
    }

    if (response?.status === 200 || response?.status === 201) {
      showMessage("Updated cart successfully", "success");
      if (remove) {
        dispatch(getActiveOrder());
      } else {
        dispatch(updateCart(response.data));
      }
    } else {
      showMessage("Error occured while updating cart", "error");
    }
  };

  const history = useHistory();

  const gridSpacing = page === "summary" ? 4 : 3;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={classes.cartItems}>
      <Typography
        variant={isMobile ? "body1" : "h5"}
        component={isMobile ? "p" : "h5"}
      >
        CART ({order.orderItems.length} ITEMS)
      </Typography>
      <br />
      <br />
      <Grid container spacing={5} className={classes.cartItem}>
        <Grid
          item
          lg={gridSpacing}
          md={gridSpacing}
          sm={gridSpacing}
          xs={gridSpacing}
        >
          <Typography variant="subtitle2" component="p">
            Product
          </Typography>
        </Grid>
        <Grid
          item
          lg={gridSpacing}
          md={gridSpacing}
          sm={gridSpacing}
          xs={gridSpacing}
        >
          <Typography variant="subtitle2" component="p">
            Quantity
          </Typography>
        </Grid>
        <Grid item lg={gridSpacing} md={gridSpacing} sm={2} xs={gridSpacing}>
          <Typography variant="subtitle2" component="p">
            Price
          </Typography>
        </Grid>

        {page !== "summary" && (
          <Grid
            item
            lg={gridSpacing}
            md={gridSpacing}
            sm={gridSpacing}
            xs={gridSpacing}
          >
            <Typography variant="subtitle2" component="p">
              Remove
            </Typography>
          </Grid>
        )}
      </Grid>
      {order
        ? order.orderItems.map((orderItem: any) => (
            <Grid
              key={orderItem._id}
              container
              spacing={5}
              className={classes.cartItem}
            >
              <Grid
                item
                lg={gridSpacing}
                md={gridSpacing}
                sm={gridSpacing}
                xs={gridSpacing}
              >
                <div
                  className={classes.product}
                  onClick={() =>
                    history.push(`product/${orderItem.product.path}`)
                  }
                >
                  <Image
                    cloudName="dvvxjkifm"
                    style={{ height: 50, paddingRight: 10 }}
                    crop="scale"
                    src={orderItem.product.description[0].thumbnailImage}
                  ></Image>
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.product}
                  >
                    {orderItem.product.name.substring(0, 40)}...
                  </Typography>
                </div>
              </Grid>
              <Grid
                item
                lg={gridSpacing}
                md={gridSpacing}
                sm={gridSpacing}
                xs={gridSpacing}
              >
                <TextField
                  size="small"
                  fullWidth={true}
                  id={orderItem.product._id}
                  type="text"
                  defaultValue={orderItem.quantity}
                  variant="outlined"
                  disabled={page === "summary"}
                  onChange={(event) => updateProduct(event, orderItem.quantity)}
                  error={errors.includes(orderItem.product._id)}
                  helperText={
                    errors.includes(orderItem.product._id)
                      ? "Maximum units allowed is 10"
                      : null
                  }
                  className={classes.quantity}
                />
              </Grid>
              <Grid
                item
                lg={gridSpacing}
                md={gridSpacing}
                sm={2}
                xs={gridSpacing}
              >
                <Typography variant="body2" component="p">
                  {orderItem.price.toFixed(2)}
                </Typography>
              </Grid>

              {page !== "summary" && (
                <Grid
                  item
                  lg={gridSpacing}
                  md={gridSpacing}
                  sm={gridSpacing}
                  xs={gridSpacing}
                >
                  <Button
                    color="primary"
                    id={orderItem.product._id}
                    variant="contained"
                    className={classes.button}
                    onClick={() =>
                      updateQuantity(order._id, orderItem.product._id, 0)
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </Grid>
              )}
            </Grid>
          ))
        : null}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CartItems;
