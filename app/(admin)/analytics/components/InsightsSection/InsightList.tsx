export type InsightItem = {
  id: string;
  label: string;
  meta: string;
};

type InsightListProps = {
  title: string;
  items: InsightItem[];
};

export function InsightList({ title, items }: InsightListProps) {
  return (
    <div className="border border-border rounded-sm px-6 py-2.5 bg-white">
      <h4>{title}</h4>

      {items.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          No data available
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map(item => (
            <li
              key={item.id}
              className="flex justify-between text-sm"
            >
              <span className="text-secondary truncate">
                {item.label}
              </span>
              <span className="text-muted-foreground">
                {item.meta}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
