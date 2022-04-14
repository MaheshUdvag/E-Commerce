import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, Grid, TextField } from "@material-ui/core";
import Product from "./Product";
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
    width: "100%",
    height: 300,
    imageRendering: "pixelated",
    marginBottom: 15,
  },
  sort: {
    [theme.breakpoints.up("sm")]: {
      float: "right",
    },
    margin: "0px 0px 20px 20px",
  },
}));

const options = [
  {
    value: 1,
    label: "Relevance",
  },
  {
    value: 2,
    label: "Price (low - high)",
  },
  {
    value: 3,
    label: "Price (high - low)",
  },
  {
    value: 4,
    label: "Name",
  },
];

const ProductList = (props: any) => {
  const classes = useStyles();
  const products = props.products;
  const loading = props.loading;
  const page = props.page;

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
            variant="h5"
            className={
              page === "category" ? classes.categoryTitle : classes.title
            }
          >
            {props.title.toUpperCase()}
          </Typography>

          {products.length === 0 && (
            <Typography variant="body2" className={classes.title}>
              No Search results were found
            </Typography>
          )}

          {page === "category" || page === "search" ? (
            <TextField
              id="outlined-select-sortOptions-native"
              select
              label="Sort By"
              value={props.sortOptions}
              onChange={props.handleSortChange}
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

          <Grid container alignItems="center" spacing={3}>
            {products ? (
              products.map((product: IProduct) => {
                return (
                  <Grid key={product._id} item xs={12} sm={6} lg={3} md={4}>
                    <Product product={product} />
                  </Grid>
                );
              })
            ) : (
              <Typography
                variant="h5"
                className={
                  page === "category" ? classes.categoryTitle : classes.title
                }
              >
                No Results
              </Typography>
            )}
          </Grid>
        </Container>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductList;
