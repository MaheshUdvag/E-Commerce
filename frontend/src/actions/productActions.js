import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
} from "../constants/productConstants";
import { getProducts, getProductsByCategory } from "../apis/productApis";
import { isMobile } from "react-device-detect";

export const listProducts = () => async (dispatch) => {
  try {
    let productCount = 4;
    if (isMobile) {
      productCount = 2;
    }
    const { data } = await getProducts(productCount);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.response });
  }
};

export const listProductsByCategory = (id, count) => async (dispatch) => {
  try {
    const { data } = await getProductsByCategory(id, count);

    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
      payload: data.products,
    });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_BY_CATEGORY_FAIL, payload: err.response });
  }
};
