import React from "react";
import { Image } from "cloudinary-react";
import { makeStyles } from "@material-ui/core/styles";
import { IProductDescription } from "./Interface/IProduct";

const useStyles = makeStyles((theme) => ({
  productImage: {
    [theme.breakpoints.up("sm")]: {
      position: "sticky",
      top: 120,
    },
  },
  image: {
    width: "100%",
  },
}));

const ProductImage = ({
  description,
}: {
  description: IProductDescription;
}) => {
  const classes = useStyles();
  const image =
    description && Object.keys(description).length > 0
      ? description.fullImage
      : "";

  return (
    <div className={classes.productImage}>
      <Image
        src={image}
        cloudName="dvvxjkifm"
        height="400"
        className={classes.image}
        crop="scale"
      />
    </div>
  );
};

export default ProductImage;
