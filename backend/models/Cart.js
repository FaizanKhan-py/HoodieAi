const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    design:   { type: mongoose.Schema.Types.ObjectId, ref: "Design", required: true },
    size:     { type: String, enum: ["S", "M", "L", "XL", "XXL"], required: true },
    color:    { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    price:    { type: Number, required: true },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    user:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

// Virtual: total price of cart
cartSchema.virtual("total").get(function () {
  return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

cartSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Cart", cartSchema);
