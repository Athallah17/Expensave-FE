export default function ExpenseStatusTag({ status }: { status: string }) {
    const colorMap: any = {
        paid: "bg-green-100 text-green-700",
        partial: "bg-yellow-100 text-yellow-700",
        unpaid: "bg-red-100 text-red-700",
    };

    const labelMap: any = {
        paid: "Paid",
        partial: "Partially Paid",
        unpaid: "Unpaid",
    };

    return (
        <span className={`px-2 py-1 text-sm font-medium rounded-md ${colorMap[status] || "bg-gray-100 text-gray-600"}`}>
            {labelMap[status] ?? "Unknown"}
        </span>
    );
}
