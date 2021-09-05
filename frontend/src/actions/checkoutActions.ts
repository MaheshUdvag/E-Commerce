import { SET_CHECKOUT_ADDRESS } from "../constants/checkoutConstatnts";

export const checkoutAddressAction = (_id: string) => (dispatch: any) => {
  dispatch({ type: SET_CHECKOUT_ADDRESS, payload: { _id } });
};
