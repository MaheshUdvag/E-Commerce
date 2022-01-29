import { makeStyles } from "@material-ui/styles";
import React from "react";
import ReactImageMagnify from "react-image-magnify";

interface IProductImage {
  image: string;
  alt: string;
}

const useStyles = makeStyles((theme) => ({
  image: {
    maxHeight: 500,
  },
}));

const ProductImage: React.FC<IProductImage> = ({ image, alt }) => {
  const classes = useStyles();

  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          alt,
          isFluidWidth: true,
          src: image,
        },
        largeImage: {
          src: image,
          width: 1200,
          height: 1800,
        },
        enlargedImageContainerDimensions: {
          width: "60%",
          height: "100%",
        },
        imageClassName: classes.image,
      }}
    />
  );
};

export default ProductImage;
