export const WEL_NAME = "welData/WEL_NAME";
export const WEL_CONTENT = "welData/WEL_CONTENT";
export const WEL_ID = "welData/WEL_ID";

export const welDataName = title => ({ type: WEL_NAME, title }); // action 함수
export const welDataContent = content => ({ type: WEL_CONTENT, content }); // action 함수
export const welDataId = id => ({
  type: WEL_ID,
  id,
}); // action 함수

const initialState = {
  title: "hi",
  content: "hi",
  id: "hi",
};

// reducer
const welData = (state = initialState, action) => {
  switch (action.type) {
    case WEL_NAME:
      return { ...state, title: action.title };
    case WEL_CONTENT:
      return { ...state, content: action.content };
    case WEL_ID:
      return { ...state, id: action.id };
    default:
      return state;
  }
};
export default welData;
