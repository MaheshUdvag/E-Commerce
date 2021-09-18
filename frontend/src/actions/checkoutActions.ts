import { SET_CHECKOUT_ADDRESS } from "../ActionTypes/checkout";

export const checkoutAddressAction = (_id: string) => (dispatch: any) => {
  dispatch({ type: SET_CHECKOUT_ADDRESS, payload: { _id } });
};
