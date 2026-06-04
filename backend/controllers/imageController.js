const generateImage = async (req, res) => {
  const prompt = req.body.message?.trim();
  if (!prompt) {
    return res.status(400).json({ error: "message is required" });
  }

  const fullPrompt = `${prompt}, graphic design artwork, sticker style, pure white background, centered, clean illustration, no text, t-shirt print ready`;

  try {
    console.log("Generating for prompt:", prompt);

    const accountId = process.env.CF_ACCOUNT_ID;
    const apiToken = process.env.CF_API_TOKEN;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: fullPrompt }),
        signal: AbortSignal.timeout(60000),
      }
    );

    console.log("Status:", response.status);

    if (!response.ok) {
      const err = await response.text();
      console.error("CF Error:", err);
      return res.status(500).json({ error: "Image generation failed" });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Send as PNG instead of JPEG
    res.set("Content-Type", "image/png");
    res.send(buffer);

  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
};

module.exports = { generateImage };