import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { IAddress } from "./Interface/IUser";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";
import { deleteAddress, setDefaultAddress } from "../apis/userApis";
import useUserLogin from "../hooks/useUserLogin";
import { useDispatch } from "react-redux";
import { getUser } from "../actions/userActions";
import { checkoutAddressAction } from "../actions/checkoutActions";

interface Props {
  address?: IAddress;
  page?: string;
  selected?: Boolean;
}

const useStyles = makeStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.warning.main,
    width: "fit-content",
    padding: 2,
    borderRadius: 5,
  },
  button: { margin: 3 },
  paper: {
    [theme.breakpoints.up("md")]: {
      height: "22vh",
    },

    padding: 15,
  },
  paperSelected: {
    [theme.breakpoints.up("md")]: {
      height: "22vh",
    },
    border: "3px solid #232f3e",
    padding: 15,
  },
}));

const AddressCard: React.FC<Props> = ({
  address,
  page,
  selected = false,
}: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    user: { token },
  } = useUserLogin();

  const editAddress = (address: IAddress) => {
    history.push({
      pathname: "/update-address",
      state: {
        initialValues: address,
        redirect: "/checkout",
      },
    });
  };

  const deleteSelectedAddress = async (_id: string) => {
    const { status } = await deleteAddress(_id, token);

    if (status === 200) {
      dispatch(getUser());
    }
  };

  const addAddress = () => {
    history.push({
      pathname: "/add-address",
      state: {
        redirect: "/checkout",
      },
    });
  };

  const makeDefault = async (_id: string) => {
    const { status } = await setDefaultAddress(_id, token);

    if (status === 200) {
      dispatch(getUser());
    }
  };

  const setCheckoutAddress = (_id?: string, page?: string) => {
    if (_id && page === "checkout") {
      dispatch(checkoutAddressAction(_id));
    }
  };

  return (
    <Paper
      elevation={3}
      className={selected ? classes.paperSelected : classes.paper}
      onClick={() => setCheckoutAddress(address?._id, page)}
    >
      {address ? (
        <>
          {address?.isPrimary === "1" && (
            <Typography className={classes.badge} variant="subtitle2">
              Default Address
            </Typography>
          )}
          <Typography variant="h6">
            {address?.firstName
              ? address?.firstName + " " + address?.lastName
              : address?.lastName}
          </Typography>
          <Typography variant="subtitle2">
            {address?.street1}
            {address?.street2 && ", " + address?.street2}
          </Typography>
          <Typography variant="subtitle2">
            {address?.area}
            {address?.city && ", " + address?.city}
          </Typography>
          <Typography variant="subtitle2">
            {address?.state}
            {address?.country && ", " + address?.country}
          </Typography>
          <Typography variant="subtitle2">{address?.zipcode}</Typography>
          <Typography variant="subtitle2">{address?.phone}</Typography>
          {page !== "payment" && (
            <>
              <Button
                size="small"
                color="primary"
                className={classes.button}
                variant="contained"
                onClick={() => editAddress(address)}
              >
                Edit
              </Button>
              {address?.isPrimary !== "1" && page !== "checkout" && (
                <>
                  <Button
                    size="small"
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => deleteSelectedAddress(address._id)}
                  >
                    Delete
                  </Button>

                  <Button
                    size="small"
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={() => makeDefault(address._id)}
                  >
                    Make Default
                  </Button>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ height: "20vh" }}
        >
          <Grid item>
            <Typography>
              <Button
                variant="contained"
                onClick={addAddress}
                endIcon={<AddIcon />}
              >
                Add new Address
              </Button>
            </Typography>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default AddressCard;
