import { CreditCard, Wallet as WalletIcon, Smartphone } from 'lucide-react';

interface PaymentMethodIconProps {
  method: 'card' | 'cash' | 'digital';
}

export function PaymentMethodIcon({ method }: PaymentMethodIconProps) {
  const icons = {
    card: CreditCard,
    cash: WalletIcon,
    digital: Smartphone
  };

  const Icon = icons[method];

  return (
    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
      <Icon className="w-4 h-4 text-slate-600" />
    </div>
  );
}
