import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Grid, useMediaQuery } from "@material-ui/core";
import ProductDetail from "../../components/ProductDetail";
import ProductImage from "../../components/ProductImage";
import { getProductDetailsByPath } from "../../actions/productActions";
import Error from "../../components/Error";
import { useHistory } from "react-router-dom";
import {
  IProduct,
  IProductDescription,
} from "../../components/Interface/IProduct";
import ProductButton from "../../components/ProductButton";

const ProductDetailPage = (props: any) => {
  const path = props.match.params.name;
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:600px)");

  const dispatch = useDispatch();
  const getProductDetail = useSelector((state: any) => {
    return state.productDetailByPathReducer;
  });
  const { product }: { product: IProduct } = getProductDetail;

  const description: IProductDescription | null =
    product && Object.keys(product).length !== 0
      ? product.description.filter((desc) => desc.language.languageId === -1)[0]
      : null;

  const image: string = description?.fullImage ? description.fullImage : "";
  const alt: string = product?.name ? product.name : "";

  useEffect(() => {
    dispatch(getProductDetailsByPath(path));
    window.scrollTo(0, 0);
  }, [path, dispatch]);

  return (
    <>
      {product && Object.keys(product).length > 0 ? (
        <Container style={{ paddingBottom: 30 }}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <div style={{ position: "sticky", top: 120 }}>
                <Button onClick={() => history.goBack()}>Go Back</Button>
                <ProductImage image={image} alt={alt} />
                {!isMobile && <ProductButton product={product} />}
              </div>
            </Grid>
            <Grid item lg={8} md={6} sm={6} xs={12}>
              <ProductDetail product={product} description={description} />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Error />
      )}
    </>
  );
};

export default ProductDetailPage;
