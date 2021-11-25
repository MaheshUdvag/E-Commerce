import { TextField, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import FormContainer from "./FormContainer";
import { connect, useDispatch, useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { addAddress, updateAddress } from "../apis/userApis";
import { IAddress } from "./Interface/IUser";
import useUserLogin from "../hooks/useUserLogin";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../actions/userActions";
import useUserProfile from "../hooks/useUserProfile";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "95%",
    margin: 10,
  },
  alert: {
    width: "80%",
    margin: 10,
  },
  button: {
    margin: 10,
    width: "100%",
    padding: 10,
  },
  title: {
    margin: 10,
  },
}));

interface Validate {
  firstName: string;
  lastName: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  phone: string;
  [key: string]: string;
}

const renderInput = ({
  className,
  meta,
  input,
  label,
  type,
  required = false,
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
      required={required}
      variant="filled"
      autoComplete={autoComplete}
      className={className}
    />
  );
};

const Address = (props: any) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const [addressEdit, setAddressEdit] = useState<Boolean>(false);

  const {
    user: { token },
  } = useUserLogin();
  const { user } = useUserProfile();

  useEffect(() => {
    const initialValues = props.location.state
      ? props.location.state.initialValues
      : {};
    if (initialValues && Object.keys(initialValues).length > 0) {
      setAddressEdit(true);
    }
  }, [dispatch, props.location.state]);

  const onSubmit = async (address: IAddress) => {
    let data = { status: 404 };
    if (addressEdit === true) {
      const initialValues = props.location.state.initialValues;
      address.addressType = initialValues.addressType;
      address.isPrimary = initialValues.isPrimary;
      address._id = initialValues._id;
      data = await updateAddress(address, token);
    } else {
      address.addressType = "SB";
      address.isPrimary = "0";

      if (user.address.length === 0) {
        address.isPrimary = "1";
      }
      data = await addAddress(address, token);
    }

    if (data.status === 200) {
      dispatch(getUser());
      const path = props.location.state.redirect || "/profile/adderss";
      history.push(path);
    }
  };

  const userInfo = useSelector((state: any) => {
    return state.userUpdate;
  });
  const { error } = userInfo;

  return (
    <>
      <FormContainer
        justifyContent="center"
        alignItems="center"
        direction="column"
        lg={6}
        md={8}
        sm={12}
        xs={12}
      >
        {error ? (
          <Alert severity="error" className={classes.alert}>
            {error.data.message}
          </Alert>
        ) : null}
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Grid container spacing={0}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography className={classes.input} variant="h4">
                ADDRESS
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Field
                id="first-name-input"
                name="firstName"
                label="firstName"
                type="text"
                autoComplete="on"
                component={renderInput}
                className={classes.input}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Field
                id="last-name-input"
                name="lastName"
                label="lastName"
                type="text"
                required={true}
                autoComplete="on"
                component={renderInput}
                className={classes.input}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Field
                id="street1-input"
                name="street1"
                label="street1"
                type="text"
                autoComplete="on"
                required={true}
                component={renderInput}
                className={classes.input}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Field
                id="street2-input"
                name="street2"
                label="street2"
                type="text"
                autoComplete="on"
                component={renderInput}
                className={classes.input}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Field
                id="city-input"
                name="city"
                label="city"
                type="text"
                autoComplete="on"
                required={true}
                component={renderInput}
                className={classes.input}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Field
                id="state-input"
                name="state"
                label="state"
                type="text"
                autoComplete="on"
                required={true}
                component={renderInput}
                className={classes.input}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Field
                id="country-input"
                name="country"
                label="country"
                type="text"
                autoComplete="on"
                required={true}
                component={renderInput}
                className={classes.input}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Field
                id="zipcode-input"
                name="zipcode"
                label="zipcode"
                type="text"
                autoComplete="on"
                required={true}
                component={renderInput}
                className={classes.input}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Field
                id="phone-input"
                name="phone"
                label="phone"
                type="text"
                autoComplete="on"
                required={true}
                component={renderInput}
                className={classes.input}
              />
            </Grid>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              className={classes.button}
            >
              {addressEdit ? "Update" : "Create"}
            </Button>
          </Grid>
        </form>
      </FormContainer>
    </>
  );
};

const validate = (values: any) => {
  const errors: Validate = {
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  };

  const requiredFields = [
    "lastName",
    "street1",
    "city",
    "state",
    "country",
    "zipcode",
    "phone",
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `${field[0].toUpperCase() + field.substr(1)} is Required`;
    }
  });

  if (values.lastName && values.lastName.length < 3) {
    errors.lastName = "Name must have atleast 3 characters";
  }

  if (values.zipcode && values.zipcode.length < 5) {
    errors.zipcode = "Zipcode must have atleast 5 characters";
  }

  return errors;
};

const mapStateToProps = (state: any, props: any) => ({
  initialValues: props.location.state ? props.location.state.initialValues : {}, // retrieve name from redux store
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "addressForm",
    validate,
    enableReinitialize: true,
  })(Address)
);
