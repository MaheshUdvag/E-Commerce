import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductsByCategory } from "../actions/productActions";
import ProductList from "../components/ProductList";

const CategoryPage = (props) => {
  const categoryId = props.location.state.category._id;
  const dispatch = useDispatch();
  const productListByCategory = useSelector((state) => {
    return state.productListByCategoryReducer;
  });
  const { products } = productListByCategory;
  const categoryImage =
    props.location.state.category.description[0].categoryImage;

  useEffect(() => {
    dispatch(listProductsByCategory(categoryId, 10));
  }, [categoryId, dispatch]);

  return (
    <ProductList
      products={products}
      title={props.location.state.category.name}
      categoryImage={categoryImage}
      page="category"
    />
  );
};

export default CategoryPage;
