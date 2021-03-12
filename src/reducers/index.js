import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { errorReducer } from "./errrorReducer";
import { loadingReducer } from "./loadingReducer";

export const rootReducer = combineReducers({
  errors: errorReducer,
  loading: loadingReducer,
  user: userReducer,
});
