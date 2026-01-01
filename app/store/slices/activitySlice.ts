import { Activity } from "@/app/types/activity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ActivityState = {
    list: Activity[]
}

const initialState: ActivityState = {
    list: []
}

const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        addActivity(state, action: PayloadAction<Activity>){
            state.list.push(action.payload)
        }
    }
})

export const { addActivity } = activitySlice.actions
export default activitySlice.reducer
