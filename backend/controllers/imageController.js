const generateImage = async (req, res) => {
  const prompt = req.body.message?.trim();
  if (!prompt) {
    return res.status(400).json({ error: "message is required" });
  }

  const fullPrompt = `${prompt}, graphic design artwork, sticker style, white background, centered, clean illustration, no text, t-shirt print ready`;

  try {
    console.log("Generating for prompt:", prompt);

    const encodedPrompt = encodeURIComponent(fullPrompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&seed=42`;

    console.log("Fetching:", url);

    const response = await fetch(url, {
      signal: AbortSignal.timeout(60000), // 60s timeout
    });

    console.log("Status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));

    if (!response.ok) {
      console.error("Pollinations failed:", response.status);
      return res.status(500).json({ error: "Image generation failed" });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    res.set("Content-Type", "image/jpeg");
    res.send(buffer);

  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
};

module.exports = { generateImage };