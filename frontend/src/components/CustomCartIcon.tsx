import React from "react";
import CartIcon from "@material-ui/icons/ShoppingCart";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  itemCount: {
    fontSize: 9,
    position: "absolute",
    width: 12,
    left: 15,
    textAlign: "center",
    borderRadius: "50%",
    padding: 2,
    fontWeight: "bolder",
    color: "white",
    border: "1px solid white",
    backgroundColor: "red",
  },
  cartIcon: {
    marginTop: 12,
  },
}));

interface ICustomCartIcon {
  count: number;
}

const CustomCartIcon: React.FC<ICustomCartIcon> = ({ count }) => {
  const classes = useStyles();

  return (
    <span style={{ position: "relative", paddingRight: 5 }}>
      <CartIcon className={classes.cartIcon} />
      {count > 0 && <span className={classes.itemCount}>{count}</span>}
    </span>
  );
};

export default CustomCartIcon;
