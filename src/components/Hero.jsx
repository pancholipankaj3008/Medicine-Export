
import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =======================
   Utility
======================= */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =======================
Button Component
======================= */
const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4";

      const variants = {
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft",
      hero:
      "bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 shadow-elevated hover:scale-105",
      heroOutline:
      "border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 backdrop-blur-sm",
    };
    
    const sizes = {
      default: "h-10 px-4 py-2",
      xl: "h-14 rounded-xl px-10 text-xl",
    };
    
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
        />
      );
    }
  );
  
  Button.displayName = "Button";
  
  /* =======================
  Hero Section
  ======================= */
  const Hero = () => {
  let Navigate = useNavigate();

  const highlights = [
  "WHO GMP & FDA Certified Pharma Exporter",
  "Supplying Medicines to 120+ Countries",
  "End-to-End Pharmaceutical Export Logistics",
  "24/7 Logistics Support",
];

  

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-pharmacy.png"
alt="Pharmaceutical exporter from India supplying generic medicines worldwide"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-20 relative z-10 py-16 lg:py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-slide-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-slide-in" />
            <span className="text-sm font-medium text-primary-foreground animate-slide-in">
              Trusted Global Pharmaceutical Partner
            </span>
          </div>

          {/* Heading */}
          {/* <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-in">
            Global Pharmaceutical <br />
            <span className="text-[#2EB8B8]">Import & Export</span>
            <br />
            Solutions
          </h1> */}

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-in">
  Pharmaceutical  <br />
  <span className="text-[#2EB8B8]">
    Exporter from India
  </span><br />
    Generic Medicine Supplier Worldwide
</h1>


          {/* Description */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-slide-in">
  SunElite Pharma is a 
  <strong> generic drug </strong> and trusted
  <strong> pharmaceutical exporter from India</strong>,
  supplying high-quality medicines to pharmacies,
  hospitals, and distributors across 120+ countries.
</p>


          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-slide-in">
            <Button variant="hero" size="xl" onClick={()=>Navigate("/contact")}>
              Request Quote <ArrowRight />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={()=>Navigate("/products")}>
              View Catalog
            </Button>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-6 animate-slide-in">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-primary-foreground/90">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 95" className="w-full">
          <path
            d="M0 50L48 45.8C96 41.7 192 33.3 288 29.2C384 25 480 25 576 33.3C672 41.7 768 58.3 864 62.5C960 66.7 1056 58.3 1152 50C1248 41.7 1344 33.3 1392 29.2L1440 25V100H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;