import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./footer";
import Logo from "../Pictures/Logo.png";
import shoppingbag from "../Pictures/shopping-bag.png";

// Firebase auth
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

 const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
};

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (location.pathname === "/create" || location.pathname === "/designs") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (location.pathname === "/" && !location.state?.scrollTo) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.state]);

  const handleHamburger = () => {
    setIsOpen((open) => !open);
  };

  const handleScroll = (id) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  const navLinkClass =
    "cursor-pointer px-4 py-1.5  rounded-lg font-semibold text-purple-950 hover:bg-purple-800 hover:text-white transition";

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full md:h-28  max-w-full  py-5 flex items-center justify-between bg-white text-purple-950 shadow-[0_0_15px_0_rgba(0,0,0,0.4)] md:pl-6 px-3">

        {/* LOGO */}
        <NavLink to="/" className="pl-4 flex items-center gap-4 cursor-pointer">
          <img className="h-14 rounded-2xl" src={Logo} alt="HoodieAI Logo" />
          <p className="text-xl font-bold">HoodieAI</p>
        </NavLink>

        {/* DESKTOP MENU */}
        <ul className="md:flex hidden gap-4  ml-10 items-center  ">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/designs" className={navLinkClass}>Designs</NavLink></li>

          <li>
            <button onClick={() => handleScroll("how-it-works")} className={navLinkClass}>
              How It Works
            </button>
          </li>

          <li>
            <button onClick={() => handleScroll("pricing")} className={navLinkClass}>
              Pricing
            </button>
          </li>

          <li>
            <NavLink to="/create" className={navLinkClass}>
              Create Now
            </NavLink>
          </li>

          <li>
            <img src={shoppingbag} alt="" width={50} className="ml-84" />
          </li>
        </ul>

        {/* AUTH SECTION (FIXED RESPONSIVE LOGIC) */}
        <div className="ml-auto flex items-center gap-2">

          {user ? (
            <>
              <img
                src={user?.photoURL || defaultAvatar}
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
                referrerPolicy="no-referrer"
                className="h-9 w-9 md:h-9 md:w-9 rounded-full object-cover border"
                alt="user"
              />

              <span className="hidden md:block font-semibold md:text-2xl mr-1 ">
                {user?.displayName || "User"}
              </span>

              {/* Desktop logout only */}
              <button
                onClick={logout}
                className="hidden md:block mr-4 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold cursor-pointer text-2xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* LOGIN visible on BOTH mobile + desktop */}
              <button
                onClick={loginWithGoogle}
                className="mr-4 px-2 py-1 md:px-4 md:py-1.5 md:text-2xl bg-purple-700 text-white rounded-lg font-semibold cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* HAMBURGER */}
        <div className="md:hidden ml-2">
          <button onClick={handleHamburger} className="text-4xl">
            {isOpen ? "✕" : "≡"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <ul className="md:hidden bg-white shadow-2xl py-4 font-semibold text-gray-700 text-xl w-full">

          <li className="p-2 pl-10">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li className="p-2 pl-10">
            <NavLink to="/designs" onClick={() => setIsOpen(false)} className={navLinkClass}>
              Designs
            </NavLink>
          </li>

          <li className="p-2 pl-10">
            <button
              onClick={() => handleScroll("how-it-works")}
              className={navLinkClass + " w-full text-left"}
            >
              How It Works
            </button>
          </li>

          <li className="p-2 pl-10">
            <button
              onClick={() => handleScroll("pricing")}
              className={navLinkClass + " w-full text-left"}
            >
              Pricing
            </button>
          </li>

          <li className="p-2 pl-10">
            <NavLink to="/create" onClick={() => setIsOpen(false)} className={navLinkClass}>
              Create Now
            </NavLink>
          </li>

          {/* MOBILE LOGIN / LOGOUT (optional but clean UX) */}
          {!user ? (
            <li className="p-2 pl-10">
              <button
                onClick={() => {
                  loginWithGoogle();
                  setIsOpen(false);
                }}
                className={navLinkClass + " w-full text-left bg-purple-700 text-white"}
              >
                Login
              </button>
            </li>
          ) : (
            <li className="p-2 pl-10">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className={navLinkClass}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}

      {/* PAGE */}
      <main className="md:px-6 px-4">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
