import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
import userPDbookingReducer from "../features/user/userPDbookingSlice";

const rootReducer = combineReducers({
    user:userReducer,
    userPDbookings:userPDbookingReducer
})

export default rootReducer;