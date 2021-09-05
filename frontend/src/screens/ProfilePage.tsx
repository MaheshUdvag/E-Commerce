import { Grid, Typography, Container, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { getUser } from "../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import Account from "../components/Account";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PasswordReset from "../components/PasswordReset";
import AddressBook from "../components/AddressBook";

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
  const pathName = props.history.location.pathname;

  useEffect(() => {
    if (!profile) {
      dispatch(getUser());
    }
  }, [dispatch, history, profile]);

  return (
    <>
      <Container>
        <Grid container spacing={4} style={{ minHeight: "55vh" }}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Typography variant="h4" component="h4" className={classes.title}>
              MY PROFILE
            </Typography>
            <Button
              startIcon={<AccountCircleIcon />}
              fullWidth={true}
              size="large"
              className={
                pathName === "/profile"
                  ? classes.buttonSelected
                  : classes.button
              }
              onClick={() => history.push("/profile")}
            >
              Account
            </Button>
            <Button
              startIcon={<VisibilityIcon />}
              fullWidth={true}
              size="large"
              className={
                pathName === "/profile/change-password"
                  ? classes.buttonSelected
                  : classes.button
              }
              onClick={() => history.push("/profile/change-password")}
            >
              Change Password
            </Button>
            <Button
              startIcon={<ShoppingCartIcon />}
              fullWidth={true}
              className={
                pathName === "/profile/orders"
                  ? classes.buttonSelected
                  : classes.button
              }
              size="large"
              onClick={() => history.push("/profile/orders")}
            >
              Orders
            </Button>
            <Button
              startIcon={<MenuBookIcon />}
              fullWidth={true}
              size="large"
              className={
                pathName === "/profile/address"
                  ? classes.buttonSelected
                  : classes.button
              }
              onClick={() => history.push("/profile/address")}
            >
              Address Book
            </Button>
            <Button
              startIcon={<ListAltIcon />}
              fullWidth={true}
              size="large"
              className={
                pathName === "/profile/wish-list"
                  ? classes.buttonSelected
                  : classes.button
              }
              onClick={() => history.push("/profile/wish-list")}
            >
              Wish List
            </Button>
            <Button
              startIcon={<CardGiftcardIcon />}
              fullWidth={true}
              size="large"
              className={
                pathName === "/profile/gift-cards"
                  ? classes.buttonSelected
                  : classes.button
              }
              onClick={() => history.push("/profile/gift-cards")}
            >
              Gift Cards
            </Button>
          </Grid>
          <Grid item lg={8} md={6} sm={12} xs={12}>
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
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
