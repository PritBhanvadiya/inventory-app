import { Activity } from "@/app/types/activity";
import ActivityItem from "./ActivityItem";

interface ActivityListProps {
    activities: Activity[];
}

export default function ActivityList({ activities }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <p className="py-6 m-0 text-center text-muted-foreground">
        No activities
      </p>
    );
  }

  return (
    <div>
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}