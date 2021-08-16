import { IProduct } from "../components/Interface/IProduct";
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
  PRODUCT_DETAIL_BY_PATH_SUCCESS,
  PRODUCT_DETAIL_BY_PATH_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAIL_BY_PATH_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_REQUEST,
} from "../constants/productConstants";

export const productListReducer = (
  state = { products: [] },
  action: { type: string; payload: IProduct[] }
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const productListByCategoryReducer = (
  state = { category: {} },
  action: { type: string; payload: IProduct[] }
) => {
  switch (action.type) {
    case PRODUCT_LIST_BY_CATEGORY_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_BY_CATEGORY_SUCCESS:
      return { loading: false, category: action.payload };
    case PRODUCT_LIST_BY_CATEGORY_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const productDetailByPathReducer = (
  state = { product: {} },
  action: { type: string; payload: IProduct[] }
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_BY_PATH_REQUEST:
      return { loading: true };
    case PRODUCT_DETAIL_BY_PATH_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAIL_BY_PATH_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
