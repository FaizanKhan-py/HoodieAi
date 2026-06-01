// controllers/imageController.js

const generateImage = async (req, res) => {
  const prompt = req.body.message?.trim();

  if (!prompt) {
    return res.status(400).json({ error: "message is required" });
  }

  const HF_TOKEN = process.env.HF_TOKEN; // Add this to your .env

  // Craft a strong, specific hoodie prompt
  const fullPrompt = `flat lay product photography of a black oversized hoodie, center chest graphic design: ${prompt}, white studio background, soft shadows, e-commerce product shot, high detail fabric texture, 4k, professional apparel photography`;

  const negativePrompt = `person wearing it, model, mannequin, blurry, low quality, text, watermark, distorted`;

  try {
    // Option 1: FLUX.1-schnell (fastest, great quality)
    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
          "x-wait-for-model": "true", // Wait if model is loading
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            width: 512,
            height: 512,
            num_inference_steps: 4, // FLUX schnell works great at 4 steps
            guidance_scale: 3.5,
          },
        }),
      },
    );

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      console.error("HF Error:", errText);

      // If model is loading, HF returns 503 — tell frontend to retry
      if (hfRes.status === 503) {
        return res
          .status(503)
          .json({ error: "Model loading, please retry in 20 seconds" });
      }

      return res
        .status(500)
        .json({ error: "Image generation failed", detail: errText });
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