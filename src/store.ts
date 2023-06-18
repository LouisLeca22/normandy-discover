import {configureStore} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
import uiReducer from "./features/uiSlice";
import activityReducer from "./features/activitySlice";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        activity: activityReducer,
    }
})

export const useAppDispatch:() => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof  store.getState>>=useSelector;