import { makeStyles, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

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

  return (
    <TextField
      label="Search Products, Categories..."
      size="small"
      type="text"
      variant="filled"
      fullWidth
      autoComplete="true"
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
      className={classes.searchInput}
    />
  );
};

export default SearchBar;
