import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import hoodie0 from '../Pictures/Hoodie00.png';
import hoodie1 from '../Pictures/Hoodie1.png';
import hoodie2 from '../Pictures/Hoodie2.png';
import hoodie3 from '../Pictures/Hoodie3.png';

const designs = [
  {
    title: 'Neon Vaporwave',
    prompt: 'A neon vaporwave-inspired hoodie with glowing gradients, retro grid lines, and a synthwave sunset on the back.',
    image: hoodie0,
    accent: 'from-purple-600 to-pink-500',
  },
  {
    title: 'Cyber Panther',
    prompt: 'Futuristic black hoodie featuring a cybernetic panther, teal highlights, and subtle circuit patterns across the chest.',
    image: hoodie1,
    accent: 'from-slate-800 to-cyan-600',
  },
  {
    title: 'Street Graffiti',
    prompt: 'Bold street-art hoodie with layered graffiti tags, paint splatters, and a chrome drip logo on the sleeve.',
    image: hoodie2,
    accent: 'from-amber-500 to-red-500',
  },
  {
    title: 'Techcore Mono',
    prompt: 'Minimal techcore hoodie in monochrome with geometric linework, barcode sleeve detail, and a subtle chest monogram.',
    image: hoodie3,
    accent: 'from-zinc-700 to-gray-900',
  },
];

export default function Designs() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section id="designs" className=" px-4 py-10 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Gallery
          </h2>
          <p className="mt-2 sm:mt-3 max-w-full sm:max-w-xl md:max-w-2xl text-base sm:text-lg text-gray-200">
            Explore our top-rated AI-generated hoodie designs and the prompts behind them.
          </p>
        </div>

        {/* Button below text */}
        <div className="mt-4 md:mt-8">
          <Link to="/create">
            <button className="cursor-pointer border border-purple-500 bg-purple-500 rounded-3xl h-12 w-full sm:w-auto px-6 font-semibold hover:bg-blue-900 hover:border-blue-900">
              Create Now
            </button>
          </Link>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {designs.map((design) => (
          <article
            key={design.title}
            className="group overflow-hidden rounded-2xl border border-white/5 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur"
          >
            <div className={`relative h-130 w-full bg-gradient-to-br ${design.accent}`}>
              <img
                src={design.image}
                alt={design.title}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-bold text-white">{design.title}</h3>
              <p className="mt-2 text-xl text-gray-200 leading-relaxed">{design.prompt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-purple-200">
               
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
