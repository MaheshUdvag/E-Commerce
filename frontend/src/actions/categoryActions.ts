import { getCategories, getProductsBySearchTerm } from "../apis/categoryApis";
import {
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  SEARCH_LIST_REQUEST,
  SEARCH_LIST_SUCCESS,
  SEARCH_LIST_FAIL,
  SEARCH_SUGGESTION_SUCCESS,
  SEARCH_SUGGESTION_REQUEST,
  SEARCH_SUGGESTION_FAIL,
} from "../ActionTypes/category";

export const listCategories = () => async (dispatch: any) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await getCategories();
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.categories });
  } catch (err: any) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: err.response });
  }
};

export const findProductsBySearchTerm =
  (count: Number, sortBy: Number, term: string) => async (dispatch: any) => {
    try {
      if (term) {
        dispatch({ type: SEARCH_LIST_REQUEST });
        const { data } = await getProductsBySearchTerm(count, sortBy, term);
        dispatch({ type: SEARCH_LIST_SUCCESS, payload: data });
      } else {
        dispatch({ type: SEARCH_LIST_SUCCESS, payload: { products: [] } });
      }
    } catch (err: any) {
      dispatch({ type: SEARCH_LIST_FAIL, payload: err.response });
    }
  };

export const getProductSuggestions =
  (count: Number, sortBy: Number, term: string) => async (dispatch: any) => {
    try {
      if (term) {
        dispatch({ type: SEARCH_SUGGESTION_REQUEST });
        const { data } = await getProductsBySearchTerm(count, sortBy, term);
        dispatch({ type: SEARCH_SUGGESTION_SUCCESS, payload: data });
      } else {
        dispatch({
          type: SEARCH_SUGGESTION_SUCCESS,
          payload: { products: [] },
        });
      }
    } catch (err: any) {
      dispatch({ type: SEARCH_SUGGESTION_FAIL, payload: err.response });
    }
  };
