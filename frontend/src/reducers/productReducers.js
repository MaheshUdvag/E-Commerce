import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_SUCCESS:
      return { products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const productListByCategoryReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_BY_CATEGORY_SUCCESS:
      return { products: action.payload };
    case PRODUCT_LIST_BY_CATEGORY_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
