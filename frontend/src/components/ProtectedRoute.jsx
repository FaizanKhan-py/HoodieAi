import { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) setShowModal(true); // show modal if not logged in
    });
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    setShowModal(false);
  };

  // Still checking auth state
  if (user === undefined) return null;

  // Logged in
  if (user) return children;

  // Not logged in — show modal over a blurred background
  return (
    <>
      {/* Blurred background */}
      <div className="filter blur-sm pointer-events-none opacity-40">
        {children}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 w-80">
            <h2 className="text-2xl font-bold text-purple-800">Sign in Required</h2>
            <p className="text-gray-600 text-center">
              You need to be logged in to create your custom hoodie.
            </p>
            <button
              onClick={loginWithGoogle}
              className="cursor-pointer w-full py-2 bg-purple-600 hover:bg-purple-800 text-white font-semibold rounded-3xl transition"
            >
              Login with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}