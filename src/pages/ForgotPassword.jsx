import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Password reset link has been sent to your email."
      );
      setEmail("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-center text-[#1e3a5f] mb-2">
          Forgot Password
        </h1>
        <p className="text-sm text-slate-500 text-center mb-6">
          Enter your registered email to reset your password
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-600">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:border-[#1e3a5f]"
              />
            </div>
          </div>

          {message && (
            <p className="text-sm text-center text-slate-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3a5f] text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
