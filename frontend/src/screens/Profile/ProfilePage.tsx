import {
  Grid,
  Typography,
  Container,
  Button,
  Snackbar,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { getUser } from "../../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import Account from "../../components/Account";
import PasswordReset from "../../components/PasswordReset";
import AddressBook from "../../components/AddressBook";
import { PROFILE_PAGE_CONSTANTS } from "./ProfilePageConstants";
import { useTranslation } from "react-i18next";
import OrderList from "../../components/OrderList";
import { getPlacedOrders } from "../../actions/orderActions";
import { useState } from "react";
import OrderDetail from "../../components/OrderDetail";
import { IOrder } from "../../components/Interface/IOrder";
import { Alert } from "@material-ui/lab";
import FutureImplementation from "../../components/FutureImplementation";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "90%",
    margin: 10,
  },
  alert: {
    width: "80%",
    margin: 10,
  },
  button: {
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: "#232f3e",
      color: "#ffffff",
    },
  },
  buttonSelected: {
    justifyContent: "flex-start",
    backgroundColor: "#232f3e",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#232f3e",
      color: "#ffffff",
    },
  },
  title: {
    margin: 10,
  },
}));

const ProfilePage = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user: profile } = useSelector((state: any) => {
    return state.userProfile;
  });
  const { orders } = useSelector((state: any) => {
    return state.orders;
  });
  const pathName = props.history.location.pathname;

  const { MY_PROFILE, PROFILE_MENU } = PROFILE_PAGE_CONSTANTS;
  const { t } = useTranslation();
  const [orderDetail, setOrderDetail] = useState<IOrder>();
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    if (!profile) {
      dispatch(getUser());
    } else {
      dispatch(getPlacedOrders());
    }
    window.scrollTo(0, 0);
  }, [dispatch, history, profile]);

  const setOrderById = (orderId: Number) => {
    const order = orders?.filter(
      (order: IOrder) => order.orderId === orderId
    )[0];
    if (order) setOrderDetail(order);
    else {
      setOpen(true);
      history.push("/profile");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Grid container spacing={4} style={{ marginBottom: 50 }}>
          <Grid item lg={4} md={3} sm={12} xs={12}>
            <Typography variant="h4" component="h4" className={classes.title}>
              {t(MY_PROFILE)}
            </Typography>
            {PROFILE_MENU.map((profileMenuItem) => (
              <Button
                startIcon={<profileMenuItem.icon />}
                fullWidth={true}
                key={profileMenuItem.name}
                size="large"
                className={
                  pathName === profileMenuItem.path
                    ? classes.buttonSelected
                    : classes.button
                }
                onClick={() => history.push(profileMenuItem.path)}
              >
                {t(profileMenuItem.name)}
              </Button>
            ))}
          </Grid>
          <Grid item lg={8} md={9} sm={12} xs={12} style={{ padding: 10 }}>
            <Switch>
              <Route path="/profile" exact>
                <Account initialValues={profile} />
              </Route>
              <Route path="/profile/address">
                <AddressBook title="ADDRESS" address={profile?.address} />
              </Route>
              <Route path="/profile/change-password">
                <PasswordReset />
              </Route>
              <Route path="/profile/orders">
                <OrderList
                  orders={orders}
                  selectOrder={(order: IOrder) => {
                    setOrderDetail(order);
                    history.push(`/profile/order/${order.orderId}`);
                  }}
                />
              </Route>
              <Route path="/profile/order/:id">
                {orders ? (
                  <OrderDetail
                    order={orderDetail}
                    setOrderById={setOrderById}
                  />
                ) : (
                  <></>
                )}
              </Route>
              <Route path="/profile/wish-list">
                <FutureImplementation />
              </Route>
              <Route path="/profile/gift-cards">
                <FutureImplementation />
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Invalid order Id
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfilePage;
