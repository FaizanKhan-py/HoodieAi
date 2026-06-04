const generateImage = async (req, res) => {
  const prompt = req.body.message?.trim();
  if (!prompt) {
    return res.status(400).json({ error: "message is required" });
  }

  const fullPrompt = `${prompt}, graphic design artwork, sticker style, white background, centered, clean illustration, no text, t-shirt print ready`;

  try {
    console.log("Generating for prompt:", prompt);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
          "x-wait-for-model": "true",
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            width: 512,
            height: 512,
            num_inference_steps: 20,
            guidance_scale: 7.5,
          },
        }),
        signal: AbortSignal.timeout(120000), // 2 min timeout
      }
    );

    console.log("Status:", response.status);

    if (!response.ok) {
      const err = await response.text();
      console.error("HF Error:", err);
      return res.status(500).json({ error: "Image generation failed", detail: err });
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