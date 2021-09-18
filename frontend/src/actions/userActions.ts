import {
  guestRegister,
  userLogin,
  userProfile,
  userRegister,
  userUpdate,
} from "../apis/userApis";
import { ACTIVE_ORDER_SUCCESS } from "../ActionTypes/order";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../ActionTypes/user";

export const loginUser =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const { data } = await userLogin(email, password);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("loggedInUser", JSON.stringify(data));
    } catch (err: any) {
      dispatch({ type: USER_LOGIN_FAIL, payload: err.response });
    }
  };

export const logoutUser = () => async (dispatch: any) => {
  localStorage.removeItem("loggedInUser");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: ACTIVE_ORDER_SUCCESS, payload: {} });
};

export const registerUser =
  (email: string, password: string, name: string) => async (dispatch: any) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const { data } = await userRegister(email, password, name);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("loggedInUser", JSON.stringify(data));
    } catch (err: any) {
      dispatch({ type: USER_REGISTER_FAIL, payload: err.response });
    }
  };

export const getUser = () => async (dispatch: any, getState: any) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const {
      userLogin: { user },
    } = getState();
    const token = user.token;
    const { data } = await userProfile(token);

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (err: any) {
    dispatch({ type: USER_PROFILE_FAIL, payload: err.response });
  }
};

export const updateUser =
  (email: string, name: string) => async (dispatch: any, getState: any) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const {
        userLogin: { user },
      } = getState();
      const token = user.token;

      const { data } = await userUpdate(email, name, token);
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("loggedInUser", JSON.stringify(data));
    } catch (err: any) {
      dispatch({ type: USER_UPDATE_FAIL, payload: err.response });
    }
  };

export const guestUser = () => async (dispatch: any) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await guestRegister();
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("loggedInUser", JSON.stringify(data));
  } catch (err: any) {
    dispatch({ type: USER_REGISTER_FAIL, payload: err.response });
  }
};
