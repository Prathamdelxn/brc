"use client";

import { createContext, useContext, useState } from "react";

const StaffContext = createContext();

export function StaffProvider({ children }) {
  const [staff, setStaff] = useState([
    { id: 1, name: "Alex Rivera", role: "Admin", status: "Active" },
    { id: 2, name: "Sarah Chen", role: "Waiter", status: "Active" },
    { id: 3, name: "Marcus Thorne", role: "Chef", status: "Active" },
    { id: 4, name: "Elena Gilbert", role: "Cashier", status: "On Break" },
  ]);

  const addStaff = (member) => {
    setStaff([...staff, { ...member, id: Date.now() }]);
  };

  const deleteStaff = (id) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const updateStaffStatus = (id, status) => {
    setStaff(staff.map(s => s.id === id ? { ...s, status } : s));
  };

  return (
    <StaffContext.Provider value={{
      staff,
      addStaff,
      deleteStaff,
      updateStaffStatus
    }}>
      {children}
    </StaffContext.Provider>
  );
}

export function useStaff() {
  return useContext(StaffContext);
}
