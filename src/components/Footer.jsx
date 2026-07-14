import React from "react";
import {
  Facebook,

  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Plus,
} from "lucide-react";
import { useNavigate,Link } from "react-router-dom";

const Footer = () => {
  let Navigate = useNavigate();
  return (
    <footer className="bg-gradient-to-b from-[#151523] to-[#0d152b] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            
            {/* <h2 className="text-xl font-semibold text-white">
              PharmaGlobal
            </h2> */}
            <img src="/Logo-White.png" alt="SunElite Pharma – Pharmaceutical Exporter from India" className="h-14" />
          </div>

          <p className="text-sm leading-relaxed mb-5">
  SunElite Pharma is a trusted pharmaceutical exporter from India,
  supplying high-quality generic medicines to global healthcare
  distributors, hospitals, and importers.
</p>
{/* 
          <div className="flex gap-4 text-gray-400">
            <Facebook className="hover:text-white cursor-pointer" />
            <Instagram className="hover:text-white cursor-pointer" />
            <Linkedin className="hover:text-white cursor-pointer" />
          </div> */}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 ">Quick Links</h3>
          <div className="space-y-3 text-sm flex flex-col align-start " >
            <Link to="/" className="hover:text-white">Home</Link>
<Link to="/products" className="hover:text-white">Products</Link>
<Link to="/about" className="hover:text-white">About Us</Link>
<Link to="/contact" className="hover:text-white">Contact Us</Link> </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
  <MapPin className="text-blue-500 mt-1" size={18} />
  <span>
    Bharuch, Gujarat, India
  </span>
</li>

<li className="flex gap-3">
  <Phone className="text-blue-500" size={18} />
  +91 93138 79663 , +91 7623957163
</li>

<li className="flex gap-3">
  <Mail className="text-blue-500" size={18} />
  info@sunelitepharma.com
</li>

          </ul>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-white font-semibold mb-4">Certifications</h3>

          <div className="flex flex-wrap gap-3">
            {["FDA Approved", "GMP Certified", "ISO 9001:2015" ].map(
              (item) => (
                <span
                  key={item}
                  className="px-4 py-2 text-sm rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-5 text-center">
        <p className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide">
          © {new Date().getFullYear()} SunElite Pharma | All rights reserved.
        </p>

        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Designed & Developed by{" "}
          <Link
            // to="mailto:devsphere.tech01@gmail.com?subject=Website%20Development%20Inquiry"
            className="font-semibold text-slate-400 hover:text-slate-300 transition"
  to="#"
  onClick={() => window.location.href = "mailto:devsphere.tech01@gmail.com"}
>
            Devsphere
          </Link>
        </p>
      </div>
    </div>
    </footer>
  );
};

export default Footer;