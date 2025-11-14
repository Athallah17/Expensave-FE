export function Select({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  return (
    <select className="px-4 py-2 bg-teal-50 rounded-xl text-sm font-medium text-teal-700 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500">
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}