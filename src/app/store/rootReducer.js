import { combineReducers } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice'

const rootReducer = combineReducers({
    user:userReducer,

})

export default rootReducer;