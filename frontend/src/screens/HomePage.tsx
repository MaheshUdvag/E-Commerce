import Carousel from "../components/carousel";
import ProductList from "../components/ProductList";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state:any) => {
    return state.productListReducer;
  });
  const { loading, products } = productList;
  console.log(loading);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Carousel />
      <ProductList products={products} title="latest products" page="home" />
    </>
  );
};

export default HomePage;
