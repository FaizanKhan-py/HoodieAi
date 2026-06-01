const generateImage = async (req, res) => {
  const prompt = req.body.message?.trim();
  if (!prompt) {
    return res.status(400).json({ error: "message is required" });
  }

  const fullPrompt = `${prompt}, graphic design artwork, sticker style, white background, centered, clean illustration, no text, t-shirt print ready`;

  try {
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&model=flux`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: "Image generation failed" });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.set("Content-Type", "image/jpeg");
    res.send(buffer);

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { generateImage };