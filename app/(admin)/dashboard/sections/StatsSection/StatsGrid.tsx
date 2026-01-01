import StatCard from "./StatCard";

type Card = {
    label: string,
    value: any,
    status: string,
}
type StatsGridProps = {
    cards: Card[]
}

export default function StatsGrid({ cards }: StatsGridProps) {
    return (
        <div className="grid grid-cols-2 gap-6">
            {cards.map((card) => (
                <StatCard
                    key={card.label}
                    label={card.label}
                    value={card.value}
                    status={card.status}
                />
            ))}
        </div>
    )
}