import {
  activeOrder,
  addUpdateItem,
  createOrder,
  removeItem,
} from "../apis/orderApis";
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

export const getActiveOrder = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: ACTIVE_ORDER_REQUEST });

    const {
      userLogin: { user },
    } = getState();
    const token = user.token;

    const { data } = await activeOrder(token);
    dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ACTIVE_ORDER_FAIL, payload: err.response });
  }
};

export const updateCart =
  (orderId: string, productId: string, quantity: number) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: ADD_UPDATE_CART_REQUEST });

      const {
        userLogin: { user },
      } = getState();
      const token = user.token;

      const { data } = await addUpdateItem(orderId, productId, quantity, token);
      dispatch({ type: ADD_UPDATE_CART_SUCCESS, payload: data });
      dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: ADD_UPDATE_CART_FAIL, payload: err.response });
    }
  };

export const removeItemFromCart =
  (orderId: string, productId: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: REMOVE_ITEM_REQUEST });

      const {
        userLogin: { user },
      } = getState();
      const token = user.token;

      const { data } = await removeItem(orderId, productId, token);
      dispatch({ type: REMOVE_ITEM_SUCCESS, payload: data });
      if (data.items > 0) {
        const order = await activeOrder(token);
        dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: order.data });
      } else {
        dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: {} });
      }
    } catch (err) {
      dispatch({ type: REMOVE_ITEM_FAIL, payload: err.response });
    }
  };

export const createOrderAction =
  (productId: string, quantity: number) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });

      const {
        userLogin: { user },
      } = getState();
      const token = user.token;

      const { data } = await createOrder(productId, quantity, token);
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
      dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: CREATE_ORDER_FAIL, payload: err.response });
    }
  };
