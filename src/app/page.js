"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const SALES_DATA = [
  { name: 'Mon', revenue: 4000, orders: 120 },
  { name: 'Tue', revenue: 3000, orders: 98 },
  { name: 'Wed', revenue: 2000, orders: 86 },
  { name: 'Thu', revenue: 2780, orders: 105 },
  { name: 'Fri', revenue: 5890, orders: 250 },
  { name: 'Sat', revenue: 7390, orders: 310 },
  { name: 'Sun', revenue: 6490, orders: 280 },
];

const RECENT_ORDERS = [
  { id: "#1024", table: "T-12", amount: "₹45.98", items: "Spicy Chicken Burger, Fries", status: "Served", time: "10 mins ago" },
  { id: "#1025", table: "T-04", amount: "₹124.50", items: "Margherita Pizza x2, Cola x4", status: "Preparing", time: "5 mins ago" },
  { id: "#1026", table: "T-09", amount: "₹32.00", items: "Caesar Salad, Lava Cake", status: "Paid", time: "1 min ago" },
  { id: "#1027", table: "T-15", amount: "₹89.99", items: "Truffle Fries, Burger x3", status: "Preparing", time: "Just now" },
];

const TOP_ITEMS = [
  { name: "Spicy Chicken Burger", sales: 450, color: "bg-orange-500" },
  { name: "Truffle Parmesan Fries", sales: 320, color: "bg-amber-500" },
  { name: "Margherita Pizza", sales: 280, color: "bg-red-500" },
  { name: "Craft Cola", sales: 190, color: "bg-blue-500" },
];

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col overflow-y-auto pr-2 pb-10 scrollbar-hide">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500">Overview of your restaurant's performance.</p>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Revenue", value: "₹31,550", subtitle: "+14% from last week", color: "text-green-600" },
          { title: "Total Orders", value: "1,249", subtitle: "+5% from last week", color: "text-blue-600" },
          { title: "Avg Order Value", value: "₹25.26", subtitle: "+2% from last week", color: "text-orange-600" },
          { title: "Active Tables", value: "14 / 20", subtitle: "70% capacity", color: "text-purple-600" },
        ].map((metric, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl bg-white/60">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{metric.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mb-1">{metric.value}</p>
            <p className={`text-xs font-semibold ${metric.color}`}>{metric.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl bg-white/60 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Weekly Revenue Trend</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={4} dot={{ r: 6, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Items */}
        <div className="glass-panel p-6 rounded-2xl bg-white/60 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Top Selling Items</h2>
          <div className="flex-1 flex flex-col gap-5">
            {TOP_ITEMS.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="font-bold text-gray-900">{item.sales}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.sales / 500) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="glass-panel p-6 rounded-2xl bg-white/60 flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Live Kitchen Queue & Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Table</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 last:border-0 hover:bg-white/40 transition-colors">
                  <td className="py-4 text-gray-800 font-medium">{order.id}</td>
                  <td className="py-4 text-orange-600 font-bold">{order.table}</td>
                  <td className="py-4 text-gray-600">{order.items}</td>
                  <td className="py-4 text-gray-800 font-semibold">{order.amount}</td>
                  <td className="py-4 text-gray-500 text-sm">{order.time}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                      order.status === 'Served' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      'bg-green-100 text-green-700 border-green-200'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
