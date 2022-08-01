import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
