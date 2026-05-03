"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ICONS = {
  dashboard: (
    <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  pos: (
    <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  inventory: (
    <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  staff: (
    <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  tables: (
    <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  orders: (
    <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  reviews: (
    <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  settings: (
    <svg className="w-[22px] h-[22px] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(false);

  const navItems = [
    { name: "Overview", path: "/", icon: ICONS.dashboard },
    { name: "Point of Sale", path: "/pos", icon: ICONS.pos },
    { name: "Order History", path: "/orders", icon: ICONS.orders },
    { name: "Menu Setup", path: "/menu", icon: ICONS.inventory },
    { name: "Dining Tables", path: "/tables", icon: ICONS.tables },
    { name: "Staff Members", path: "/staff", icon: ICONS.staff },
    { name: "Settings", path: "/settings", icon: ICONS.settings },
  ];

  return (
    <div 
      className={`h-full glass-panel flex flex-col transition-[width] duration-300 ease-in-out relative z-10 border-t-0 border-l-0 border-b-0 will-change-[width] ${
        isMinimized ? "w-20" : "w-[260px]"
      }`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute -right-3.5 top-9 w-7 h-7 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors z-20"
      >
        <svg 
          className={`w-3.5 h-3.5 transition-transform duration-300 ${isMinimized ? "rotate-180" : ""}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Branding */}
      <div className={`h-24 flex items-center ${isMinimized ? "justify-center px-0" : "px-8"} transition-all mt-4`}>
        {isMinimized ? (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-400 to-red-500 text-white flex items-center justify-center font-bold text-lg">
            A
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 tracking-tight">AURA BISTRO</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mt-0.5">Management</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide pt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              title={isMinimized ? item.name : ""}
              className={`flex items-center rounded-xl transition-all duration-200 group ${
                isMinimized ? "justify-center p-3" : "px-4 py-3 gap-3"
              } ${
                isActive
                  ? "bg-white border border-gray-100 text-orange-600 font-bold"
                  : "text-gray-500 hover:bg-white/40 hover:text-gray-800 font-medium"
              }`}
            >
              <div className={`${isActive ? "text-orange-500" : "text-gray-400 group-hover:text-gray-700"} transition-colors`}>
                {item.icon}
              </div>
              
              {!isMinimized && (
                <span className="truncate">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 mb-2">
        <div className={`p-2 rounded-xl flex items-center gap-3 transition-all ${
          isMinimized ? "justify-center" : "bg-white/60 border border-gray-100"
        }`}>
          <div className="w-10 h-10 shrink-0 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
            MC
          </div>
          {!isMinimized && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">Mark Chef</p>
              <p className="text-[11px] text-gray-500 font-medium truncate">Store Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
