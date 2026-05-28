const Order = require("../models/Order");
const Cart  = require("../models/Cart");

// POST /api/orders  — place order (optionally from cart)
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, fromCart = false } = req.body;

    let orderItems = items;

    // If checkout from cart, pull items directly from DB
    if (fromCart) {
      const cart = await Cart.findOne({ user: req.user._id });
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }
      orderItems = cart.items;
    }

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      shippingAddress,
    });

    // Clear cart after successful order if checked out from cart
    if (fromCart) {
      await Cart.findOneAndDelete({ user: req.user._id });
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders  — all orders for current user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.design", "prompt imagePath")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/:id  — single order detail
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate(
      "items.design",
      "prompt imagePath"
    );

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById };
