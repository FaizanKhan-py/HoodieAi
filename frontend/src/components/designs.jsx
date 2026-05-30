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
    tag: 'Most Popular',
  },
  {
    title: 'Cyber Panther',
    prompt: 'Futuristic black hoodie featuring a cybernetic panther, teal highlights, and subtle circuit patterns across the chest.',
    image: hoodie1,
    accent: 'from-slate-800 to-cyan-600',
    tag: "Editor's Pick",
  },
  {
    title: 'Street Graffiti',
    prompt: 'Bold street-art hoodie with layered graffiti tags, paint splatters, and a chrome drip logo on the sleeve.',
    image: hoodie2,
    accent: 'from-amber-500 to-red-500',
    tag: 'Trending',
  },
  {
    title: 'Techcore Mono',
    prompt: 'Minimal techcore hoodie in monochrome with geometric linework, barcode sleeve detail, and a subtle chest monogram.',
    image: hoodie3,
    accent: 'from-zinc-700 to-gray-900',
    tag: 'New',
  },
];

export default function Designs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section id="designs" className="px-4 py-12 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-12">
        <div>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-3 border border-purple-500/30 bg-purple-500/10 px-3 py-1 rounded-full">
            AI-Generated
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Design Gallery
          </h2>
          <p className="mt-3 max-w-xl text-base text-gray-400 leading-relaxed">
            Explore our top-rated AI-generated hoodie designs and the prompts that brought them to life.
          </p>
        </div>

        <div className="mt-2 md:mt-6 shrink-0">
          <Link to="/create">
            <button className="cursor-pointer bg-purple-600 hover:bg-blue-900 border border-purple-500 hover:border-blue-800 transition-all duration-200 rounded-full h-11 px-7 font-semibold text-sm text-white shadow-lg shadow-purple-900/30 hover:shadow-blue-900/30">
              ✦ Create Now
            </button>
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-10" />

      {/* Gallery Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {designs.map((design, index) => (
          <article
            key={design.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl shadow-black/40 backdrop-blur"
          >
            {/* Image */}
            <div className={`relative h-72 w-full bg-gradient-to-br ${design.accent}`}>
              <img
                src={design.image}
                alt={design.title}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-black/50 backdrop-blur-sm border border-white/10 text-purple-300 px-2.5 py-1 rounded-full">
                {design.tag}
              </span>

              <span className="absolute bottom-3 right-4 text-5xl font-black text-white/10 select-none leading-none">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-white tracking-tight">{design.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{design.prompt}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-purple-400/60 tracking-widest uppercase font-medium">AI Generated</span>
                <Link to="/create">
                  <button className="text-xs font-semibold text-purple-300 hover:text-white cursor-pointer">
                    Try this style →
                  </button>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}