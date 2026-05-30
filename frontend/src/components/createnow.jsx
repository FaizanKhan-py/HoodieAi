import { useEffect, useState } from 'react';
import defaultimg from '../Pictures/Defualthoodie.png';

function Creatnow() {
  const [choice, setChoice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const generateImage = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/image/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: choice.toLowerCase() })
      });

      if (!res.ok) {
        setLoading(false);
        setError("Invalid choice. Try one of the allowed images");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setTimeout(() => {
        setImageUrl(url);
        setLoading(false);
      }, 2000);

    } catch (err) {
      console.error(err);
      setError("Error fetching image");
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen w-full">

      {/* ── MOBILE LAYOUT ── */}
      <div className="flex flex-col md:hidden mt-9">

        {/* Mobile: Image on top */}
        <div className="relative w-full h-72 flex items-center justify-center bg-white/5 rounded-b-3xl overflow-hidden">
          <img
            src={imageUrl || defaultimg}
            alt="Hoodie"
            className="h-full w-full object-cover"
          />
          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
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
                    onChange={() => setSelectedColor(value)}
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
              className="flex-1 py-3 border border-purple-500 hover:bg-purple-500/20 active:scale-95 rounded-2xl font-semibold text-purple-300 transition-all duration-200 text-sm"
            >
              Place Order
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
            className="border border-white/10 bg-white/9 text-lg rounded-2xl p-5 w-full h-52 focus:outline-none  resize-none placeholder-gray-500"
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
                    onChange={() => setSelectedColor(value)}
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
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 active:scale-95 rounded-2xl font-semibold text-white transition-all duration-200 text-base"
            >
               Generate Design
            </button>
            <button
              className="px-8 py-3 border border-purple-500 hover:bg-purple-500/20 active:scale-95 rounded-2xl font-semibold text-purple-300 transition-all duration-200 text-base"
            >
              Place Order
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
          {/* Glow behind image */}
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