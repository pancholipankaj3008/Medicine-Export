import React, { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsappFloat";
import { Navbar } from "../components/Navbar";

/* =======================
   cn utility
======================= */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =======================
   Button Component
======================= */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-card",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero:
          "bg-primary-foreground text-primary font-semibold hover:bg-primary-foreground/90 shadow-elevated hover:scale-105",
        heroOutline:
          "border-2 border-primary-foreground text-primary-foreground font-semibold hover:bg-primary-foreground/10 backdrop-blur-sm",
        accent:
          "bg-accent text-accent-foreground font-semibold hover:bg-accent/90 shadow-card hover:shadow-elevated",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

/* =======================
   Input Component
======================= */
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

/* =======================
   Textarea Component
======================= */
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

/* =======================
   Contact Component (Web3Forms CONNECTED)
======================= */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const data = new FormData();
    data.append("access_key", "8e5d9345-f1b2-44e2-af18-7f628ef31f0e");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("company", formData.company);
    data.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const res = await response.json();

      if (res.success) {
        setResult("Message sent successfully!");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch (error) {
      setResult("Network error. Please try later.");
    }
  };

  const contactInfo = [
    {
  icon: Mail,
  label: "Email Us",
  value: "info@sunelitepharma.com",
  href: "mailto:info@sunelitepharma.com",
},
    {
  icon: Phone,
  label: "Call Us",
  value: "+91 93138 79663 ,+91 7623957163",
  href: "tel:+919313879663",
},
    {
      icon: MapPin,
      label: "Headquarters",
      value: "Bharuch, Gujarat, India",
      href: "#",
    },
  ];

  return (
    <>
    <Navbar/>
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4 animate-slide-in">
              Get In Touch
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-in">
              Contact SunElite Pharma – Pharmaceutical Exporter from India
            </h2>

            <p className="text-lg text-muted-foreground mb-10 animate-slide-in">
  Contact SunElite Pharma for pharmaceutical exports, bulk medicine supply,
  and international trade inquiries. Our team supports global buyers,
  distributors, and healthcare organizations with reliable solutions.
</p>


            <div className="space-y-6 animate-slide-in">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:border-accent/50 transition animate-slide-in"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center animate-slide-in">
                    <info.icon className="w-5 h-5 text-primary animate-slide-in" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground animate-slide-in">
                      {info.label}
                    </div>
                    <div className="font-medium animate-slide-in">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-elevated border animate-slide-in">
            <h3 className="text-2xl font-bold mb-2 animate-slide-in">  Request Pharmaceutical Export Quotation</h3>
            <p className="text-muted-foreground mb-8 animate-slide-in">
              Submit your inquiry for bulk pharmaceutical supply,
  export pricing, and regulatory documentation, and we'll respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 animate-slide-in">
              <div className="grid md:grid-cols-2 gap-4 animate-slide-in ">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <Input
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />

              <Textarea
                rows={5}
                placeholder="Your pharmaceutical inquiry (product, quantity, country)"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
              />

              <Button type="submit" size="lg" className="w-full animate-slide-in">
                Send Message <Send />
              </Button>

              {result && (
                <p className="text-center text-sm mt-2">{result}</p>
              )}
            </form>
          </div>
        </div>
      </div>


              {/* MAP */}
<section className="bg-gray-100">
  <div className="max-w-7xl mx-auto px-6 py-16">
    <h3 className="text-2xl font-black text-center mb-3 text-slate-900 animate-slide-in">
      Pharmaceutical Export Office 
    </h3>
    <p className="text-center text-slate-500 mb-8 animate-slide-in">
      In Bharuch, Gujarat, India
    </p>

    <div
      className="
        h-[400px]
        rounded-3xl
        overflow-hidden
        border
        shadow-xl
      "
    >
      <iframe
        title="SunElite Pharma Office Location – Bharuch Gujarat India"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59301.97094704605!2d72.96243006832624!3d21.72705345606177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be020a2b22ac421%3A0xa4116c424622fd2a!2sBharuch%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1768043250581"
        className="w-full h-full border-0 animate-fade-in"
        loading="lazy"
      />
    </div>
  </div>
</section>



    </section>
    <Footer/>
    <WhatsAppFloat/>
    </>
  );
};

export default Contact;
