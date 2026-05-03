"use client";

import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([
    { 
      id: 1001, 
      tableId: 2, 
      tableName: "Table 2",
      staffName: "Alex Rivera",
      items: [
        { name: "Spicy Chicken Burger", quantity: 2, price: 12.99 },
        { name: "Craft Cola", quantity: 2, price: 3.99 }
      ],
      total: 33.96,
      status: "Preparing",
      timestamp: new Date().toISOString()
    }
  ]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1001,
      timestamp: new Date().toISOString()
    };
    setOrders([newOrder, ...orders]);
    return newOrder;
  };

  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
