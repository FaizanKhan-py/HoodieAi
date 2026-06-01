import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = ({ prompt, image, color }) => {
    const newItem = {
      id: Date.now(),           // unique id based on timestamp
      title: prompt,            // the text prompt becomes the item title
      image: image,             // blob URL from generateImage
      color: color,
      size: "M",                // default size — you can expose this later
      price: 3000,              // default price — update when you have real pricing
      quantity: 1,
    };
    setItems(prev => [...prev, newItem]);
  };

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

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
