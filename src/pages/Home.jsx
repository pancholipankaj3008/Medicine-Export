

import React,{ useState , useEffect} from "react";
import { ShieldCheck, Globe, Clock, Package, ArrowRight } from "lucide-react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import { useNavigate } from "react-router-dom";
import { cva } from "class-variance-authority";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsappFloat";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";



const features = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-blue-600" />,
    title: "Pharmaceutical Quality Assurance",
    description:
      "All medicines are manufactured and supplied in compliance with WHO GMP and international quality standards.",
  },
  {
    icon: <Globe className="w-7 h-7 text-blue-600" />,
    title: "Global Pharmaceutical Logistics",
    description:
      "Efficient cold-chain logistics and export documentation ensuring timely delivery of medicines worldwide.",
  },
  {
    icon: <Clock className="w-7 h-7 text-blue-600" />,
    title: "Dedicated Export Support",
    description:
      "24/7 professional support for pharmaceutical export inquiries, order tracking, and documentation.",
   },
];

const Home = () => {
  
  const [products, setProducts] = useState([]);
  let Navigate = useNavigate();

useEffect(() => {
  const fetchProducts = async () => {
    const q = query(collection(db, "products"), limit(3));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    setProducts(list);
  };

  fetchProducts();
}, []);


function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-card",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);



const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
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


  return (
    <>
    <Navbar/>
    <Hero/>

<section className="py-20 bg-slate-50">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-12">
      Featured Pharmaceutical Products
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* 🔹 3 Products */}
      {products.map((product) => (
  <Link to={`/product/${product.docId}`} key={product.docId}>
    <Card className="p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      <h3 className="font-bold mb-2 line-clamp-1">{product.name}</h3>

      <p className="text-sm text-muted-foreground mb-4">
        Physical Form: {product.physicalForm}
      </p>
      <div className="text-sm space-y-1 mb-4">
                      <div className="flex justify-between animate-slide-in">
                        <span>Drug Type</span>
                        <span>{product.drugType?.name}</span>
                      </div>

                      <div className="flex justify-between animate-slide-in">
                        <span>Packing</span>
                        <span>{product.packingStyle?.[0]}</span>
                      </div>

                      <div className="flex justify-between animate-slide-in">
                        <span>Min Order</span>
                        <span>
                          {product.minimumOrder?.quantity}{" "}
                          {product.minimumOrder?.unit}
                        </span>
                      </div>
                    </div>

      <Button variant="outline" size="sm" className="w-full">
        View Product
        <ArrowRight />
      </Button>
    </Card>

  </Link>
))}

<Link to="/products">
  <Card className="p-4 flex flex-col items-center justify-center text-center h-full">
    
    <Package className="w-12 h-12 text-blue-600 mb-4" />

    <h3 className="font-bold mb-2">
      View All Products
    </h3>

    <p className="text-sm text-muted-foreground mb-4">
      Explore our complete pharmaceutical product range
    </p>

    <Button variant="outline" size="sm" className="w-full">
      Open Catalog
      <ArrowRight />
    </Button>

  </Card>
</Link>






    </div>
  </div>
</section>




    <Services/>
      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 animate-slide-in">
               Why Choose SunElite Pharma <br /> <span className=" text-blue-500">as</span> <br /> Your Pharmaceutical Export Partner
            </h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
  SunElite Pharma is a trusted pharmaceutical exporter from India,
  providing high-quality generic medicines with strict adherence to
  WHO GMP guidelines. Our expertise in global logistics and regulatory
  compliance makes us a reliable medicine supplier for international markets.
</p>

          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 p-10 text-center hover:shadow-lg transition"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-blue-100">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
<section className="w-full bg-gradient-to-r from-[#0A2540] via-[#1E40AF] to-[#0A2540] py-24">

        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Expand Your Reach?
          </h2>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Partner with us for reliable pharmaceutical exports. Get a
            competitive quote for your bulk requirements today.
          </p>

          <button onClick={()=>Navigate("/contact")} className="bg-white text-slate-900 font-semibold px-10 py-4 rounded-xl shadow-md hover:bg-gray-100 transition">
             Request Export Quotation
          </button>
        </div>
      </section>
      <Footer/>
      <WhatsAppFloat/>
    </>
  );
};

export default Home;