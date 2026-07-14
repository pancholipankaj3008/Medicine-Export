import React from "react";
import {
  Shield,
  Users,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Globe,
  TrendingUp,
  Award,
} from "lucide-react";
import {Navbar} from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsappFloat";

const About = () => {
  /* =========================
     WHY CHOOSE US DATA
  ========================== */
  const features = [
    {
      icon: Award,
      title: "Certified Excellence",
      description: "ISO 9001:2015, GDP, and GMP certified operations",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Pharmaceutical trade specialists worldwide",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Certified Quality Assurance System",
    },
  ];

  const certifications = [
    { name: "FDA Registered" },
    { name: "WHO Prequalified" },
    { name: "GMP Certified" },
    { name: "GDP Compliant" },
    { name: "ISO 9001:2015" },
    { name: "MHRA Approved" },
  ];

  /* =========================
     CORE VALUES DATA
  ========================== */
  const values = [
    {
      title: "Integrity & Compliance",
      description:
        "We operate with strict adherence to FDA, EMA, and WHO-GMP guidelines. Quality is never compromised.",
      icon: <ShieldCheck className="w-6 h-6 m-5 text-blue-600" />,
    },
    {
      title: "Global Access",
      description:
        "We believe healthcare is a universal right. We work tirelessly to reach underserved markets.",
      icon: <Globe className="w-6 h-6 m-5 text-blue-600" />,
    },
    {
      title: "Customer Partnership",
      description:
        "We don't just sell products; we build long-term partnerships based on trust and mutual growth.",
      icon: <Users className="w-6 h-6 m-5 text-blue-600" />,
    },
    {
      title: "Innovation",
      description:
        "Constantly expanding our portfolio to include the latest therapeutic advancements.",
      icon: <TrendingUp className="w-6 h-6 m-5 text-blue-600" />,
    },
  ];

  return (
    <>
      <Navbar/>
    <div className="w-full">

      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="bg-[#0B1426] text-white py-20 mt-14 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-slide-in">
            Our Mission & Vision
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light animate-slide-in">
  SunElite Pharma is a trusted pharmaceutical exporter from India,
  committed to improving global healthcare access through
  WHO GMP medicines, reliable supply chains,
  and ethical pharmaceutical trade.
</p>

        </div>
      </section>

      {/* =========================
          WHO WE ARE
      ========================== */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 animate-slide-in ">
          <div className="flex-1 space-y-6 animate-slide-in">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full uppercase animate-slide-in">
              Who We Are
            </span>

           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 animate-slide-in">
  Trusted Pharmaceutical Export Company Serving Global Markets
</h2>


            <div className="space-y-4 text-slate-600 text-lg animate-slide-in">
              <p>
  SunElite Pharma was founded with a clear mission to bridge
  geographical gaps in healthcare. We specialize in the
  sourcing, consolidation, and export of high-quality
  pharmaceutical formulations and generic medicines
  for regulated and semi-regulated markets worldwide.
</p>

<p>
  With years of experience in pharmaceutical exports,
  we work closely with WHO GMP certified global logistics partners to ensure safe, and timely delivery of medicines.
</p>

            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-blue-100 rounded-2xl rotate-2 translate-x-2 translate-y-2 "></div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl animate-slide-in">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
                alt="Pharmaceutical Warehouse"
                className="w-full h-auto object-cover animate-slide-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          WHY CHOOSE US
      ========================== */}
      <section className="bg-[#f0f5f7] py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1 bg-[#e6f7f2] text-[#0d9373] text-sm font-medium rounded-full animate-slide-in">
            Why Choose Us
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2b3c] animate-slide-in">
            Your Trusted Partner in <br /> Global Pharmaceutical Export & Supply

          </h2>

          <p className="text-[#5a6b7c] text-lg max-w-4xl mx-auto animate-slide-in">
  As a reliable pharmaceutical exporter from India,
  SunElite Pharma supplies quality medicines to hospitals,
  distributors, NGOs, and healthcare providers across
  120+ countries through strict compliance and ethical trade practices.
</p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 max-w-6xl mx-auto">
          <div className="space-y-6">
            {features.map((item, index) => (
              <div key={index} className="flex gap-4 animate-slide-in">
                <div className="w-12 h-12 bg-[#d4e1ea] rounded-lg flex items-center justify-center animate-slide-in">
                  <item.icon className="w-6 h-6 text-[#11437c] animate-slide-in" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1a2b3c] text-lg animate-slide-in">
                    {item.title}
                  </h3>
                  <p className="text-[#5a6b7c] text-sm animate-slide-in">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
            
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-in">
  <h3 className="text-2xl font-bold text-[#1a2b3c] mb-6 text-center animate-slide-in">
    Pharmaceutical Certifications <br /> & Regulatory Approvals
  </h3>

  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-4 animate-slide-in">
    {certifications.map((cert, index) => (
      <div
        key={index}
        className="flex items-center gap-3 p-4 bg-[#eff0f1] rounded-lg border border-border animate-slide-in"
      >
        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 animate-slide-in" />
        <span className="text-sm font-medium text-[#1a2b3c] animate-slide-in">
          {cert.name}
        </span>
      </div>
    ))}
  </div>
</div>

        </div>
      </section>

      {/* =========================
          CORE VALUES
      ========================== */}
      <section className="bg-[#f8fafc] py-20 px-6 ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1426] text-center mb-16 animate-slide-in">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, index) => (
              <div key={index} className="flex gap-5 animate-slide-in">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-slide-in">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0B1426] animate-slide-in">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 animate-slide-in">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
            <Footer/>
            <WhatsAppFloat/>
    </>
  );
};

export default About;
