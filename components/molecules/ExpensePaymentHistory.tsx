export default function ExpensePaymentHistory({ payments }: any) {
    if (!payments || payments.length === 0) {
        return <p className="text-gray-400 text-sm">No payment records yet.</p>;
    }

    return (
        <ul className="space-y-2">
            {payments.map((p: any) => (
                <li
                    key={p.id}
                    className="flex justify-between items-center border-b py-2 text-sm"
                >
                    <div>
                        <p className="font-medium">{p.payer?.name ?? "Unknown User"}</p>
                        <p className="text-gray-500 text-xs">
                            {new Date(p.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <span className={`font-semibold ${p.isPaid ? "text-green-600" : "text-red-600"}`}>
                        {p.amount} {p.isPaid ? "Paid" : "Pending"}
                    </span>
                </li>
            ))}
        </ul>
    );
}
