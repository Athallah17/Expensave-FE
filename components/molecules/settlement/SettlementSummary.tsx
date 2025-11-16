import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface SettlementSummaryProps {
  totalOwesYou: number;
  totalYouOwe: number;
  netBalance: number;
}

export function SettlementSummary({ totalOwesYou, totalYouOwe, netBalance }: SettlementSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100/50">
        <div className="flex items-center gap-2 text-emerald-600 mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs font-semibold">Owes You</span>
        </div>
        <p className="text-xl font-bold text-slate-800">${totalOwesYou.toFixed(2)}</p>
      </div>
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-100/50">
        <div className="flex items-center gap-2 text-rose-600 mb-2">
          <TrendingDown className="w-4 h-4" />
          <span className="text-xs font-semibold">You Owe</span>
        </div>
        <p className="text-xl font-bold text-slate-800">${totalYouOwe.toFixed(2)}</p>
      </div>
      <div className={`bg-gradient-to-br rounded-2xl p-4 border ${
        netBalance >= 0 
          ? 'from-amber-50 to-orange-50 border-amber-100/50' 
          : 'from-slate-50 to-gray-50 border-slate-100/50'
      }`}>
        {/* <div className={`flex items-center gap-2 mb-2 ${netBalance >= 0 ? 'text-amber-600' : 'text-slate-600'}`}>
          <DollarSign className="w-4 h-4" />
          <span className="text-xs font-semibold">Net Balance</span>
        </div>
        <p className={`text-xl font-bold ${netBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {netBalance >= 0 ? '+' : ''}${netBalance.toFixed(2)}
        </p> */}
      </div>
    </div>
  );
}