import { Card, CardContent, Typography, Button } from "@material-ui/core";
import React from "react";

import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { Image } from "cloudinary-react";

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

const Product = (props) => {
  const classes = useStyles();
  const description = props.product.description.filter((desc) => {
    return desc.language.languageId === -1;
  });
  return (
    <Card variant="outlined" className={classes.card}>
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
          variant={props.product.name.length > 90 ? "caption" : "body1"}
        >
          {props.product.name}
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
            $ {props.product.price.listPrice.toFixed(2)}
          </del>
          <span className={classes.price}>
            $ {props.product.price.offerPrice.toFixed(2)}
          </span>
        </Typography>
        <Button variant="outlined" className={classes.button}>
          Click to view product
        </Button>
      </CardContent>
    </Card>
  );
};

export default Product;
