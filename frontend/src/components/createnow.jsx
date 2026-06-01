import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultimg from '../Pictures/Defualthoodie.png';
import { useCart } from '../Context/CartContext';

function Creatnow() {
  const [choice, setChoice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState("black");
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // ── Merge AI graphic onto hoodie canvas ──
const mergeWithHoodie = (designUrl, hoodieColor) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 580;
    const ctx = canvas.getContext("2d");

    const hoodie = new Image();
    hoodie.src = defaultimg;

    hoodie.onload = () => {
      // Draw base hoodie
      ctx.drawImage(hoodie, 0, 0, 500, 580);

      // Apply color tint
      if (hoodieColor === "white") {
        ctx.globalCompositeOperation = "lighten";
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fillRect(0, 0, 500, 580);
        ctx.globalCompositeOperation = "source-over";
      } else if (hoodieColor === "red") {
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = "rgba(180,30,30,0.8)";
        ctx.fillRect(0, 0, 500, 580);
        ctx.globalCompositeOperation = "source-over";
      }

      // Draw AI design on chest
      const design = new Image();
      design.src = designUrl;

      design.onload = () => {
        const designSize = 160;
        const x = (500 - designSize) / 2;
        const y = 230; // chest position

        // ── TEMP CANVAS (REMOVE WHITE BACKGROUND) ──
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = designSize;
        tempCanvas.height = designSize;

        const tempCtx = tempCanvas.getContext("2d");

        tempCtx.drawImage(design, 0, 0, designSize, designSize);

        const imageData = tempCtx.getImageData(0, 0, designSize, designSize);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const isWhite =
            r > 235 &&
            g > 235 &&
            b > 235 &&
            Math.abs(r - g) < 10 &&
            Math.abs(g - b) < 10;

          if (isWhite) {
            data[i + 3] = 0; // make transparent
          }
        }

        tempCtx.putImageData(imageData, 0, 0);

        // Draw cleaned design on hoodie
        ctx.drawImage(tempCanvas, x, y, designSize, designSize);

        resolve(canvas.toDataURL("image/png"));
      };

      design.onerror = () => {
        resolve(canvas.toDataURL("image/png"));
      };
    };
  });
};

  const generateImage = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setImageUrl("");
    setAdded(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/image/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: choice.toLowerCase() })
      });

      if (!res.ok) {
        setLoading(false);
        if (res.status === 503) {
          setError("Model is warming up, please try again in 20 seconds.");
        } else {
          setError("Failed to generate image. Try a different prompt.");
        }
        return;
      }

      const blob = await res.blob();
      const designUrl = URL.createObjectURL(blob);

      // Overlay design on hoodie
      const mergedUrl = await mergeWithHoodie(designUrl, selectedColor || "black");
      setImageUrl(mergedUrl);
      setLoading(false);

    } catch (err) {
      console.error(err);
      setError("Error fetching image");
      setLoading(false);
    }
  };

  // Re-merge when color changes (if image already generated)
  const handleColorChange = async (color) => {
    setSelectedColor(color);
    if (imageUrl) {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/image/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: choice.toLowerCase() })
      });
      if (res.ok) {
        const blob = await res.blob();
        const designUrl = URL.createObjectURL(blob);
        const mergedUrl = await mergeWithHoodie(designUrl, color);
        setImageUrl(mergedUrl);
      }
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!imageUrl) {
      setError("Please generate a design first.");
      return;
    }
    if (!selectedColor) {
      setError("Please select a hoodie color.");
      return;
    }

    addToCart({
      prompt: choice,
      image: imageUrl,
      color: selectedColor,
    });

    setAdded(true);
    setTimeout(() => navigate("/cart"), 800);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full">

      {/* ── MOBILE LAYOUT ── */}
      <div className="flex flex-col md:hidden mt-9">

        {/* Mobile: Image on top */}
        <div className="relative w-full flex items-center justify-center pt-4">
          <img
            src={imageUrl || defaultimg}
            alt="Hoodie"
            className="w-72 h-72 object-contain rounded-3xl"
          />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-white text-sm font-medium tracking-widest uppercase">Generating...</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Form below */}
        <div className="px-5 pt-7 pb-10 flex flex-col gap-5">

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Design Your Hoodie</h1>
            <p className="text-gray-400 text-sm mt-1">Describe it. Generate it. Wear it.</p>
          </div>

          <textarea
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
            className="border border-white/10 bg-white/5 text-base rounded-2xl p-4 w-full h-36 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none placeholder-gray-500"
            placeholder="Try 'Cat Playing Guitar', 'Light Yagami', 'Aliens in Space'..."
          />

          {/* Color picker */}
          <div>
            <p className="text-base font-semibold mb-3 text-gray-200">Hoodie Color</p>
            <div className="flex gap-4">
              {[
                { value: "black", bg: "bg-black", border: "border-gray-700" },
                { value: "white", bg: "bg-white", border: "border-gray-300" },
                { value: "red", bg: "bg-red-700", border: "border-red-800" },
              ].map(({ value, bg, border }) => (
                <label key={value} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="color"
                    value={value}
                    className="hidden"
                    onChange={() => handleColorChange(value)}
                  />
                  <div className={`
                    w-9 h-9 rounded-xl ${bg} border-2 ${border}
                    transition-all duration-200
                    ${selectedColor === value
                      ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-black scale-110"
                      : "opacity-70 group-hover:opacity-100"}
                  `} />
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-1">
            <button
              onClick={generateImage}
              className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-2xl font-semibold text-white transition-all duration-200 text-sm"
            >
              Generate
            </button>
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 border active:scale-95 rounded-2xl font-semibold transition-all duration-200 text-sm
                ${added
                  ? "border-green-500 text-green-400 bg-green-500/10"
                  : "border-purple-500 hover:bg-purple-500/20 text-purple-300"
                }`}
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex min-h-screen">

        {/* Left */}
        <div className="w-1/2 flex flex-col justify-center px-16 py-16 gap-8">

          <div>
            <h1 className="font-bold text-5xl tracking-tight leading-tight">
              Design Your<br />
              <span className="text-purple-400">Hoodie</span>
            </h1>
            <p className="text-gray-400 mt-2 text-lg">Describe it. Generate it. Wear it.</p>
          </div>

          <textarea
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
            className="border border-white/10 bg-white/9 text-lg rounded-2xl p-5 w-full h-52 focus:outline-none resize-none placeholder-gray-500"
            placeholder="Try 'Cat Playing Guitar', 'Light Yagami', 'Aliens in Space'..."
          />

          {/* Color picker */}
          <div>
            <p className="text-lg font-semibold mb-4 text-gray-200">Hoodie Color</p>
            <div className="flex gap-5">
              {[
                { value: "black", bg: "bg-black", border: "border-gray-700" },
                { value: "white", bg: "bg-white", border: "border-gray-300" },
                { value: "red", bg: "bg-red-700", border: "border-red-800" },
              ].map(({ value, bg, border }) => (
                <label key={value} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="color"
                    value={value}
                    className="hidden"
                    onChange={() => handleColorChange(value)}
                  />
                  <div className={`
                    w-10 h-10 rounded-xl ${bg} border-2 ${border}
                    transition-all duration-200
                    ${selectedColor === value
                      ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-black scale-110"
                      : "opacity-70 group-hover:opacity-100"}
                  `} />
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={generateImage}
              className="cursor-pointer px-8 py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-2xl font-semibold text-white transition-all duration-200 text-base"
            >
              Generate Design
            </button>
            <button
              onClick={handleAddToCart}
              className={`cursor-pointer px-8 py-3 border active:scale-95 rounded-2xl font-semibold transition-all duration-200 text-base
                ${added
                  ? "border-green-500 text-green-400 bg-green-500/10"
                  : "border-purple-500 hover:bg-purple-500/20 text-purple-300"
                }`}
            >
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="w-1/2 flex items-center justify-center relative">
          <div className="absolute w-80 h-80 bg-purple-700/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
            <img
              src={imageUrl || defaultimg}
              alt="Hoodie"
              className="w-[420px] h-[480px] object-cover"
            />

            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm gap-4">
                <div className="w-14 h-14 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-white text-sm font-medium tracking-widest uppercase">Generating...</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Creatnow;