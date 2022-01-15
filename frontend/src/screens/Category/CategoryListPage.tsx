import React from "react";
import { useSelector } from "react-redux";
import CategoryList from "../../components/CategoryList";

const CategoryListPage = () => {
  const { loading: categoryLoad, categories } = useSelector((state: any) => {
    return state.categoryListReducer;
  });
  return (
    <>
      {categories && !categoryLoad && (
        <CategoryList categories={categories} label="All Categories" />
      )}
    </>
  );
};

export default CategoryListPage;
