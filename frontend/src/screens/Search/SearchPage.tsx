import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductsBySearchTerm } from "../../actions/categoryActions";
import ProductList from "../../components/ProductList";
import CategorySkeleton from "../../components/Skeletons/CategorySkeleton";

const SearchPage: React.FC<any> = ({ location }) => {
  const searchParams = new URLSearchParams(location.search);

  const dispatch = useDispatch();
  const searchTerm = searchParams.get("term") || "";

  const [sortOptions, setSortOptions] = React.useState(1);

  const { products, loading } = useSelector((state: any) => {
    return state.searchResults;
  });

  const handleSortChange = (event: any) => {
    setSortOptions(event.target.value);
    dispatch(findProductsBySearchTerm(10, event.target.value, searchTerm));
  };

  useEffect(() => {
    dispatch(findProductsBySearchTerm(10, sortOptions, searchTerm));
  }, [dispatch, searchTerm, sortOptions]);

  return (
    <>
      {!loading && products && Object.keys(products).length >= 0 ? (
        <ProductList
          products={products}
          title={`Search results for ${searchTerm}`}
          loading={loading}
          page="search"
          sortOptions={sortOptions}
          handleSortChange={handleSortChange}
        />
      ) : (
        <CategorySkeleton page="search" />
      )}
    </>
  );
};

export default SearchPage;
