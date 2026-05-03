"use client";

import { useTable } from "../context/TableContext";
import { useStaff } from "../context/StaffContext";

export default function Cart({ 
  cartItems, 
  onUpdateQuantity, 
  onCheckout, 
  selectedTableId, 
  setSelectedTableId,
  selectedStaffId,
  setSelectedStaffId
}) {
  const { tables } = useTable();
  const { staff } = useStaff();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="glass-panel w-96 h-full flex flex-col rounded-2xl ml-6 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-white/40">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Current Order</h2>
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
          </span>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 block">Dining Table</label>
            <select 
              value={selectedTableId}
              onChange={(e) => setSelectedTableId(e.target.value)}
              className="glass-input w-full px-4 py-2.5 rounded-xl text-sm bg-white/50 outline-none appearance-none border-2 border-gray-100 focus:border-orange-500 transition-all font-bold text-gray-700 shadow-sm"
            >
              <option value="">Choose a table...</option>
              {tables.filter(t => t.status === "Available").map(table => (
                <option key={table.id} value={table.id}>
                  {table.name} — {table.capacity} Seats
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-[2.4rem] pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          <div className="relative">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5 block">Assigned Staff</label>
            <select 
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="glass-input w-full px-4 py-2.5 rounded-xl text-sm bg-white/50 outline-none appearance-none border-2 border-gray-100 focus:border-orange-500 transition-all font-bold text-gray-700 shadow-sm"
            >
              <option value="">Choose a waiter...</option>
              {staff.filter(s => s.status === "Active").map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.role})
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-[2.4rem] pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-10">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-4 border border-gray-100">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 items-center bg-white/80 p-4 rounded-2xl border border-gray-100/50 shadow-sm transition-all hover:shadow-md">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-14 h-14 rounded-xl shrink-0 object-cover shadow-inner"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-900 font-bold text-sm truncate">{item.name}</h4>
                <p className="text-orange-500 font-black text-xs">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center bg-gray-50 rounded-xl p-1 gap-3 border border-gray-100">
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-500 hover:text-orange-600 transition-colors shadow-sm"
                >-</button>
                <span className="text-sm font-black text-gray-900 min-w-[1ch] text-center">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-500 hover:text-orange-600 transition-colors shadow-sm"
                >+</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-6 bg-white/60 border-t border-gray-100 mt-auto shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
            <span className="font-bold text-gray-800">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">VAT (8%)</span>
            <span className="font-bold text-gray-800">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-2">
            <span className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Total</span>
            <span className="text-2xl font-black text-orange-600">₹{total.toFixed(2)}</span>
          </div>
        </div>
        <button 
          onClick={onCheckout}
          disabled={cartItems.length === 0}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl text-lg font-black shadow-lg shadow-orange-200 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          <span>Send to Kitchen</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
