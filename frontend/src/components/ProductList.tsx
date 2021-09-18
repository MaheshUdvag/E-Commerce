import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid, TextField } from "@material-ui/core";
import Product from "./Product";
import Error from "./Error";
import { IProduct } from "./Interface/IProduct";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "90%",
    padding: 20,
  },
  categoryTitle: {
    paddingBottom: 16,

    float: "left",
  },
  title: {
    paddingBottom: 16,
  },
  error: {
    padding: 30,
  },
  categoryImage: {
    display: "block",
    width: "68vw",
    height: 300,
    imageRendering: "pixelated",
    marginBottom: 15,
  },
  sort: {
    [theme.breakpoints.up("sm")]: {
      float: "right",
    },
    marginBottom: 20,
  },
}));

const options = [
  {
    value: "0",
    label: "Relevance",
  },
  {
    value: "1",
    label: "Price (low - high)",
  },
  {
    value: "2",
    label: "Price (high - low)",
  },
  {
    value: "4",
    label: "Name",
  },
];

const ProductList = (props: any) => {
  const classes = useStyles();
  const products = props.products;
  const loading = props.loading;
  const page = props.page;
  const [sortOptions, setSortOptions] = React.useState("EUR");

  const handleChange = (event: any) => {
    setSortOptions(event.target.value);
  };

  return (
    <div>
      {products && !loading ? (
        <Container className={classes.container}>
          {page === "category" ? (
            <img
              className={classes.categoryImage}
              alt="category"
              src={props.categoryImage}
            />
          ) : null}
          <Typography
            variant="h4"
            className={
              page === "category" ? classes.categoryTitle : classes.title
            }
          >
            {props.title.toUpperCase()}
          </Typography>
          {page === "category" ? (
            <TextField
              id="outlined-select-sortOptions-native"
              select
              label="Sort By"
              value={sortOptions}
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Please select your sort order"
              variant="outlined"
              className={classes.sort}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          ) : null}

          <Grid container alignItems="center" spacing={6}>
            {products
              ? products.map((product: IProduct) => {
                  return (
                    <Grid key={product._id} item xs={12} sm={5} lg={3} md={4}>
                      <Product product={product} />
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Container>
      ) : !loading ? (
        <Error />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductList;
