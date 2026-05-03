"use client";

import { useState } from "react";
import { useStaff } from "../../context/StaffContext";

export default function StaffManagement() {
  const { staff, addStaff, deleteStaff, updateStaffStatus } = useStaff();
  const [name, setName] = useState("");
  const [role, setRole] = useState("Waiter");

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addStaff({ name, role, status: "Active" });
      setName("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-700 border-green-200";
      case "On Break": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const roles = ["Admin", "Waiter", "Chef", "Cashier", "Manager"];

  return (
    <div className="h-full flex flex-col overflow-y-auto pr-2 pb-10 scrollbar-hide">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Staff Management</h1>
        <p className="text-gray-500">Manage your team members, roles, and status.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        <div className="xl:col-span-1">
          <div className="glass-panel p-6 rounded-2xl bg-white/60">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Add Staff Member</h2>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  className="w-full glass-input px-4 py-2 rounded-xl border border-gray-200" 
                  placeholder="e.g. John Doe" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Role</label>
                <select 
                  value={role} 
                  onChange={e => setRole(e.target.value)} 
                  className="w-full glass-input px-4 py-2 rounded-xl border border-gray-200 bg-transparent"
                >
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <button type="submit" className="glass-button w-full py-3 rounded-xl font-bold mt-2">
                Add Team Member
              </button>
            </form>
          </div>
        </div>

        <div className="xl:col-span-3">
          <div className="glass-panel p-6 rounded-2xl bg-white/60">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Team Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {staff.map(member => (
                <div key={member.id} className="bg-white/40 border border-gray-100 rounded-2xl p-4 relative group">
                  <button 
                    onClick={() => deleteStaff(member.id)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-gray-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 leading-tight">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                    <select 
                      value={member.status}
                      onChange={(e) => updateStaffStatus(member.id, e.target.value)}
                      className="text-xs bg-transparent text-gray-500 font-semibold outline-none cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="On Break">On Break</option>
                      <option value="Offline">Offline</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
