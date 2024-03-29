import { Card, CardContent, Typography, Button } from "@material-ui/core";
import React from "react";

import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";
import { useHistory } from "react-router-dom";
import { IProduct } from "./Interface/IProduct";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 250,
    maxHeight: 600,
    height: 450,
    cursor: "pointer",
    "&:hover": {
      boxShadow: "5px 10px 18px #888888",
    },
    position: "relative",
  },
  price: {
    padding: theme.spacing(1),
    fontWeight: "bold",
  },
  reviews: {
    fontSize: "small",
  },
  listPrice: {
    fontSize: "small",
  },
  button: {
    position: "absolute",
    bottom: 10,
  },
}));

const Product = ({ product }: { product: IProduct }) => {
  const history = useHistory();
  const classes = useStyles();
  const description = product.description.filter((desc) => {
    return desc.language.languageId === -1;
  });
  return (
    <Card
      variant="outlined"
      className={classes.card}
      onClick={() => history.push(`/product/${product.path}`)}
    >
      <Image
        src={description[0].thumbnailImage}
        cloudName="dvvxjkifm"
        width="200"
        height="200"
        crop="scale"
      />

      <CardContent>
        <Typography
          component="p"
          variant={product.name.length > 90 ? "caption" : "body1"}
        >
          {product.name}
        </Typography>
        <Typography>
          <Rating
            size="small"
            name="read-only"
            defaultValue={3.5}
            precision={0.5}
            readOnly
          />
        </Typography>
        <p className={classes.reviews}>10 Reviews</p>
        <Typography variant="h6">
          <del className={classes.listPrice}>
            $ {product.price.listPrice.toFixed(2)}
          </del>
          <span className={classes.price}>
            $ {product.price.offerPrice.toFixed(2)}
          </span>
        </Typography>
        <Button variant="outlined" size="small" className={classes.button}>
          Click to view product
        </Button>
      </CardContent>
    </Card>
  );
};

export default Product;
