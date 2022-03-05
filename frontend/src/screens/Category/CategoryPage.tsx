import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductsByCategory } from "../../actions/productActions";
import Error from "../../components/Error";
import PageSkeleton from "../../components/PageSkeleton";
import ProductList from "../../components/ProductList";

const CategoryPage = (props: any) => {
  const categoryPath = props.match.params.name;
  const dispatch = useDispatch();
  const productListByCategory = useSelector((state: any) => {
    return state.productListByCategoryReducer;
  });
  const { category, loading } = productListByCategory;

  const [sortOptions, setSortOptions] = React.useState(1);

  const handleSortChange = (event: any) => {
    setSortOptions(event.target.value);
    dispatch(listProductsByCategory(categoryPath, 10, event.target.value));
  };

  useEffect(() => {
    dispatch(listProductsByCategory(categoryPath, 10, 1));
    setSortOptions(1);
    window.scrollTo(0, 0);
  }, [categoryPath, dispatch]);

  return (
    <>
      {category && Object.keys(category).length > 0 ? (
        <ProductList
          products={category.products}
          title={category.name}
          loading={loading}
          categoryImage={category.description[0].categoryImage}
          page="category"
          sortOptions={sortOptions}
          handleSortChange={handleSortChange}
        />
      ) : (
        <PageSkeleton />
      )}
      {!category && !loading && <Error />}
    </>
  );
};

export default CategoryPage;
