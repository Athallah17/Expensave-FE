import { useState } from 'react';

type Currency = 'IDR' | 'USD' | 'EUR';

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('IDR');

  const formatCurrency = (amount: number) => {
    let locale = 'en-US';
    let currencyCode = currency;

    if (currency === 'IDR') locale = 'id-ID';

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currency === 'IDR' ? 0 : 2,
    }).format(amount);
  };

  return {
    currency,
    setCurrency,
    formatCurrency
  };
}
