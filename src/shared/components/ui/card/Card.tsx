export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="font-semibold text-lg text-gray-800">{children}</div>
    </div>
  );
}
