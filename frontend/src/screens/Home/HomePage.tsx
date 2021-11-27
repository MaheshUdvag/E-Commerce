import MyCarousel from "../../components/MyCarousel";
import ProductList from "../../components/ProductList";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { HOME_PAGE_CONSTANTS } from "./HomePageConstants";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: any) => {
    return state.productListReducer;
  });
  const { loading, products } = productList;
  const { t } = useTranslation();
  const { LATEST_PRODUCTS, PAGE } = HOME_PAGE_CONSTANTS;

  useEffect(() => {
    dispatch(listProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <>
      <MyCarousel />
      <ProductList
        products={products}
        loading={loading}
        title={t(LATEST_PRODUCTS)}
        page={t(PAGE)}
      />
    </>
  );
};

export default HomePage;
