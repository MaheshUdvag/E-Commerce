import { Grid, Typography, Container, Button } from "@material-ui/core";
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
  const { MY_PROFILE, PROFILE_MENU } = PROFILE_PAGE_CONSTANTS;
  const { t } = useTranslation();

  useEffect(() => {
    if (!profile) {
      dispatch(getUser());
    }
    window.scrollTo(0, 0);
  }, [dispatch, history, profile]);

  return (
    <>
      <Container>
        <Grid container spacing={4} style={{ minHeight: "55vh" }}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
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
