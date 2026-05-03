"use client";

export default function ProductCard({ product, onAdd }) {
  return (
    <div
      onClick={() => onAdd(product)}
      className="glass-panel group relative flex flex-col rounded-[2rem] p-2 bg-white/60 hover:bg-white/90 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-100/50 cursor-pointer overflow-hidden border border-white/50 active:scale-[0.98]"
    >
      {/* Visual Header: Image & Price Badge */}
      <div className="relative h-44 w-full rounded-[1.75rem] overflow-hidden mb-3 shadow-inner">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Elegant Price Badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl shadow-black/5 border border-white">
          <span className="text-orange-600 font-black text-sm tracking-tight italic">
            ₹{product.price.toFixed(0)}
          </span>
        </div>

        {/* Traditional Diet Indicator */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md p-1.5 rounded-xl border border-white/50">
          <div className={`w-3.5 h-3.5 border-2 flex items-center justify-center rounded-sm ${product.isVeg ? 'border-green-600' : 'border-red-600'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${product.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
          </div>
        </div>

        {/* Quick-Add Interaction Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-full shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="px-3 pb-3 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-black text-gray-900 text-lg leading-tight tracking-tight group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{product.category}</p>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Add to cart</span>
            <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5-5 5M6 7l5 5-5 5" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
