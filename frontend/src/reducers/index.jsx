import { combineReducers } from "redux";
import change from "./change";
import welData from "./welData";
import likeused from "./likeused";

const rootReducer = combineReducers({
  change,
  welData,
  likeused,
});
export default rootReducer;
