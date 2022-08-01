import * as actions from "../actionTypes/actionTypes";

export const addCartItem = (product) => {
  return (dispatch) => {
    dispatch({ type: actions.CART_ADD, payload: product });
  };
};

export const removeCartItem = (id) => {
  return (dispatch) => {
    dispatch({ type: actions.CART_REMOVE, payload: id });
  };
};
