"use client";

import { createContext, useContext, useState } from "react";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [tables, setTables] = useState([
    { id: 1, name: "Table 1", capacity: 2, status: "Available" },
    { id: 2, name: "Table 2", capacity: 4, status: "Occupied" },
    { id: 3, name: "Table 3", capacity: 4, status: "Available" },
    { id: 4, name: "Table 4", capacity: 6, status: "Reserved" },
    { id: 5, name: "Booth 1", capacity: 4, status: "Available" },
    { id: 6, name: "Booth 2", capacity: 4, status: "Occupied" },
    { id: 7, name: "Patio 1", capacity: 2, status: "Available" },
    { id: 8, name: "Patio 2", capacity: 8, status: "Available" },
  ]);

  const addTable = (table) => {
    const newTable = {
      ...table,
      id: Date.now()
    };
    setTables([...tables, newTable]);
  };

  const deleteTable = (id) => {
    setTables(tables.filter(t => t.id !== id));
  };

  const updateTableStatus = (id, status) => {
    setTables(tables.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <TableContext.Provider value={{
      tables,
      addTable,
      deleteTable,
      updateTableStatus
    }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  return useContext(TableContext);
}
