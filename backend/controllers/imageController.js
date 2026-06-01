// controllers/imageController.js

const generateImage = async (req, res) => {
  const prompt = req.body.message?.trim();

  if (!prompt) {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const encodedPrompt = encodeURIComponent(
      `hoodie graphic design, ${prompt}, high quality, centered, flat design, white background`
    );

    const hfRes = await fetch(
      `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true`,
      { method: "GET" }
    );

    if (!hfRes.ok) {
      return res.status(500).json({ error: "Image generation failed" });
    }

    const arrayBuffer = await hfRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set("Content-Type", "image/jpeg");
    res.send(buffer);

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { generateImage };