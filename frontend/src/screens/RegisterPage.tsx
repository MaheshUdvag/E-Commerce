import { Grid, Typography, TextField, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { registerUser } from "../actions/userActions";
import useUserLogin from "../hooks/useUserLogin";

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

const RegisterPage = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    dispatch(registerUser(email, password, name));
  };

  const { user } = useUserLogin();

  const userRegisterInfo = useSelector((state: any) => {
    return state.userRegister;
  });
  const { error } = userRegisterInfo;

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

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
          SIGN IN
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
            id="name-input"
            name="name"
            label="Name"
            type="text"
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
          <Field
            id="password-confirm-input"
            name="confirmPassword"
            label="Confirm Password"
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
            Register
          </Button>
        </form>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1" component="p" className={classes.title}>
              Already a Customer? <Link to="/login">Sign In</Link>
            </Typography>
          </Grid>
        </Grid>
      </FormContainer>
    </>
  );
};

const validate = (values: any) => {
  const errors: {
    email: string;
    password: string;
    confirmPassword: string;
    [key: string]: string;
  } = { email: "", password: "", confirmPassword: "" };
  const { email, password, confirmPassword } = values;
  const requiredFields = ["email", "password", "name", "confirmPassword"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `${field[0].toUpperCase() + field.substr(1)} is Required`;
    }
  });
  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Invalid email address";
  }
  if (password && password.length < 8) {
    errors.password = "Password must have atleast 8 characters";
  }
  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = "Passwords dont match";
  }

  return errors;
};

export default reduxForm({
  form: "registerForm",
  validate,
})(RegisterPage);
