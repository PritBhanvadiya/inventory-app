'use client'

import ActivityList from "./ActivityList";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks/hooks";
import { clearActivity } from "@/app/store/slices/activitySlice";

export default function InventoryActivitySection() {
  const dispatch = useAppDispatch();

  const activities = useAppSelector(state => state.activity.list);



  return (
    <div className="border border-border rounded-sm bg-white max-w-3/5 gap-6">
      <div className="border-b border-border px-6 py-4 flex justify-between items-start">
        <div>
        <h2 className="mb-3">Inventory Activity</h2>
        <h6>
          <em>Recent inventory changes</em>
        </h6>
        </div>
        <button 
        className="btn-secondary" 
        onClick={() => dispatch(clearActivity())}
        >Clear</button>
      </div>

      {/* Activity List */}
      <div>
        <ActivityList activities={activities} />
      </div>
    </div>
  );
}
