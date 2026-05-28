import { Link } from 'react-router-dom';
import image from'../Pictures/3h.png'

export default function Pricing() {
  return (
    <>
      <div className="py-16 px-4 flex justify-center">
        <ul className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden border border-purple-950 shadow-2xl">

          {/* Image Panel */}
          <li className="md:w-2/5 w-full">
            <img
              src={image}
              alt="Custom Hoodie"
              className="w-full h-56 md:h-full object-cover"
            />
          </li>

          {/* Content Panel */}
          <li className="md:w-3/5 w-full border-t md:border-t-0 md:border-l border-purple-950 p-6 md:p-10 flex flex-col gap-5">

            {/* Title & Price */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="font-bold text-2xl md:text-3xl">AI Custom Hoodie</h2>
              <div className="bg-purple-900 text-white rounded-2xl px-4 py-1.5 text-center w-fit">
                <span className="font-bold text-xl md:text-2xl">₨ 3,000</span>
                <span className="text-xs md:text-sm font-normal block leading-tight opacity-80">per hoodie</span>
              </div>
            </div>

            <hr className="border-purple-950" />

            {/* Two columns on desktop, stacked on mobile */}
            <div className="flex flex-col sm:flex-row gap-8">

              <div className="flex-1">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-3 text-purple-400 md:text-xl">What You Get</h3>
                <ul className="space-y-2">
                  {[
                    "Custom generated design",
                    "High-quality  fabric",
                    "Full print customization",
                    "Real-time design preview",
                    "Print-ready artwork ",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm md:text-xl text-gray-300">
                      <span className="text-purple-400 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-3 text-purple-400 md:text-xl">Order Details</h3>
                <ul className="space-y-2">
                  {[
                    "Price: ₨ 3,000",
                    "Sizes: S, M, L, XL, XXL",
                    "Delivery: 5 to 7 business days",
                    "COD / Easypaisa / JazzCash",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm md:text-xl text-gray-300">
                  
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <hr className="border-purple-950" />

            {/* CTA */}
            <Link to="/create">
              <button className="md:text-xl cursor-pointer border-1 border-purple-500 bg-purple-500 rounded-3xl h-10 md:h-12 px-6  font-semibold hover:bg-blue-900 hover:border-blue-900">
                Create Now 
              </button>
            </Link>

          </li>
        </ul>
      </div>
    </>
  );
}