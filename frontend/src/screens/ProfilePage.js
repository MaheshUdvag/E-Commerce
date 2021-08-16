import { Grid, Typography, Container, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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

const ProfilePage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [content, setContent] = useState(null);
  const [selected, setSelected] = useState("Account");

  const userInfo = useSelector((state) => {
    return state.userLogin;
  });

  const userProfileInfo = useSelector((state) => {
    return state.userProfile;
  });

  const { user } = userInfo;
  const profile = userProfileInfo.user;

  const renderAccount = () => {
    if (profile) {
      setContent(<Account initialValues={profile} />);
      setSelected("Account");
    } else {
      setContent(null);
    }
  };

  const renderChangePassword = () => {
    if (profile) {
      setContent(<PasswordReset />);
      setSelected("Change Password");
    } else {
      setContent(null);
    }
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
    if (!profile) {
      dispatch(getUser());
    } else {
      setContent(<Account initialValues={profile} />);
      setSelected("Account");
    }
  }, [user, dispatch, history, profile]);

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
                selected === "Account" ? classes.buttonSelected : classes.button
              }
              onClick={renderAccount}
            >
              Account
            </Button>
            <Button
              startIcon={<VisibilityIcon />}
              fullWidth={true}
              size="large"
              className={
                selected === "Change Password"
                  ? classes.buttonSelected
                  : classes.button
              }
              onClick={renderChangePassword}
            >
              Change Password
            </Button>
            <Button
              startIcon={<ShoppingCartIcon />}
              fullWidth={true}
              className={
                selected === "Orders" ? classes.buttonSelected : classes.button
              }
              size="large"
            >
              Orders
            </Button>
            <Button
              startIcon={<MenuBookIcon />}
              fullWidth={true}
              size="large"
              className={
                selected === "Address Book"
                  ? classes.buttonSelected
                  : classes.button
              }
            >
              Address Book
            </Button>
            <Button
              startIcon={<ListAltIcon />}
              fullWidth={true}
              size="large"
              className={
                selected === "Wish List"
                  ? classes.buttonSelected
                  : classes.button
              }
            >
              Wish List
            </Button>
            <Button
              startIcon={<CardGiftcardIcon />}
              fullWidth={true}
              size="large"
              className={
                selected === "Gift Cards"
                  ? classes.buttonSelected
                  : classes.button
              }
            >
              Gift Cards
            </Button>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h4" component="h4" className={classes.title}>
              {selected.toUpperCase()}
            </Typography>
            {content}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
