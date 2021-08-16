import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
  PRODUCT_DETAIL_BY_PATH_FAIL,
  PRODUCT_DETAIL_BY_PATH_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_REQUEST,
  PRODUCT_DETAIL_BY_PATH_REQUEST,
} from "../constants/productConstants";
import {
  getProductDetail,
  getProducts,
  getProductsByCategory,
} from "../apis/productApis";
import { isMobile } from "react-device-detect";

export const listProducts = () => async (dispatch) => {
  try {
    let productCount = 4;
    if (isMobile) {
      productCount = 2;
    }
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await getProducts(productCount);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.response });
  }
};

export const listProductsByCategory = (path, count) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_CATEGORY_REQUEST });
    const { data } = await getProductsByCategory(path, count);
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
      payload: data.category,
    });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_BY_CATEGORY_FAIL, payload: err.response });
  }
};

export const getProductDetailsByPath = (path) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_BY_PATH_REQUEST });
    const { data } = await getProductDetail(path);
    dispatch({
      type: PRODUCT_DETAIL_BY_PATH_SUCCESS,
      payload: data.product,
    });
  } catch (err) {
    dispatch({ type: PRODUCT_DETAIL_BY_PATH_FAIL, payload: err.response });
  }
};
