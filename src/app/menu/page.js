"use client";

import { useState } from "react";
import { useMenu } from "../../context/MenuContext";

export default function MenuManagement() {
  const { categories, products, addCategory, addProduct, deleteProduct } = useMenu();
  const [newCategory, setNewCategory] = useState("");
  
  // Product Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Mains");
  const [isVeg, setIsVeg] = useState(true);
  const [image, setImage] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && newCategory.toLowerCase() !== "all") {
      addCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (name && price && category) {
      addProduct({
        name,
        price: parseFloat(price),
        category,
        stock: 100, // default stock for now
        isVeg,
        image: image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" // fallback image
      });
      setName("");
      setPrice("");
      setImage("");
      setIsVeg(true);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto pr-2 pb-10 scrollbar-hide">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Menu Setup</h1>
        <p className="text-gray-500">Manage categories and add new items to your menu.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Add Category Panel */}
        <div className="glass-panel p-6 rounded-2xl bg-white/60 flex flex-col h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add Category</h2>
          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input 
              type="text" 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Breakfast"
              className="glass-input flex-1 px-4 py-2 rounded-xl border border-gray-200 outline-none focus:border-orange-500 transition-colors min-w-0"
            />
            <button type="submit" className="glass-button px-4 py-2 rounded-xl font-bold whitespace-nowrap">
              Add
            </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.filter(c => c !== "All").map(cat => (
              <span key={cat} className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full text-xs font-semibold break-all">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Add Product Panel */}
        <div className="xl:col-span-2 glass-panel p-6 rounded-2xl bg-white/60">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Item</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Item Name</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full glass-input px-4 py-2 rounded-xl border border-gray-200" placeholder="e.g. Avocado Toast" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Price (₹)</label>
              <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full glass-input px-4 py-2 rounded-xl border border-gray-200" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full glass-input px-4 py-2 rounded-xl border border-gray-200 bg-transparent appearance-none">
                {categories.filter(c => c !== "All").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Dietary Type</label>
              <div className="flex gap-2 h-[42px]">
                <button 
                  type="button" 
                  onClick={() => setIsVeg(true)}
                  className={`flex-1 rounded-xl text-sm font-bold border transition-colors ${isVeg ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  Veg
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsVeg(false)}
                  className={`flex-1 rounded-xl text-sm font-bold border transition-colors ${!isVeg ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  Non-Veg
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Image URL</label>
              <input required type="url" value={image} onChange={e => setImage(e.target.value)} className="w-full glass-input px-4 py-2 rounded-xl border border-gray-200" placeholder="https://..." />
            </div>
            <div className="md:col-span-2 mt-2">
              <button type="submit" className="glass-button w-full py-3 rounded-xl font-bold">Add Item to Menu</button>
            </div>
          </form>
        </div>
      </div>

      {/* Product List */}
      <div className="glass-panel p-6 rounded-2xl bg-white/60 flex-1">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Current Menu Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="pb-3 font-medium">Image</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-white/40 transition-colors">
                  <td className="py-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-xl object-cover border border-gray-100" />
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 font-medium">{product.name}</span>
                      <div className={`w-3 h-3 border flex items-center justify-center ${product.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${product.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-gray-500">{product.category}</td>
                  <td className="py-3 text-orange-600 font-semibold">₹{product.price.toFixed(2)}</td>
                  <td className="py-3 text-right">
                    <button onClick={() => deleteProduct(product.id)} className="px-3 py-1.5 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">No items in the menu.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
