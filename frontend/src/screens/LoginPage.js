import { Grid, Typography, TextField, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Field, reduxForm } from "redux-form";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

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
}) => {
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

const LoginPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = ({ email, password }) => {
    dispatch(loginUser(email, password));
  };

  const userInfo = useSelector((state) => {
    return state.userLogin;
  });
  const { user, error } = userInfo;

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
            Login
          </Button>
        </form>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="body1" component="p" className={classes.title}>
              New Customer? <Link to="/register">Sign Up</Link>
            </Typography>
          </Grid>
        </Grid>
      </FormContainer>
    </>
  );
};

const validate = (values) => {
  const errors = {};
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
