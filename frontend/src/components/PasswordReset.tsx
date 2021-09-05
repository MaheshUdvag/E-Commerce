import { TextField, Button, Typography } from "@material-ui/core";
import React from "react";
import FormContainer from "./FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { updateUser } from "../actions/userActions";

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

const PasswordReset = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = ({ email, name }: { email: string; name: string }) => {
    dispatch(updateUser(email, name));
  };

  const userInfo = useSelector((state: any) => {
    return state.userUpdate;
  });
  const { error } = userInfo;

  return (
    <>
      <FormContainer lg={12}>
        {error ? (
          <Alert severity="error" className={classes.alert}>
            {error.data.message}
          </Alert>
        ) : null}
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h4" className={classes.input}>
            RESET PASSWORD
          </Typography>
          <Field
            id="current-password-input"
            name="currentPassword"
            label="Current Password"
            type="password"
            autoComplete="on"
            component={renderInput}
            className={classes.input}
          />
          <Field
            id="new-password-input"
            name="newPassword"
            label="New Password"
            type="password"
            autoComplete="on"
            component={renderInput}
            className={classes.input}
          />
          <Field
            id="new-password--confirm-input"
            name="newPasswordConfirm"
            label="New Password Confirm"
            type="password"
            autoComplete="on"
            component={renderInput}
            className={classes.input}
          />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            className={classes.button}
          >
            Update
          </Button>
        </form>
      </FormContainer>
    </>
  );
};

const validate = (values: any) => {
  const errors: {
    newPassword: string;
    newPasswordConfirm: string;
    [key: string]: string;
  } = { newPasswordConfirm: "", newPassword: "" };
  const { newPassword, newPasswordConfirm } = values;
  const requiredFields = [
    "currentPassword",
    "newPassword",
    "newPasswordConfirm",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `${field[0].toUpperCase() + field.substr(1)} is Required`;
    }
  });

  if (newPassword && newPassword.length < 8) {
    errors.newPassword = "Password must have atleast 8 characters";
  }
  if (newPassword && newPasswordConfirm && newPassword !== newPasswordConfirm) {
    errors.newPasswordConfirm = "Passwords dont match";
  }

  return errors;
};

export default reduxForm({
  form: "passwordForm",
  validate,
})(PasswordReset);
