import { getCategories } from "../apis/categoryApis";
import {
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
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
