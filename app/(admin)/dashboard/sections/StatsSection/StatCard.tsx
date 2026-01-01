type StatCardProps = {
    label: string;
    value: any;
    status: string;
};

export default function StatCard({ label, value, status }: StatCardProps) {
    return (
        <div className="border border-border rounded-sm px-6 py-2.5 bg-white">
            <h4 className="text-2xl mb-6 text-text-muted">{label}</h4>
            <span className="text-5xl font-medium">{value}</span>
            <h6 className="text-lg mt-4 text-success">{status}</h6>
        </div>
    );
}
