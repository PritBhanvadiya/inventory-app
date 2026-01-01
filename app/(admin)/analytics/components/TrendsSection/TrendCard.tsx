type TrendCardProps = {
  title: string;
  status: string;
  description: string;
};

export function TrendCard({
  title,
  status,
  description
}: TrendCardProps) {
  return (
    <div className="border border-border rounded-sm px-6 py-2.5 bg-white">
      <h4 className="text-secondary">{title}</h4>

      <h6 className="mt-2 font-medium">
        {status}
      </h6>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
