import {
  ACTIVE_ORDER_FAIL,
  ACTIVE_ORDER_REQUEST,
  ACTIVE_ORDER_SUCCESS,
  ADD_UPDATE_CART_FAIL,
  ADD_UPDATE_CART_REQUEST,
  ADD_UPDATE_CART_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  REMOVE_ITEM_FAIL,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
} from "../constants/orderConstants";

export const activeOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIVE_ORDER_REQUEST:
      return { loading: true };
    case ACTIVE_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case ACTIVE_ORDER_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const addUpdateOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_UPDATE_CART_REQUEST:
      return { loading: true };
    case ADD_UPDATE_CART_SUCCESS:
      return { loading: false, order: action.payload };
    case ADD_UPDATE_CART_FAIL:
      return { error: action.payload, order: {} };
    default:
      return state;
  }
};

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { error: action.payload, order: {} };
    default:
      return state;
  }
};

export const removeItemReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ITEM_REQUEST:
      return { loading: true };
    case REMOVE_ITEM_SUCCESS:
      return { loading: false, order: action.payload };
    case REMOVE_ITEM_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
