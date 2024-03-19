export const CHANGE_INPUT = "CHANGE/CHANGE_INPUT";

export const changeInput = keyword => ({ type: CHANGE_INPUT, keyword });

const initialState = {
  keyword: "",
};

const change = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        keyword: action.keyword,
      };
    default:
      return state;
  }
};
export default change;
