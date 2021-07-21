import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productListReducer,
  productListByCategoryReducer,
} from "./reducers/productReducers";
import { categoryListReducer } from "./reducers/categoryReducers";

const reducer = combineReducers({
  productListReducer,
  categoryListReducer,
  productListByCategoryReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
