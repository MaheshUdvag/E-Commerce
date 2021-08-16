import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
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

const userInfo = localStorage.getItem("loggedInUser")
  ? JSON.parse(localStorage.getItem("loggedInUser"))
  : null;

const initialState = {
  userLogin: { user: userInfo },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
