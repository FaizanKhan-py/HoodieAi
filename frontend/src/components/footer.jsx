import Logo from '../Pictures/Logo.png';
import FacebookIcon from '../Pictures/facebook.png';
import InstagramIcon from '../Pictures/insta.webp';

export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-b from-back via-purple-950/40 to-back text-gray-200">
      <div className="h-px w-full bg-purple-900/70 mb-10"></div>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10 md:flex-row ">

        {/* Brand */}
        <div className="max-w-sm space-y-3">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="HoodieAI" className="h-14 w-14 rounded-2xl object-cover" />
            <div>
              <p className="text-3xl font-bold text-white">HoodieAI</p>
              <p className="text-xl text-purple-200">AI-Generated Custom Hoodie Designer</p>
            </div>
          </div>

          <p className="text-xl text-gray-300">
            Craft unique hoodies with AI prompts.
          </p>

          
        </div>

        {/* Lists Without Links */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">

          <div>
            <h4 className="text-xl font-semibold text-white">Explore</h4>
            <ul className="mt-3 space-y-2 text-lg text-gray-300">
              <li className="hover:text-gray-400 ">Designs</li>
              <li className="hover:text-gray-400 ">How It Works</li>
              <li className="hover:text-gray-400 ">Pricing</li>
              <li className="hover:text-gray-400 ">Create Now</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-white">Support</h4>
            <ul className="mt-3 space-y-2 text-lg text-gray-300">
              <li>hoodieai@gmail.com</li>
              <li> +92 424116080</li>
              
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-semibold text-white ml-3">Follow</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <img src={InstagramIcon} alt="Instagram" className="h-13 w-13 rounded ml-1" />
                <span>Instagram</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={FacebookIcon} alt="Facebook" className="h-7 w-13 rounded" />
                <span>Facebook</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} HoodieAI. All rights reserved.
      </div>
    </footer>
  );
}
