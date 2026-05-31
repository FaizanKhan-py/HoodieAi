import { useState } from 'react';
import { Link } from 'react-router-dom';

// dummy data for now — replace with real cart state/API later
const initialItems = [
  {
    id: 1,
    title: "Light Yagami",
    color: "Black",
    size: "M",
    price: 3000,
    quantity: 1,
    image: null, // replace with actual image url
  },
];

export default function Cart() {
  const [items, setItems] = useState(initialItems);

  const updateQuantity = (id, delta) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen w-full px-5 md:px-20 py-10">

      <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Cart</h1>
      <p className="text-gray-400 text-sm mb-8">
        {items.length === 0 ? "No items in cart" : `${items.length} item${items.length > 1 ? "s" : ""}`}
      </p>

      {items.length === 0 ? (
        /* ── EMPTY STATE ── */
        <div className="flex flex-col items-center justify-center gap-5 mt-24 text-center">
          <p className="text-6xl">🛒</p>
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-gray-400">Looks like you haven't added anything yet.</p>
          <Link to="/create">
            <button className="mt-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-2xl font-semibold transition">
              Create a Hoodie
            </button>
          </Link>
        </div>

      ) : (
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── ITEMS LIST ── */}
          <div className="flex-1 flex flex-col gap-4">
            {items.map(item => (
              <div
                key={item.id}
                className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                {/* Image */}
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-base">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-0.5">
                        Color: {item.color} · Size: {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cursor-pointer text-gray-500 hover:text-red-400 transition text-lg leading-none"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-white/10 rounded-xl px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-lg font-bold hover:text-purple-400 transition cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-lg font-bold hover:text-purple-400 transition cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="font-semibold text-purple-300">
                      ₨ {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div className="lg:w-80 bg-white/5 border border-white/10 rounded-2xl p-6 h-fit flex flex-col gap-5">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₨ {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Time</span>
                <span>5–7 business days</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-purple-300">₨ {total.toLocaleString()}</span>
            </div>

            <button className="cursor-pointer w-full py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-2xl font-semibold text-white transition-all duration-200">
              Place Order
            </button>

            <p className="text-xs text-gray-500 text-center">
              Payment: Cash on Delivery · Easypaisa · JazzCash
            </p>
          </div>

        </div>
      )}
    </div>
  );
}