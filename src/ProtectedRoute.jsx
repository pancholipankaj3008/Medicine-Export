import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

const ProtectedRoute = ({
  children,
  requireEmailVerified = false, // optional
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  /* ===== 1️⃣ LOADING STATE ===== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600 text-sm">
          Checking authentication...
        </p>
      </div>
    );
  }

  /* ===== 2️⃣ NOT LOGGED IN ===== */
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  /* ===== 3️⃣ EMAIL VERIFICATION (OPTIONAL) ===== */
  if (requireEmailVerified && !user.emailVerified) {
    return (
      <Navigate
        to="/profile"
        replace
        state={{ needVerification: true }}
      />
    );
  }

  /* ===== 4️⃣ ACCESS GRANTED ===== */
  return children;
};

export default ProtectedRoute;


