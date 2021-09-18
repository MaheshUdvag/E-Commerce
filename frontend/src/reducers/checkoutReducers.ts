import { SET_CHECKOUT_ADDRESS } from "../ActionTypes/checkout";

export const setCheckoutAddressReducer = (state = { _id: "" }, action: any) => {
  if (action.type === SET_CHECKOUT_ADDRESS) {
    return { _id: action.payload._id };
  } else {
    return state;
  }
};
