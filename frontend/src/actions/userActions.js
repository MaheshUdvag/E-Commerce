import {
  userLogin,
  userProfile,
  userRegister,
  userUpdate,
} from "../apis/userApis.js";
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
} from "../constants/userConstants.js";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await userLogin(email, password);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("loggedInUser", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response });
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("loggedInUser");
  dispatch({ type: USER_LOGOUT });
};

export const registerUser = (email, password, name) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await userRegister(email, password, name);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("loggedInUser", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: err.response });
  }
};

export const getUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const {
      userLogin: { user },
    } = getState();
    const token = user.token;
    const { data } = await userProfile(token);

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: USER_PROFILE_FAIL, payload: err.response });
  }
};

export const updateUser = (email, name) => async (dispatch, getState) => {
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
  } catch (err) {
    dispatch({ type: USER_UPDATE_FAIL, payload: err.response });
  }
};
