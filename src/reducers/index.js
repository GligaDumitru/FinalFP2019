import { combineReducers } from "redux";
import mainReducer from "./mainReducer";
import homeReducer from "./homeReducer";

export default combineReducers({
  main: mainReducer,
  home: homeReducer
});
