import {
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  SEARCH_LIST_REQUEST,
  SEARCH_LIST_SUCCESS,
  SEARCH_LIST_FAIL,
  SEARCH_SUGGESTION_REQUEST,
  SEARCH_SUGGESTION_SUCCESS,
  SEARCH_SUGGESTION_FAIL,
} from "../ActionTypes/category";

type ACTION = { type: string; payload: string };

interface Categories {
  categories: [];
}

export const categoryListReducer = (
  state: Categories = { categories: [] },
  action: ACTION
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const findProductsBySearchTermReducer = (
  state: any = {},
  action: ACTION
) => {
  const payload: any = action.payload;
  switch (action.type) {
    case SEARCH_LIST_REQUEST:
      return { loading: true };
    case SEARCH_LIST_SUCCESS:
      return { loading: false, ...payload };
    case SEARCH_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const productSuggestionReducer = (state: any = {}, action: ACTION) => {
  const payload: any = action.payload;
  switch (action.type) {
    case SEARCH_SUGGESTION_REQUEST:
      return { loading: true };
    case SEARCH_SUGGESTION_SUCCESS:
      return { loading: false, ...payload };
    case SEARCH_SUGGESTION_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
