import {
  Button,
  makeStyles,
  Popper,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getProductSuggestions } from "../actions/categoryActions";
import { IProduct } from "./Interface/IProduct";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    backgroundColor: "white",
    width: "60%",
    maxHeight: "40px",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const SearchBar: React.FC<any> = ({ fullWidth = false }) => {
  const classes = useStyles();
  const [timer, setTimer] = useState<any>(0);
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { products } = useSelector((state: any) => {
    return state.searchSuggestions;
  });

  useEffect(() => {
    if (products) {
      setOpenSearchResult(true);
    } else {
      setOpenSearchResult(false);
    }
  }, [products]);

  const handleChange = (event: any) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        dispatch(getProductSuggestions(4, 1, event.target.value));
      }, 300)
    );
    setValue(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <TextField
        label="Search Products, Categories..."
        size="small"
        type="text"
        value={value}
        variant="filled"
        fullWidth={fullWidth}
        autoComplete="true"
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        className={classes.searchInput}
        onKeyPress={(event: any) => {
          if (event.key === "Enter" && value) {
            setValue("");
            setAnchorEl(null);
            setOpenSearchResult(false);
            history.push(`/search-results?term=${value}`);
          }
        }}
        onChange={handleChange}
      />
      <Popper
        open={openSearchResult}
        id="search-results"
        anchorEl={anchorEl}
        placement="bottom"
        transition
        style={{
          marginTop: 5,
          backgroundColor: "#232f3e",
          borderRadius: 5,
          zIndex: 10000,
          width: "65%",
        }}
      >
        {products ? (
          products.map((product: IProduct) => (
            <Button
              color="secondary"
              fullWidth={true}
              key={product._id}
              style={{ zIndex: 999 }}
              onClick={() => {
                setValue("");
                setAnchorEl(null);
                setOpenSearchResult(false);
                history.push(`/product/${product.path}`);
              }}
            >
              <Typography variant="body2">{product.name}</Typography>
            </Button>
          ))
        ) : (
          <></>
        )}
      </Popper>
    </>
  );
};

export default SearchBar;
