const path = require("path");

// Static image map (replace with Gemini API call later)
const IMAGE_MAP = {
  "light yagami":       "Light Yagami.png",
  "aliens in space":    "Aliens in Space.png",
  "angry naruto":       "AngryNauroto.png",
  "cat playing guitar": "Cat Playing Guitar.png",
  "laughing dog":       "Laughing Dog.png",
};

// POST /api/image/generate
const generateImage = (req, res) => {
  const choice = req.body.message?.toLowerCase().trim();

  if (!choice) {
    return res.status(400).json({ error: "message is required" });
  }

  const filename = IMAGE_MAP[choice];

  if (!filename) {
    return res.status(400).json({
      error: "Invalid choice.",
      valid_options: Object.keys(IMAGE_MAP),
    });
  }

  const imagePath = path.join(__dirname, "..", "images", filename);
  res.sendFile(imagePath);
};

module.exports = { generateImage };
