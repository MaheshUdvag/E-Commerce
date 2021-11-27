import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductsByCategory } from "../../actions/productActions";
import Error from "../../components/Error";
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
    window.scrollTo(0, 0);
  }, [categoryPath, dispatch]);

  return (
    <>
      {category && Object.keys(category).length > 0 ? (
        <ProductList
          products={category.products}
          title={category.name}
          categoryImage={category.description[0].categoryImage}
          page="category"
          sortOptions={sortOptions}
          handleSortChange={handleSortChange}
        />
      ) : loading ? (
        <>
          <Skeleton variant="rect" width={1010} height={218} />
          <Skeleton variant="rect" width={210} height={418} />
          <Skeleton variant="text" width={210} height={40} />
          <Skeleton variant="text" width={210} height={40} />
        </>
      ) : (
        <Error />
      )}
    </>
  );
};

export default CategoryPage;
