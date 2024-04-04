import { combineReducers } from "redux";

import change from "./change";
import welData from "./welData";
import likeused from "./likeused";

/** 추천·검색 데이터와 사용자 선택 상태를 페이지 사이에서 공유하는 root reducer다. */
const rootReducer = combineReducers({
  change,
  welData,
  likeused,
});

export default rootReducer;
