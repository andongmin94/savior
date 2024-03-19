export const LIKE_INPUT = "likeused/LIKE_INPUT";
export const USED_INPUT = "likeused/USED_INPUT";

export const likeusedLike = like => ({ type: LIKE_INPUT, like });
export const likeusedUsed = used => ({ type: USED_INPUT, used });

const initialState = {
  like: [],
  used: [],
};

const likeused = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_INPUT:
      return { ...state, like: action.like };
    case USED_INPUT:
      return { ...state, used: action.used };
    default:
      return state;
  }
};
export default likeused;
