import { Grid, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProductButton from "./ProductButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  price: {
    fontWeight: "bold",
    fontSize: "x-large",
    marginLeft: 2,
  },
  reviews: {
    fontSize: "small",
  },
  listPrice: {
    fontSize: "small",
    marginLeft: 5,
  },
  contentBody: {
    padding: 5,
  },
  content: {
    padding: 5,
    marginTop: 10,
  },
  title: {
    borderBottom: "2px solid #f0f0f0",
    padding: 5,
  },
}));

const ProductDetail = (props) => {
  const classes = useStyles();
  const product = props.product;
  const description = props.description;
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <Typography variant="h5">{product.name}</Typography>
      <div>
        <Typography variant="subtitle2" className={classes.reviews}>
          10000 Reviews | 200 comments
        </Typography>
        <Rating
          size="small"
          name="read-only"
          defaultValue={3.5}
          precision={0.5}
          readOnly
        />

        <Typography variant="body2">
          Price:{" "}
          <span className={classes.price}>
            ${product.price.offerPrice.toFixed(2)}
          </span>
          <del className={classes.listPrice}>
            ${product.price.listPrice.toFixed(2)}
          </del>
        </Typography>
      </div>

      {isMobile ? <ProductButton product={product} /> : null}

      {product.attributes.length > 0 ? (
        <div className={classes.content}>
          <Typography variant="h6" className={classes.title}>
            Key Specs
          </Typography>

          {product.attributes.map((attribute) => (
            <Grid
              key={attribute._id}
              container
              spacing={3}
              className={classes.contentBody}
            >
              <Grid item lg={3} md={4} sm={6} xs={6}>
                <Typography
                  className={classes.contentBody}
                  variant="subtitle2"
                  component="p"
                >
                  {attribute.name}
                </Typography>
              </Grid>
              <Grid item lg={3} md={4} sm={6} xs={6}>
                <Typography variant="subtitle2" component="p">
                  {attribute.value}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </div>
      ) : null}

      <div className={classes.content}>
        <Typography variant="h6" className={classes.title}>
          Description
        </Typography>
        <Typography variant="body2" className={classes.contentBody}>
          {description.longDescription}
        </Typography>
      </div>
    </>
  );
};

export default ProductDetail;
