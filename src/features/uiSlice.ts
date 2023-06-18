import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { info, } from "../data";
import { Info, Lang } from "../types";

type InitialStateType = {
    info: Info
    lang: Lang
    showFilterActvity: boolean 
    showFilterCity: boolean
    showList: boolean
    showLang: boolean 

}

const initialState: InitialStateType = {
    lang: localStorage.getItem("lang") as Lang ?? Lang.EN,
    showFilterActvity: false,
    showFilterCity: false,
    showLang: false,
    showList: false,
    info,
}


const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleShowLang: (state, action: PayloadAction<boolean>) => {
            state.showLang = action.payload
        },
        toggleShowFilterCity: (state, action: PayloadAction<boolean>) => {
            state.showFilterCity = action.payload
        },
        toggleShowFilterActivity: (state, action: PayloadAction<boolean>) => {
            state.showFilterActvity = action.payload
        },
        toggleShowList: (state, action: PayloadAction<boolean>) => {
            state.showList = action.payload
        },
        switchLang: (state, action: PayloadAction<Lang>) => {
            state.lang = action.payload
            localStorage.setItem("lang", action.payload)
        }
    }
})

export const { toggleShowFilterCity, toggleShowFilterActivity, toggleShowLang, toggleShowList, switchLang} = uiSlice.actions

export default uiSlice.reducer
