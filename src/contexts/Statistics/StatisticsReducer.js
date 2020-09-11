import { GET_STATISTICS } from "../types";
export default (state, action) => {
  switch (action.type) {
    case GET_STATISTICS:
      return {
        ...state,
        statics: action.payload,
      };

    default:
      return state;
  }
};
