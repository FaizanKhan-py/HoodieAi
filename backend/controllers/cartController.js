const Cart = require("../models/Cart");

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.design",
      "prompt imagePath"
    );

    // Return empty cart if none exists yet
    if (!cart) return res.json({ items: [], total: 0 });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart  — add item
const addToCart = async (req, res) => {
  try {
    const { design, size, color, quantity = 1, price } = req.body;

    if (!design || !size || !color || !price) {
      return res.status(400).json({ error: "design, size, color, price are required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // First item ever — create cart
      cart = await Cart.create({
        user: req.user._id,
        items: [{ design, size, color, quantity, price }],
      });
    } else {
      // Check if exact same design+size+color already in cart
      const existingIndex = cart.items.findIndex(
        (item) =>
          item.design.toString() === design &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex > -1) {
        // Increment quantity
        cart.items[existingIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ design, size, color, quantity, price });
      }

      await cart.save();
    }

    await cart.populate("items.design", "prompt imagePath");
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/cart/:itemId  — update quantity
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "quantity must be >= 1" });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.design", "prompt imagePath");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart/:itemId  — remove one item
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );

    await cart.save();
    await cart.populate("items.design", "prompt imagePath");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart  — clear entire cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
