interface Props {
    title: string;
    value: string | number;
}

const SummaryCard = ({ title, value }: Props) => {
    return (
        <div className="bg-(--card) border border-(--border) p-4 rounded-2xl">
            <p className="text-sm text-(--text-muted)">{title}</p>
            <h2 className="text-xl font-semibold">{value}</h2>
        </div>
    )
}

export default SummaryCard
