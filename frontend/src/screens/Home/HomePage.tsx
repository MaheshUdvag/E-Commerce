import MyCarousel from "../../components/MyCarousel";
import ProductList from "../../components/ProductList";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { HOME_PAGE_CONSTANTS } from "./HomePageConstants";
import { useTranslation } from "react-i18next";
import CategoryList from "../../components/CategoryList";
import HomePageSkeleton from "../../components/Skeletons/HomePageSkeleton";

const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: any) => {
    return state.productListReducer;
  });
  const categoryList = useSelector((state: any) => {
    return state.categoryListReducer;
  });
  const { loading, products } = productList;
  const { loading: categoryLoad, categories } = categoryList;

  const { t } = useTranslation();
  const { LATEST_PRODUCTS, PAGE } = HOME_PAGE_CONSTANTS;

  useEffect(() => {
    dispatch(listProducts());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <>
      {!categoryLoad && !loading ? (
        <>
          <MyCarousel />
          {categories && !categoryLoad && (
            <CategoryList categories={categories} label="Top Categories" />
          )}
          <ProductList
            products={products}
            loading={loading}
            title={t(LATEST_PRODUCTS)}
            page={t(PAGE)}
          />
        </>
      ) : (
        <HomePageSkeleton type="default" />
      )}
    </>
  );
};

export default HomePage;
