import { Container, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import AddressBook from "../components/AddressBook";
import useUserProfile from "../hooks/useUserProfile";
import CartPage from "./CartPage";

const CheckoutPage: React.FC = () => {
  const { user } = useUserProfile();
  const { _id: selectedAddress } = useSelector(
    (state: any) => state.checkoutAddress
  );

  return (
    <Container>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Switch>
            <Route path="/checkout" exact>
              <AddressBook
                title="ADDRESS SELECTION"
                address={user?.address}
                page="checkout"
                selectedAddress={selectedAddress}
              />
            </Route>
            <Route path="/checkout/summary" component={CartPage}></Route>
          </Switch>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
