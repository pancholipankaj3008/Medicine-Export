import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
// import { Navbar } from "../components/Navbar";
// import Footer from "../components/Footer";
// import WhatsAppFloat from "../components/WhatsAppFloat";

const NotFound = () => {
  return (
    <>
      {/* <Navbar /> */}

      {/* Background */}
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-slate-50">
        
        {/* Popup Card */}
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 p-8 text-center">
          
          <AlertTriangle
            size={56}
            className="mx-auto text-[#ffbc2b] mb-4"
          />

          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            404
          </h1>

          <p className="text-slate-600 mb-6">
            The page you are looking for doesn’t exist or has been moved.
          </p>

          <Link
            to="/"
            className="inline-block bg-[#1e3a5f] text-white px-6 py-3 rounded-xl hover:bg-blue-900 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>

      {/* <Footer />
      <WhatsAppFloat /> */}
    </>
  );
};

export default NotFound;
