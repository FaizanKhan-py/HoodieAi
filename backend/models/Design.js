const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    prompt:    { type: String, required: true },
    imagePath: { type: String, required: true }, // filename or future URL
    style:     { type: String, default: "default" },
    color:     { type: String, default: "black" },
    size:      { type: String, enum: ["S", "M", "L", "XL", "XXL"], default: "M" },
    isSaved:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Design", designSchema);
