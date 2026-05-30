import { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) setShowModal(true);
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    setShowModal(false);
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

  if (user === undefined) return null;

  if (user) return children;

  return (
    <>
      {/* Blurred background */}
      <div className="filter blur-sm pointer-events-none opacity-40">
        {children}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 top-22 flex items-center justify-center z-40">
          <div className="bg-white text-black rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 w-80">
            <h2 className="text-2xl font-bold text-purple-800">Sign in Required</h2>
            <p className="text-gray-600 text-center">
              You need to be logged in to create your custom hoodie.
            </p>
            <button
              onClick={loginWithGoogle}
              className="w-full py-2 bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-3xl transition"
            >
              Login with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}