import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import userPDbookingReducer from "../features/user/userPDbookingSlice";
import getPackageReducer from "../features/packages/getPackageSlice";

const rootReducer = combineReducers({
  user: userReducer,
  userPDbookings: userPDbookingReducer,
  getPackage:getPackageReducer,
});

export default rootReducer;
