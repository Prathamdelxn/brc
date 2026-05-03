"use client";

import { useOrder } from "../../context/OrderContext";
import { useTable } from "../../context/TableContext";

export default function OrderManagement() {
  const { orders, updateOrderStatus } = useOrder();
  const { updateTableStatus } = useTable();

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Preparing": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Ready": return "bg-green-100 text-green-700 border-green-200";
      case "Served": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Paid": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleStatusChange = (order, newStatus) => {
    updateOrderStatus(order.id, newStatus);
    
    // If order is paid, free up the table
    if (newStatus === "Paid") {
      updateTableStatus(order.tableId, "Available");
    }
  };

  const statusFlow = ["Pending", "Preparing", "Ready", "Served", "Paid"];

  return (
    <div className="h-full flex flex-col overflow-y-auto pr-2 pb-10 scrollbar-hide">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management</h1>
        <p className="text-gray-500">Monitor live orders and manage kitchen workflow.</p>
      </header>

      <div className="glass-panel p-6 rounded-2xl bg-white/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="pb-4 font-medium">Order ID</th>
                <th className="pb-4 font-medium">Table</th>
                <th className="pb-4 font-medium">Items</th>
                <th className="pb-4 font-medium">Total</th>
                <th className="pb-4 font-medium">Staff</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-white/40 transition-colors">
                  <td className="py-4 font-bold text-gray-800">#{order.id}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">
                      {order.tableName}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-1">
                      {order.items.map((item, idx) => (
                        <span key={idx} className="text-sm text-gray-700">
                          {item.quantity}x {item.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 font-bold text-orange-600">₹{order.total.toFixed(2)}</td>
                  <td className="py-4 text-sm text-gray-500">{order.staffName}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {order.status !== "Paid" && (
                      <div className="flex justify-end gap-2">
                        {statusFlow.indexOf(order.status) < statusFlow.length - 1 && (
                          <button 
                            onClick={() => handleStatusChange(order, statusFlow[statusFlow.indexOf(order.status) + 1])}
                            className="px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors"
                          >
                            Mark as {statusFlow[statusFlow.indexOf(order.status) + 1]}
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-500 font-medium">
                    No active orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
