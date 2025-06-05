type Order = {
  title: string;
  client: string;
  amount: number;
  date: string;
  status: string;
};

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  "In Review": "bg-orange-100 text-orange-800",
  Rejected: "bg-red-100 text-red-800",
  Denied: "bg-red-100 text-red-800",
};

export const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-md font-semibold">{order.title}</h3>
        <p className="text-sm text-gray-500">{order.client}</p>
        <p className="text-lg font-bold mt-2">${order.amount.toLocaleString()}</p>
        <p className="text-sm text-gray-400 mt-1">Date {new Date(order.date).toLocaleDateString()}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[order.status] || 'bg-gray-100 text-gray-700'}`}
        >
          {order.status}
        </span>
        <button className="text-orange-600 border border-orange-500 px-4 py-1 text-sm rounded hover:bg-orange-100 transition">
          View
        </button>
      </div>
    </div>
  );
};
