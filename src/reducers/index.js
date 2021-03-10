import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { errorReducer } from "./errrorReducer";

export const rootReducer = combineReducers({
  errors: errorReducer,
  user: userReducer,
});
