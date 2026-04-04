import { Activity } from "@/app/types/activity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActivityState = {
    list: Activity[]
}

const initialState: ActivityState = {
    list: typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("activities") || "[]")
        : []
}

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        addActivity(state, action: PayloadAction<Activity>){
            state.list.push(action.payload)

            localStorage.setItem("activities", JSON.stringify(state.list));
        },
        clearActivity(state) {
            state.list = [];

            localStorage.removeItem("activities");
        }
    }
})

export const { addActivity, clearActivity } = activitySlice.actions
export default activitySlice.reducer
