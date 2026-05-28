import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ho0 from '../Pictures/Hoodie00.png';
import ho1 from '../Pictures/Hoodie1.png';
import ho2 from '../Pictures/Hoodie2.png';
import ho3 from '../Pictures/Hoodie3.png';
import Howitworks from './HowItworks';
import Pricing from './pricing';

const gallery = [ho3, ho1, ho2, ho0];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll when navigating from another page
    if (location.state?.scrollTo) {
      const scrollToId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(scrollToId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Clear the state to prevent scrolling on every render
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location.state]);
  return (
    <>
      
      <br />
      <div className="md:px-6 px-4 md:mb-20">
        <h1 className="md:text-7xl font-bold text-white text-3xl">
          Design your custom <br /> Hoodie with AI
        </h1>
        <br />
        <Link to="/create">
          <button className="md:text-xl cursor-pointer border-1 border-purple-500 bg-purple-500 rounded-3xl h-10 md:h-12 px-6  font-semibold hover:bg-blue-900 hover:border-blue-900">
            Create Now
          </button>
        </Link>

        <br />
        <br />
        <br />
        

        <div className="relative overflow-hidden p-3 backdrop-blur ">
          <div className="marquee-row gap-5 ">
            {[...gallery, ...gallery,...gallery].map((src, idx) => (
              <img
                key={idx}
                src={src}
                className="md:h-88 w-auto rounded-xl object-cover h-44"
                alt="Hoodie design"
              />
            ))}
          </div>
        </div>
        <br />
      </div>

      {/* How It Works Section */}
      <section id="how-it-works">
        <Howitworks />
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <Pricing />
      </section>
    </>
  );
}