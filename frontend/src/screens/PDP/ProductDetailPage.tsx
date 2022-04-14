import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
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
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  container: {
    paddingBottom: 30,
  },
  productImage: {
    position: "sticky",
    top: 120,
  },
  skeletonSpacing: {
    marginBottom: 15,
  },
  skeletonInfo: {
    marginBottom: 25,
  },
}));

const ProductDetailPage = (props: any) => {
  const path = props.match.params.name;
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:600px)");

  const classes = useStyles();

  const dispatch = useDispatch();
  const getProductDetail = useSelector((state: any) => {
    return state.productDetailByPathReducer;
  });
  const { product, loading }: { product: IProduct; loading: boolean } =
    getProductDetail;

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
      {product && Object.keys(product).length > 0 && !loading ? (
        <Container className={classes.container}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <div className={classes.productImage}>
                <Button onClick={() => history.goBack()}>Go Back</Button>
                <ProductImage image={image} alt={alt} />
                {!isMobile && <ProductButton product={product} />}
              </div>
            </Grid>
            <Grid item lg={8} md={6} sm={12} xs={12}>
              <ProductDetail product={product} description={description} />
            </Grid>
          </Grid>
        </Container>
      ) : !loading ? (
        <Error />
      ) : (
        <Container className={classes.container}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <div className={classes.productImage}>
                <Button onClick={() => history.goBack()}>Go Back</Button>
                <Skeleton
                  className={classes.skeletonSpacing}
                  variant="rect"
                  height={400}
                  width={250}
                />
                {!isMobile && (
                  <Skeleton
                    className={classes.skeletonSpacing}
                    variant="rect"
                    height={50}
                    width={250}
                  />
                )}
              </div>
            </Grid>
            <Grid item lg={8} md={6} sm={12} xs={12}>
              <Skeleton
                className={classes.skeletonInfo}
                variant="rect"
                height={50}
                width={550}
              />
              <Skeleton
                className={classes.skeletonSpacing}
                variant="rect"
                height={10}
                width={100}
              />
              <Skeleton
                className={classes.skeletonSpacing}
                variant="rect"
                height={10}
                width={100}
              />
              <Skeleton
                className={classes.skeletonSpacing}
                variant="rect"
                height={10}
                width={150}
              />
              <Skeleton
                className={classes.skeletonInfo}
                variant="rect"
                height={20}
                width={250}
              />
              <Skeleton
                className={classes.skeletonInfo}
                variant="rect"
                height={10}
                width={50}
              />
              <Skeleton
                className={classes.skeletonInfo}
                variant="rect"
                height={10}
                width={50}
              />
              <Skeleton
                className={classes.skeletonInfo}
                variant="rect"
                height={10}
                width={50}
              />
              <Skeleton
                className={classes.skeletonInfo}
                variant="rect"
                height={20}
                width={250}
              />
              <Skeleton
                className={classes.skeletonSpacing}
                variant="rect"
                height={10}
                width={550}
              />
              <Skeleton
                className={classes.skeletonSpacing}
                variant="rect"
                height={10}
                width={550}
              />
              <Skeleton
                className={classes.skeletonSpacing}
                variant="rect"
                height={10}
                width={550}
              />
              <Skeleton
                className={classes.skeletonSpacing}
                variant="rect"
                height={10}
                width={550}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProductDetailPage;
