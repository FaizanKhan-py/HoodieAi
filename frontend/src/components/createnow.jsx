import { useEffect, useState } from 'react';
import defaultimg from '../Pictures/Defualthoodie.png';

function Creatnow() {
  const [choice, setChoice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch("http://localhost:5000/api/imagegeneration", {
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
    <div className="min-h-screen w-full flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-10">

        <h1 className="font-bold text-2xl md:text-5xl mb-8">
          Design Your Hoodie
        </h1>

        <textarea
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          className="border text-xl rounded-2xl p-4 w-full h-40 md:h-52 mb-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe your Design..  for now try 'Cat Playing Guitar'.'Light Yagami','Aliens in Space',"
        />

        {/* COLORS */}
        <div className="mb-8">
          <p className="mb-3 text-xl md:text-2xl font-semibold">Color</p>

          <div className="flex gap-5">
            <label>
              <input type="radio" name="color" value="black" className="hidden peer" />
              <div className="w-8 h-8 bg-black border-3 border-black peer-checked:border-purple-600 rounded-md cursor-pointer"></div>
            </label>

            <label>
              <input type="radio" name="color" value="white" className="hidden peer" />
              <div className="w-8 h-8 bg-white border-3 border-white peer-checked:border-purple-600 rounded-md cursor-pointer"></div>
            </label>

            <label>
              <input type="radio" name="color" value="red" className="hidden peer" />
              <div className="w-8 h-8 bg-red-700 border-3 border-red-700 peer-checked:border-purple-600 rounded-md cursor-pointer"></div>
            </label>
          </div>
        </div>

        <div className='flex justify-between'>
 <button
          onClick={generateImage}
          className=" cursor-pointer w-full md:w-fit px-4 py-2 border-1 border-purple-500 bg-purple-500 rounded-3xl font-semibold hover:bg-blue-900 hover:border-blue-900 transition"
        >
          Generate Design
        </button>

         <button
          
          className="cursor-pointer w-full md:w-fit px-4 py-2 border-1 border-purple-500 bg-purple-500 rounded-3xl font-semibold hover:bg-blue-900 hover:border-blue-900 transition"
        >
          Place Order 
        </button>
        </div>
       

        {error && (
          <p className="text-red-500 mt-4 font-medium">{error}</p>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative bg-transparent">

        <div className="relative">
          <img
            src={imageUrl || defaultimg}
            alt="Hoodie"
            className="w-[320px] md:w-[400px] h-[240px] md:h-[400px] object-cover rounded-2xl"
          />

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Creatnow;