import { getCategories } from "../apis/categoryApis";
import {
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
} from "../constants/categoryConstants";

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await getCategories();
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.categories });
  } catch (err) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: err.response });
  }
};
