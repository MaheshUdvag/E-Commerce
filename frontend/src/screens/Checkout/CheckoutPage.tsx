import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Switch, useHistory } from "react-router";
import { checkoutAddressAction } from "../../actions/checkoutActions";
import AddressBook from "../../components/AddressBook";
import AddressCard from "../../components/AddressCard";
import CartItems from "../../components/CartItems";
import { IAddress } from "../../components/Interface/IUser";
import OrderSummary from "../../components/OrderSummary";
import Payment from "../../components/Payment";
import useActiveOrder from "../../hooks/useActiveOrder";
import useUserLogin from "../../hooks/useUserLogin";
import useUserProfile from "../../hooks/useUserProfile";
import { CHECKOUT_CONSTANTS } from "./CheckoutConstants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  })
);

function getSteps() {
  return CHECKOUT_CONSTANTS.STEPS;
}

function getStepContent(
  step: number,
  user: any,
  selectedAddress: any,
  order: any,
  token: any
) {
  const shippingAddress = user?.address.filter(
    (addr: IAddress) => addr._id === selectedAddress
  )[0];

  switch (step) {
    case 0:
      return user?.address.length > 0 ? (
        <AddressBook
          address={user?.address}
          page="checkout"
          selectedAddress={selectedAddress ? selectedAddress : ""}
        />
      ) : (
        <AddressCard />
      );
    case 1:
      return order ? <CartItems order={order} page="summary" /> : <></>;
    case 2:
      return (
        <Payment
          order={order}
          token={token}
          shippingAddress={shippingAddress}
        />
      );
    default:
      return "Unknown step";
  }
}

const CheckoutPage: React.FC = () => {
  const { user } = useUserProfile();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const { _id: selectedAddress } = useSelector(
    (state: any) => state.checkoutAddress
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { order } = useActiveOrder();
  const steps = getSteps();
  const { CHECKOUT, BACK, NEXT } = CHECKOUT_CONSTANTS;
  const {
    user: { token },
  } = useUserLogin();
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    document.getElementById("root")?.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    document.getElementById("root")?.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!order) {
      history.push("/cart");
    }

    if (!selectedAddress && user?.address.length > 0) {
      const address = user?.address.filter(
        (addr: any) => addr.isPrimary === "1"
      )[0];
      if (address) {
        dispatch(checkoutAddressAction(address._id));
      }
    }
  }, [user, dispatch, selectedAddress, history, order]);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography
            variant="h4"
            style={{ borderBottom: "2px solid #f0f0f0" }}
          >
            {t(CHECKOUT)}
          </Typography>
        </Grid>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          <Switch>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <Typography variant="h6">{label}</Typography>
                  </StepLabel>
                  <StepContent className={classes.actionsContainer}>
                    {getStepContent(index, user, selectedAddress, order, token)}
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      {t(BACK)}
                    </Button>
                    {activeStep < steps.length - 1 && selectedAddress && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {t(NEXT)}
                      </Button>
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Switch>
        </Grid>
        {order && (
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <OrderSummary order={order} showCheckout={false} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
