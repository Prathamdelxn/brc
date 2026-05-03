"use client";

import { useState } from "react";

const MOCK_INVENTORY = [
  { id: "ING-001", name: "Brioche Buns", category: "Bakery", stock: 120, status: "In Stock", price: 0.50 },
  { id: "ING-002", name: "Premium Beef Patties", category: "Meat", stock: 45, status: "Low Stock", price: 2.50 },
  { id: "ING-003", name: "Truffle Oil", category: "Pantry", stock: 2, status: "Critical", price: 15.00 },
  { id: "ING-004", name: "Mozzarella Cheese", category: "Dairy", stock: 80, status: "In Stock", price: 3.20 },
  { id: "ING-005", name: "Craft Cola Syrup", category: "Beverages", stock: 5, status: "Low Stock", price: 12.00 },
  { id: "ING-006", name: "Romaine Lettuce", category: "Produce", stock: 30, status: "In Stock", price: 1.50 },
];

export default function Inventory() {
  const [items, setItems] = useState(MOCK_INVENTORY);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock": return "text-green-700 bg-green-100 border-green-200";
      case "Low Stock": return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "Critical": return "text-red-700 bg-red-100 border-red-200";
      default: return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Ingredients & Stock</h1>
          <p className="text-gray-500">Track and manage kitchen inventory levels.</p>
        </div>
        <button className="glass-button px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Ingredient
        </button>
      </header>

      <div className="glass-panel flex-1 rounded-2xl overflow-hidden flex flex-col bg-white/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-white/60">
                <th className="p-4 text-gray-600 font-semibold">Item ID</th>
                <th className="p-4 text-gray-600 font-semibold">Ingredient Name</th>
                <th className="p-4 text-gray-600 font-semibold">Category</th>
                <th className="p-4 text-gray-600 font-semibold">Cost per unit</th>
                <th className="p-4 text-gray-600 font-semibold">Stock Level</th>
                <th className="p-4 text-gray-600 font-semibold">Status</th>
                <th className="p-4 text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-white/60 transition-colors">
                  <td className="p-4 text-gray-500 font-mono text-sm">{item.id}</td>
                  <td className="p-4 text-gray-800 font-medium">{item.name}</td>
                  <td className="p-4 text-gray-500">{item.category}</td>
                  <td className="p-4 text-orange-600 font-semibold">₹{item.price.toFixed(2)}</td>
                  <td className="p-4 text-gray-800 font-medium">{item.stock}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs border font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                        Edit
                      </button>
                    </div>
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
