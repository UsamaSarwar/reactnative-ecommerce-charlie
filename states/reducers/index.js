import { combineReducers } from "redux";
import cartReducer from "../reducers/cartReducer";

const reducers = combineReducers({
  product: cartReducer,
});

export default reducers;
