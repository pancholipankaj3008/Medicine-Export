import React from "react";
import { Package, Plane, Shield, FileCheck, Warehouse, Globe2 } from "lucide-react";

/* =======================
   Utility (same as cn)
======================= */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =======================
   Card Component (combined)
======================= */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

/* =======================
   Services Data
======================= */
const services = [
  {
    icon: Package,
     title: "Pharmaceutical Export Services",
    description:
      "Source quality medicines and medical supplies from certified international manufacturers with full regulatory compliance.",
  },
  {
    icon: Plane,
    title: "Global Export Logistics",
  description:
    "International pharmaceutical logistics, customs clearance, and documentation support.",
 },
  {
    icon: Shield,
    title: "Pharmaceutical Quality Assurance",
    description:
      "Every product undergoes rigorous quality checks ensuring GMP, FDA, and WHO standards compliance.",
  },
  {
    icon: FileCheck,
    title: "Regulatory & Compliance Support",
    description:
      "Navigate complex international pharmaceutical regulations with our expert compliance team.",
  },
  {
    icon: Warehouse,
    title: "Cold Chain Pharmaceutical Logistics",
    description:
      "Temperature-controlled storage and transport for sensitive pharmaceutical products.",
  },
  {
    icon: Globe2,
    title: "International Market Access",
    description:
      "Strategic market entry support and local registration services in emerging markets.",
  },
];

/* =======================
   Services Section
======================= */
const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              End-to-End Pharmaceutical Export & Supply Services
          </h2>
          <p className="text-lg text-muted-foreground">
             We provide comprehensive pharmaceutical export services,
  supporting global medicine supply with regulatory compliance,
  quality assurance, and reliable logistics.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group p-6 lg:p-8 bg-card-gradient border border-border hover:border-accent/50 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>

              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
