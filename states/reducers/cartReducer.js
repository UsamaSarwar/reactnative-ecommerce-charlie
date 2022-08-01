import * as actions from "../actionTypes/actionTypes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case actions.CART_ADD:
      return [...state, action.payload];
    case actions.CART_REMOVE:
      console.log(action.payload);
      return state.filter((item) => item._id !== action.payload);
    default:
      return state;
  }
};

export default reducer;
