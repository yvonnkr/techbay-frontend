import { LOADING, LOADING_COMPLETE } from "../actions/types";

const initialState = false;

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return true;
    case LOADING_COMPLETE:
      return false;

    default:
      return state;
  }
};
