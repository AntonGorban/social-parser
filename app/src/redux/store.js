import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";

let reducers = combineReducers({
  user: userReducer,
});

let store = createStore(reducers);

export default store;
