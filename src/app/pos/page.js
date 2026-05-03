"use client";

import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import Cart from "../../components/Cart";
import { useMenu } from "../../context/MenuContext";
import { useTable } from "../../context/TableContext";
import { useOrder } from "../../context/OrderContext";
import { useStaff } from "../../context/StaffContext";

export default function POS() {
  const { products, categories } = useMenu();
  const { updateTableStatus, tables } = useTable();
  const { addOrder } = useOrder();
  const { staff } = useStaff();
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTableId, setSelectedTableId] = useState("");
  const [selectedStaffId, setSelectedStaffId] = useState("");

  const filteredProducts = products.filter(p => 
    (activeCategory === "All" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleCheckout = () => {
    if (!selectedTableId) {
      alert("Please select a Table before sending to kitchen!");
      return;
    }
    if (!selectedStaffId) {
      alert("Please select a Staff member!");
      return;
    }

    const table = tables.find(t => t.id === parseInt(selectedTableId));
    const member = staff.find(s => s.id === parseInt(selectedStaffId));
    
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;

    addOrder({
      tableId: parseInt(selectedTableId),
      tableName: table?.name || "Table",
      staffName: member?.name || "Unknown",
      items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
      total: subtotal + tax,
      status: "Pending"
    });
    
    updateTableStatus(parseInt(selectedTableId), "Occupied");
    alert(`Order sent to kitchen! Check the Order History tab.`);
    setCart([]);
    setSelectedTableId("");
    setSelectedStaffId("");
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-1 tracking-tight">Order POS</h1>
            <p className="text-gray-400 font-medium">Select items to build a new guest order.</p>
          </div>
          
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search dishes, drinks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input pl-11 pr-4 py-3 rounded-2xl w-full lg:w-80 border-2 border-gray-100 focus:border-orange-500 transition-all outline-none shadow-sm"
            />
            <svg className="w-5 h-5 absolute left-4 top-3.5 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </header>

        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl whitespace-nowrap transition-all font-bold text-sm tracking-wide ${
                activeCategory === cat 
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200 border-none"
                  : "bg-white/60 border border-gray-100 text-gray-500 hover:text-orange-600 hover:bg-white hover:border-orange-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={handleAddToCart}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500 font-medium">
              No menu items found matching your search.
            </div>
          )}
        </div>
      </div>

      <Cart 
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        selectedTableId={selectedTableId}
        setSelectedTableId={setSelectedTableId}
        selectedStaffId={selectedStaffId}
        setSelectedStaffId={setSelectedStaffId}
      />
    </div>
  );
}
