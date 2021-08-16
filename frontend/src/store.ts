import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
  Store,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import {
  productListReducer,
  productListByCategoryReducer,
  productDetailByPathReducer,
} from "./reducers/productReducers";
import { categoryListReducer } from "./reducers/categoryReducers";
import {
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { reducer as formReducer } from "redux-form";
import {
  activeOrderReducer,
  addUpdateOrderReducer,
  createOrderReducer,
  removeItemReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  form: formReducer,
  productListReducer,
  categoryListReducer,
  productListByCategoryReducer,
  productDetailByPathReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  activeOrder: activeOrderReducer,
  addUpdateItem: addUpdateOrderReducer,
  removeItem: removeItemReducer,
  createOrder: createOrderReducer,
});

type UserInfo = {
  _id: string;
  token: string;
  name: string;
  email: string;
};

const userInfo: UserInfo = JSON.parse(
  localStorage.getItem("loggedInUser") || "{}"
);

const initialState = {
  userLogin: { user: userInfo },
};

const middleware = [thunk];

export type TAppState = ReturnType<typeof reducer>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;
export type TStore = Store<TAppState, AnyAction> & { dispatch: TDispatch };

const store: TStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;