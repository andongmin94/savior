import { combineReducers } from "redux";

import change from "./change";
import welData from "./welData";
import likeused from "./likeused";

export default combineReducers({
  change,
  welData,
  likeused,
});
