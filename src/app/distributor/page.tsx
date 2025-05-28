import React from "react";
import Link from "next/link";

const dashboardCards = [
  {
    label: "OPEN QUOTES",
    value: 12,
    buttonText: "View Quotes",
    href: "/quotes",
  },
  {
    label: "INSTALLATION JOBS",
    value: 5,
    buttonText: "View Jobs",
    href: "/installation-jobs",
  },
  {
    label: "PENDING ORDERS",
    value: 3,
    buttonText: "View Orders",
    href: "/orders",
  },
];

const messages = [
  { message: "Please send the updated drawings...", time: "2h ago" },
  { message: "Can we move the install date?", time: "1d ago" },
  { message: "Have the partitions been delivered?", time: "2d ago" },
  { message: "Site inspection looks good 👍", time: "3d ago" },
];

export default function DistributorPage() {
  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-6">DISTRIBUTOR PORTAL</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {dashboardCards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="bg-white rounded-lg shadow p-6 text-center border hover:shadow-md transition"
          >
            <p className="text-gray-500 font-medium mb-2">{card.label}</p>
            <p className="text-4xl font-bold">{card.value}</p>
            <div className="mt-4 inline-block bg-[#ff5100] text-white py-2 px-4 rounded">
              {card.buttonText}
            </div>
          </Link>
        ))}
      </div>

      {/* Messages */}
      <div>
        <h2 className="text-xl font-semibold mb-4">MESSAGES</h2>
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-center bg-gray-100 rounded-lg p-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
              <div className="flex-1">
                <p className="text-sm">
                  {msg.message.includes("send") ? (
                    <>
                      Please <span className="font-bold">send</span> the updated drawings...
                    </>
                  ) : (
                    msg.message
                  )}
                </p>
              </div>
              <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">{msg.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
