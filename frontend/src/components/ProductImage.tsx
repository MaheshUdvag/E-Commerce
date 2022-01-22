import React from "react";
import ReactImageMagnify from "react-image-magnify";

interface IProductImage {
  image: string;
  alt: string;
}

const ProductImage: React.FC<IProductImage> = ({ image, alt }) => {
  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: alt,
          isFluidWidth: false,
          src: image,
          width: 300,
          height: 400,
        },
        largeImage: {
          src: image,
          width: 1200,
          height: 1800,
        },
      }}
    />
  );
};

export default ProductImage;
