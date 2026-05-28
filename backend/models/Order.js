const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    design:   { type: mongoose.Schema.Types.ObjectId, ref: "Design", required: true },
    size:     { type: String, required: true },
    color:    { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price:    { type: Number, required: true },
  },
  { _id: true }
);

const orderSchema = new mongoose.Schema(
  {
    user:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],

    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "in_production", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    shippingAddress: {
      street:  { type: String },
      city:    { type: String },
      state:   { type: String },
      zip:     { type: String },
      country: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
