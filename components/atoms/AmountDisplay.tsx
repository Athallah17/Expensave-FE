interface AmountDisplayProps {
  amount: number;
  size?: "sm" | "md" | "lg";
  showSign?: boolean;
  currency?: string; // dynamic currency (default IDR)
}

export function AmountDisplay({
  amount,
  size = "md",
  showSign = true,
  currency = "IDR",
}: AmountDisplayProps) {
  const isNegative = amount < 0;

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "IDR" ? 0 : 2,
  });

  return (
    <span
      className={`font-bold ${sizes[size]} ${
        isNegative ? "text-rose-600" : "text-emerald-600"
      }`}
    >
      {showSign && (isNegative ? "-" : "+")} {formatter.format(Math.abs(amount))}
    </span>
  );
}
