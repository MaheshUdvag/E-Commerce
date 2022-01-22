import { activeOrder, createOrder } from "../apis/orderApis";
import {
  ACTIVE_ORDER_FAIL,
  ACTIVE_ORDER_REQUEST,
  ACTIVE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
} from "../ActionTypes/order";
import { USER_SESSION_VALIDATE } from "../ActionTypes/user";

export const getActiveOrder = () => async (dispatch: any, getState: any) => {
  try {
    const {
      userLogin: { user },
    } = getState();
    if (user) {
      dispatch({ type: ACTIVE_ORDER_REQUEST });
      const token = user.token;

      const { data } = await activeOrder(token);
      dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: data });
    }
  } catch (err: any) {
    console.log(err);

    dispatch({
      type: USER_SESSION_VALIDATE,
      payload: err.response.data,
    });
    dispatch({ type: ACTIVE_ORDER_FAIL, payload: err.response });
  }
};

export const updateCart = (order: any) => async (dispatch: any) => {
  dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: order });
};

export const createOrderAction =
  (productId: string, quantity: number) =>
  async (dispatch: any, getState: any) => {
    try {
      const {
        userLogin: { user },
      } = getState();
      if (user) {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const token = user.token;

        const { data } = await createOrder(productId, quantity, token);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: data });
      }
    } catch (err: any) {
      dispatch({
        type: USER_SESSION_VALIDATE,
        payload: err.response.data,
      });
      dispatch({ type: CREATE_ORDER_FAIL, payload: err.response });
    }
  };
