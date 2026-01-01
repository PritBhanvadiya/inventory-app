import { Activity } from "@/app/types/activity";

interface ActivityItemProps {
  activity: Activity;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  // Format the timestamp nicely
  const timeAgo = new Date(activity.timestamp).toLocaleTimeString();

  return (
    <div className="grid grid-cols-4 py-4 px-6 border-b border-border">
      <p className="m-0">{activity.type}</p>
      <p className="m-0">{activity.productName}</p>
      <p className="m-0">{activity.delta}</p>
      <p className="m-0">{timeAgo}</p>
    </div>
  );
}
