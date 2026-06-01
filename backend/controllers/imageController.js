// controllers/imageController.js

const generateImage = async (req, res) => {
  const prompt = req.body.message?.trim();

  if (!prompt) {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `hoodie graphic design, ${prompt}, high quality, centered, flat design, white background`,
        }),
      }
    );

    // Model is still loading (cold start) — tell frontend to retry
    if (hfRes.status === 503) {
      return res.status(503).json({ error: "Model loading, please retry in 20 seconds" });
    }

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      console.error("HF Error:", errText);
      return res.status(500).json({ error: "Image generation failed" });
    }

    // Stream the image blob directly back to frontend
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