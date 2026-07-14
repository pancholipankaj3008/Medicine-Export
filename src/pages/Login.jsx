import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/productAdmin";

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  try {
    setLoading(true);

    // 🔐 Auth
    const res = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = res.user;

    // 🔍 Firestore admin check
    const userRef = doc(db, "admins", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await auth.signOut();
      setError("Access denied");
      return;
    }

    const userData = snap.data();

    if (userData.role !== "admin") {
      await auth.signOut();
      setError("You are not authorized");
      return;
    }

    // ✅ SUCCESS
    setError("");
    navigate(from, { replace: true });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    // 🔥 Important: auth success but firestore fail case
    if (auth.currentUser) {
      await auth.signOut();
    }

    setError("Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{"background": "url(  )"}} className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-blue-50 rounded-3xl shadow-xl p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white mb-3">
            <Lock size={20} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Admin Login
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to your admin panel
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border placeholder:text-xs sm:placeholder:text-sm
    text-sm sm:text-base border-slate-200 outline-none focus:border-[#1e3a5f]"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-600">
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full sm:font-normal placeholder:text-xs sm:placeholder:text-sm
    text-sm sm:text-base pl-10 pr-10 py-3 rounded-xl border border-slate-200 outline-none focus:border-[#1e3a5f]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3a5f] text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center space-y-2">
          <Link
            to="/forgotPassword"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);

//       // ✅ same as your old onLogin()
//       navigate("/productAdmin");

//     } catch (err) {
//       console.log(err);
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-[#1e3a5f]">
//           Admin Login
//         </h2>

//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full mb-4 px-4 py-3 border rounded-xl"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-6 px-4 py-3 border rounded-xl"
//           required
//         />

//         <button className="w-full bg-[#1e3a5f] text-white py-3 rounded-xl">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
