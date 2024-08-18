import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import userPDbookingReducer from "../features/user/userPDbookingSlice";
import getPackageReducer from "../features/packages/getPackageSlice";
import getCabtypesReducer from "../features/cabtypes/getCabtypesSlice"

const rootReducer = combineReducers({
  user: userReducer,
  userPDbookings: userPDbookingReducer,
  getPackage:getPackageReducer,
  getCabtypes:getCabtypesReducer,
});

export default rootReducer;
