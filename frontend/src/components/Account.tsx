import { TextField, Button } from "@material-ui/core";
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
  console.log(meta);

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

const Account = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = ({ email, name }: any) => {
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
  console.log(values);
  const errors:{email: string,name:string,[key: string]: string} = { email: "",name:"" };
  const { email } = values;
  const requiredFields = ["email", "name"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `${field[0].toUpperCase() + field.substr(1)} is Required`;
    }
  });
  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export default reduxForm({
  form: "updateForm",
  validate,
  enableReinitialize: true,
})(Account);
