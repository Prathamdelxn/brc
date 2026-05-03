"use client";

import { useState } from "react";
import { useTable } from "../../context/TableContext";

export default function TableManagement() {
  const { tables, addTable, deleteTable, updateTableStatus } = useTable();
  const [newTableName, setNewTableName] = useState("");
  const [newCapacity, setNewCapacity] = useState("");

  const handleAddTable = (e) => {
    e.preventDefault();
    if (newTableName && newCapacity) {
      addTable({
        name: newTableName,
        capacity: parseInt(newCapacity),
        status: "Available"
      });
      setNewTableName("");
      setNewCapacity("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available": return "bg-green-100 border-green-200 text-green-700";
      case "Occupied": return "bg-red-100 border-red-200 text-red-700";
      case "Reserved": return "bg-yellow-100 border-yellow-200 text-yellow-700";
      default: return "bg-gray-100 border-gray-200 text-gray-700";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Available": return "bg-green-500";
      case "Occupied": return "bg-red-500";
      case "Reserved": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto pr-2 pb-10 scrollbar-hide">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dining Tables</h1>
        <p className="text-gray-500">Manage table layout, capacity, and live status.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Add Table Form */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-2xl bg-white/60">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Table</h2>
            <form onSubmit={handleAddTable} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Table Name / ID</label>
                <input 
                  required 
                  type="text" 
                  value={newTableName} 
                  onChange={e => setNewTableName(e.target.value)} 
                  className="w-full glass-input px-4 py-2 rounded-xl border border-gray-200" 
                  placeholder="e.g. Window 1" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Capacity (Seats)</label>
                <input 
                  required 
                  type="number" 
                  min="1"
                  value={newCapacity} 
                  onChange={e => setNewCapacity(e.target.value)} 
                  className="w-full glass-input px-4 py-2 rounded-xl border border-gray-200" 
                  placeholder="e.g. 4" 
                />
              </div>
              <button type="submit" className="glass-button w-full py-3 rounded-xl font-bold mt-2">
                Create Table
              </button>
            </form>
          </div>

          <div className="glass-panel p-6 rounded-2xl bg-white/60">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Status Legend</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 font-medium">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-600 font-medium">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600 font-medium">Occupied</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Table Grid */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-2xl bg-white/60">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Floor Plan</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {tables.map(table => (
              <div key={table.id} className={`border rounded-2xl p-4 flex flex-col items-center justify-center relative transition-colors ${getStatusColor(table.status)}`}>
                <button 
                  onClick={() => deleteTable(table.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/50 hover:bg-red-500 hover:text-white text-gray-500 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="text-2xl mb-1">🍽️</div>
                <h3 className="font-bold text-lg mb-0.5">{table.name}</h3>
                <p className="text-xs font-semibold opacity-70 mb-3">{table.capacity} Seats</p>
                
                <select 
                  value={table.status}
                  onChange={(e) => updateTableStatus(table.id, e.target.value)}
                  className="w-full text-xs font-bold px-2 py-1.5 rounded-lg bg-white/60 border-none outline-none text-center cursor-pointer appearance-none"
                >
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Occupied">Occupied</option>
                </select>
                
                <div className={`absolute top-3 left-3 w-2.5 h-2.5 rounded-full shadow-sm ${getStatusDot(table.status)}`}></div>
              </div>
            ))}
            {tables.length === 0 && (
              <div className="col-span-full py-10 text-center text-gray-500 font-medium">
                No tables have been added to the floor plan yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
