import { IUser } from "../components/Interface/IUser";
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

export const userLoginReducer = (state = {}, action: any) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, authenticated: false };
    case USER_LOGIN_SUCCESS:
      let authenticated = false;
      if (action.payload) {
        authenticated = action.payload.authenticated;
      }
      return { loading: false, user: action.payload, authenticated };
    case USER_LOGIN_FAIL:
      return { error: action.payload, authenticated: false };
    case USER_LOGOUT:
      return { authenticated: false };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action: any) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_REGISTER_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

const profilePayload = {
  _id: "",
  loginId: "",
  name: "",
  email: "",
  store: "",
  address: [],
};

export const userProfileReducer = (
  state: IUser = profilePayload,
  action: any
) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_PROFILE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_UPDATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
