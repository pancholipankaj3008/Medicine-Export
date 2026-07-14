  import * as React from "react";
  import { useState } from "react";
  import { Slot } from "@radix-ui/react-slot";
  import { cva } from "class-variance-authority";
  import {Link, useNavigate } from "react-router-dom";
  import { Menu, X} from "lucide-react";

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
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      );
    }
  );
  Button.displayName = "Button";

  /* =======================
    Navbar Component
  ======================= */
  export const Navbar = () => {

    let Navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
  { name: "Home", to: "/" },
  { name: "Products", to: "/products" },
  { name: "About Us", to: "/about" },
  { name: "Contact Us", to: "/contact" },
];


    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border " aria-label="Main Navigation">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
    <div className="w-20 h-14  flex items-center justify-center overflow-hidden">
      <img
        src="/Logo-Blue.png"
        alt="SunElite Pharma – Pharmaceutical Exporter from India"
        className="w-full h-full object-contain animate-slide-in"
      />
    </div>

    
  </Link>
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8 animate-slide-in">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4 animate-slide-in">
              
             <Button size="sm" onClick={()=>Navigate("/contact")}>
  Request Quote
</Button>

            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors animate-slide-in"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  
                  <Button size="sm" onClick={()=>Navigate("/contact")}>Get Started</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  /* =======================
    Dummy Pages (for routing)
  ======================= */
  const Page = ({ title }) => (
    <div className="pt-32 text-center text-2xl font-semibold">
      {title}
    </div>
  );
