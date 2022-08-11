import * as actions from "../actionTypes/actionTypes";

const reducer = (state = [], action) => {
  let done = false;
  switch (action.type) {
    case actions.CART_ADD:
      state.map((item, index) => {
        if (item._id === action.payload._id) {
          done = true;
          if (item.avaiableQuantity > item.quantity) {
            state[index].quantity = state[index].quantity + 1;
          } else {
            console.log("out of stock");
          }

          return state;
        }
      });
      if (!done) {
        return [
          ...state,
          {
            _id: action.payload._id,
            category: action.payload.category,
            createdAt: action.payload.createdAt,
            description: action.payload.description,
            image: action.payload.image,
            price: action.payload.price,
            sku: action.payload.sku,
            title: action.payload.title,
            updatedAt: action.payload.updatedAt,
            avaiableQuantity: action.payload.quantity,
            quantity: 1,
          },
        ];
      }

    case actions.CART_REMOVE:
      return state.filter((item) => item._id !== action.payload);

    case actions.INCREASE_CART_ITEM_QUANTITY:
      if (action.payload.type === "increase") {
        state.map((item, index) => {
          if (item._id === action.payload.id) {
            return (state[index].quantity = state[index].quantity + 1);
          }
        });
      }

    case actions.DECREASE_CART_ITEM_QUANTITY:
      if (action.payload.type === "decrease") {
        state.map((item, index) => {
          if (item._id === action.payload.id) {
            return (state[index].quantity = state[index].quantity - 1);
          }
        });
      }
    case actions.EMPTY_CART:
      if (action.payload === "empty") {
        state.splice(0, state.length);
        return state;
      }

    default:
      return state;
  }
};

export default reducer;
