export function MetricCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-[#ff5100]/10 border border-[#ff5100] rounded-xl p-4 text-center">
      <div className="text-sm text-[#ff5100] font-medium">{title}</div>
      <div className="text-2xl font-bold text-[#ff5100]">{value}</div>
    </div>
  );
}
