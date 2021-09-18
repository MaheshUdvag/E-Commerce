import { Grid, Typography, TextField, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../actions/userActions";
import FormContainer from "../../components/FormContainer";
import { Field, reduxForm } from "redux-form";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import useUserLogin from "../../hooks/useUserLogin";
import { useTranslation } from "react-i18next";
import { LOGIN_PAGE_CONSTANTS } from "./LoginPageConstants";

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
    margin: 10,
    width: "90%",
    padding: 10,
  },
  title: {
    margin: 10,
  },
}));

const renderInput = ({
  className,
  meta,
  input,
  label,
  type,
  autoComplete = "off",
}: any) => {
  return (
    <TextField
      error={meta.touched && meta.error !== undefined}
      label={label}
      helperText={meta.touched && meta.error}
      size="small"
      {...input}
      type={type}
      variant="filled"
      autoComplete={autoComplete}
      className={className}
    />
  );
};

const LoginPage = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { LOGIN, SIGN_UP, SIGN_IN, NEW_CUSTOMER } = LOGIN_PAGE_CONSTANTS;

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(loginUser(email, password));
    history.goBack();
  };

  const { error, authenticated } = useUserLogin();

  useEffect(() => {
    if (authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  return (
    <>
      <FormContainer
        justifyContent="center"
        alignItems="center"
        direction="column"
        lg={3}
        md={3}
        sm={5}
        xs={12}
      >
        <Typography variant="h4" component="h4" className={classes.title}>
          {t(SIGN_IN)}
        </Typography>
        {error ? (
          <Alert severity="error" className={classes.alert}>
            {error.data.message}
          </Alert>
        ) : null}
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Field
            id="email-input"
            name="email"
            label="Email Address"
            type="email"
            autoComplete="on"
            component={renderInput}
            className={classes.input}
          />
          <Field
            id="password-input"
            name="password"
            label="Password"
            type="password"
            component={renderInput}
            className={classes.input}
          />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            className={classes.button}
          >
            {t(LOGIN)}
          </Button>
        </form>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1" component="p" className={classes.title}>
              {t(NEW_CUSTOMER)} <Link to="/register">{t(SIGN_UP)}</Link>
            </Typography>
          </Grid>
        </Grid>
      </FormContainer>
    </>
  );
};

const validate = (values: any) => {
  const errors: { email: string; password: string; [key: string]: string } = {
    email: "",
    password: "",
  };
  const requiredFields = ["email", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `${field[0].toUpperCase() + field.substr(1)} is Required`;
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export default reduxForm({
  form: "loginForm",
  validate,
})(LoginPage);
