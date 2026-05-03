"use client";

import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [categories, setCategories] = useState([
    "All", "Starters", "Mains", "Desserts", "Beverages"
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "Spicy Chicken Burger", price: 12.99, category: "Mains", stock: 24, isVeg: false, image: "/products/burger.png" },
    { id: 2, name: "Truffle Parmesan Fries", price: 6.99, category: "Starters", stock: 40, isVeg: true, image: "/products/fries.png" },
    { id: 3, name: "Margherita Pizza", price: 14.99, category: "Mains", stock: 15, isVeg: true, image: "/products/pizza.png" },
    { id: 4, name: "Craft Cola", price: 3.99, category: "Beverages", stock: 50, isVeg: true, image: "/products/cola.png" },
    { id: 5, name: "Chocolate Lava Cake", price: 8.99, category: "Desserts", stock: 12, isVeg: true, image: "/products/cake.png" },
    { id: 6, name: "Caesar Salad", price: 9.99, category: "Starters", stock: 20, isVeg: false, image: "/products/salad.png" },
  ]);

  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
    }
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now() // Simple unique ID generation
    };
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <MenuContext.Provider value={{
      categories,
      products,
      addCategory,
      addProduct,
      deleteProduct
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
