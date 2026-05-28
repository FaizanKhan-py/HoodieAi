const Design = require("../models/Design");

// GET /api/designs
const getDesigns = async (req, res) => {
  try {
    const designs = await Design.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/designs
const createDesign = async (req, res) => {
  try {
    const { prompt, imagePath, style, color, size } = req.body;

    if (!prompt || !imagePath) {
      return res.status(400).json({ error: "prompt and imagePath are required" });
    }

    const design = await Design.create({
      user: req.user._id,
      prompt,
      imagePath,
      style,
      color,
      size,
    });

    res.status(201).json(design);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/designs/:id/save  — toggle isSaved
const toggleSave = async (req, res) => {
  try {
    const design = await Design.findOne({ _id: req.params.id, user: req.user._id });

    if (!design) return res.status(404).json({ error: "Design not found" });

    design.isSaved = !design.isSaved;
    await design.save();

    res.json(design);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/designs/:id
const deleteDesign = async (req, res) => {
  try {
    const design = await Design.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!design) return res.status(404).json({ error: "Design not found" });

    res.json({ message: "Design deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDesigns, createDesign, toggleSave, deleteDesign };
