"use client";

import { useState } from "react";

export default function Settings() {
  const [restaurantName, setRestaurantName] = useState("Aura Bistro");
  const [address, setAddress] = useState("123 Gourmet Street, Food City");

  const handleSave = (e) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto pr-2 pb-10 scrollbar-hide">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Settings</h1>
        <p className="text-gray-500">Configure your restaurant profile and application preferences.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Restaurant Profile */}
        <div className="glass-panel p-8 rounded-3xl bg-white/60 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            Restaurant Profile
          </h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Restaurant Name</label>
              <input 
                type="text" 
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full glass-input px-4 py-3 rounded-2xl border-gray-200 focus:border-orange-500 transition-all font-bold text-gray-700 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Business Address</label>
              <textarea 
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full glass-input px-4 py-3 rounded-2xl border-gray-200 focus:border-orange-500 transition-all font-bold text-gray-700 outline-none resize-none"
              ></textarea>
            </div>
            <button type="submit" className="glass-button px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest">
              Save Profile
            </button>
          </form>
        </div>

        {/* Regional Settings */}
        <div className="glass-panel p-8 rounded-3xl bg-white/60 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Regional Settings
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">System Language</label>
              <select className="w-full glass-input px-4 py-3 rounded-2xl border-gray-200 focus:border-orange-500 transition-all font-bold text-gray-700 outline-none appearance-none bg-white/50">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish (ES)</option>
                <option>French (FR)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Time Format</label>
                <select className="w-full glass-input px-4 py-3 rounded-2xl border-gray-200 focus:border-orange-500 transition-all font-bold text-gray-700 outline-none appearance-none bg-white/50">
                  <option>12 Hour (AM/PM)</option>
                  <option>24 Hour</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">First Day of Week</label>
                <select className="w-full glass-input px-4 py-3 rounded-2xl border-gray-200 focus:border-orange-500 transition-all font-bold text-gray-700 outline-none appearance-none bg-white/50">
                  <option>Sunday</option>
                  <option>Monday</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Service & Tipping */}
        <div className="glass-panel p-8 rounded-3xl bg-white/60 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Service & Billing
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-gray-100">
              <div>
                <p className="font-bold text-gray-800 text-sm">Enable Tipping</p>
                <p className="text-xs text-gray-500">Ask for gratuity during checkout</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-orange-500 relative cursor-pointer shadow-inner">
                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm"></div>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Auto-Service Charge (%)</label>
              <div className="flex items-center gap-3">
                <input type="number" defaultValue="10" className="w-24 glass-input px-4 py-3 rounded-2xl border-gray-200 focus:border-orange-500 transition-all font-bold text-gray-700 outline-none" />
                <span className="font-bold text-gray-500 text-sm">% applied to all orders</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tipping Suggestions (%)</label>
              <div className="flex gap-2">
                {["15", "18", "20", "25"].map(tip => (
                  <div key={tip} className="flex-1 p-2 rounded-xl border border-gray-200 bg-white/50 text-center text-xs font-bold text-gray-600">
                    {tip}%
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Receipt Customization */}
        <div className="lg:col-span-1 glass-panel p-8 rounded-3xl bg-white/60 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Receipt Settings
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Footer Message</label>
              <input type="text" defaultValue="Thank you for dining with us!" className="w-full glass-input px-4 py-3 rounded-2xl border-gray-200 focus:border-orange-500 transition-all font-bold text-gray-700 outline-none" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-gray-100">
              <div>
                <p className="font-bold text-gray-800 text-sm">Print Item Modifiers</p>
                <p className="text-xs text-gray-500">Show extra instructions on receipt</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-gray-200 relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* App Appearance */}
        <div className="lg:col-span-1 glass-panel p-8 rounded-3xl bg-white/60 shadow-sm flex flex-col h-full">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
            Application Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl border-2 border-orange-500 bg-orange-50/50 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-orange-500 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" /></svg>
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm">Light Mode</p>
                <p className="text-xs text-gray-500">Currently Active</p>
              </div>
            </div>
            
            <div className="p-4 rounded-2xl border border-gray-200 bg-white/40 flex flex-col gap-3 opacity-50 cursor-not-allowed grayscale">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              </div>
              <div>
                <p className="font-black text-gray-400 text-sm">Dark Mode</p>
                <p className="text-xs text-gray-400 italic">Coming Soon</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 bg-white/40 flex flex-col gap-3">
               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm">Print KOT</p>
                <p className="text-xs text-gray-500">Auto-print Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
