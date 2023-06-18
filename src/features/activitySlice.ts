import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { activities, region, cities} from "../data";
import { Activity, Category, City, Cities, Region, Tab } from "../types";


type InitialStateType = {
    region: Region
    activity: Activity | undefined
    activities: Activity[]
    category: Category,
    cities: Cities
    city: City
    tab: Tab
    distance: number | null
}

const initialState: InitialStateType = {
    region,
    cities,
    activity: undefined,
    activities,
    category: Category.all,
    tab: Tab.tab1,
    city: City.all,
    distance: null
}


const activitySlice = createSlice({
    name: "activity",
    initialState,
    reducers: {
        selectActivity: (state, action: PayloadAction<number>) => {
            state.activity = state.activities.find((activity) => activity.id === action.payload)
        },
        unselectActivity: (state) => {
            state.activity = undefined
            state.tab = Tab.tab1
        },
        filterActivities: (state, action: PayloadAction<Category>) => {
            if(action.payload === "all"){
                state.activities = initialState.activities
                state.category = Category.all                
            } else {
                state.category = action.payload
                state.activities = initialState.activities.filter((activity) => activity.category === action.payload)
            }
        },
        filterCities: (state, action: PayloadAction<keyof typeof City>) => {
           state.city = City[action.payload]
        },
        switchTab: (state, action: PayloadAction<Tab>) => {
            state.tab = action.payload
        },
        addDistanceFromLocation: (state, action: PayloadAction<number>) => {
            state.distance = action.payload
        }
    }
})

export const { selectActivity, unselectActivity, filterActivities, filterCities, switchTab, addDistanceFromLocation } = activitySlice.actions

export default activitySlice.reducer
