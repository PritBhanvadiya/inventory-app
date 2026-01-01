import type { RootState } from "@/app/store/store";
import type { Activity } from "@/app/types/activity";

export const selectActivityLog = (state: RootState): Activity[] =>
  state.activity.list;
