import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import KeyboardSlice from "./reducers/KeyboardSlice";

const rootReducer = combineReducers({
    KeyboardSlice,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
}

export type typeStore = ReturnType<typeof setupStore>;
export type typeRoot = ReturnType<typeof rootReducer>;
export type typeDispatch = typeStore["dispatch"];