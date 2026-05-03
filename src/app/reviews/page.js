"use client";

const MOCK_REVIEWS = [
  { id: 1, customer: "Alex Mercer", rating: 5, date: "2026-05-01", text: "Absolutely love the Spicy Chicken Burger! Perfectly cooked and the sauce is amazing.", product: "Spicy Chicken Burger" },
  { id: 2, customer: "Sarah Connor", rating: 4, date: "2026-04-28", text: "Great truffle fries, lots of flavor. Took a bit long to get our drinks but worth it.", product: "Truffle Parmesan Fries" },
  { id: 3, customer: "John Doe", rating: 5, date: "2026-04-25", text: "The pizza crust is perfect. Everyone asked where we got it.", product: "Margherita Pizza" },
  { id: 4, customer: "Jane Smith", rating: 3, date: "2026-04-20", text: "The lava cake was good but a bit too sweet for my taste.", product: "Chocolate Lava Cake" },
];

export default function Reviews() {
  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Feedback</h1>
          <p className="text-gray-500">Monitor ratings and dining experiences.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/60 px-6 py-3 rounded-xl flex items-center gap-3 border border-gray-200">
            <span className="text-2xl font-bold text-gray-800">4.6</span>
            <div className="flex text-yellow-500">
              {'★'.repeat(4)}{'☆'}
            </div>
            <span className="text-gray-500 text-sm font-medium">Average Rating</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-10">
        {MOCK_REVIEWS.map((review) => (
          <div key={review.id} className="glass-panel p-6 rounded-2xl flex flex-col bg-white/40 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-gray-800 font-semibold">{review.customer}</h3>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
              <div className="flex text-yellow-500 text-sm">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
            </div>
            
            <p className="text-gray-600 text-sm flex-1 mb-4 font-medium">"{review.text}"</p>
            
            <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-xs">
              <span className="text-gray-500">Item: <span className="text-orange-600 font-semibold">{review.product}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
