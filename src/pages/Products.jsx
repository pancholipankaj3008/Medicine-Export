import React, { useEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Search, Filter, Package, ArrowRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // 🔁 adjust path if needed
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsappFloat";
import { useNavigate , Link} from "react-router-dom";

/* =======================
   Utils
======================= */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* =======================
   Button
======================= */
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

/* =======================
   Badge
======================= */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);



/* =======================
   Card
======================= */
const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
);

/* =======================
   Input
======================= */
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
        className
      )}
      {...props}
    />
  );
});

/* =======================
   Categories (UNCHANGED)
======================= */
// const categories = [
//   { id: "all", name: "All Products" },
// ];

/* =======================
   Main Page
======================= */
const Products = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);


  const navigate = useNavigate();

  



  useEffect(() => {
  const handleOffline = () => {
    setIsOffline(true);
    setError("You are offline. Please check your internet connection.");
  };

  const handleOnline = () => {
    setIsOffline(false);
    setError("");
    window.location.reload();
  };

  window.addEventListener("offline", handleOffline);
  window.addEventListener("online", handleOnline);

  return () => {
    window.removeEventListener("offline", handleOffline);
    window.removeEventListener("online", handleOnline);
  };
}, []);



  /* =======================
     Fetch Firestore Products
  ======================= */

  
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setProducts(list);
    } catch (error) {
      console.error("Error fetching products:", error);

      // 🔽 YAHAN ADD KARNA HAI
      setError("Unable to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  const dynamicCategories = [
  { id: "all", name: "All Products" },

  ...Array.from(
    new Map(
      products.map((p) => [
        p.drugType?.id,
        {
          id: p.drugType?.id,
          name: p.drugType?.name,
        },
      ])
    ).values()
  ).filter((c) => c.id),
];
  const selectedCategory =
  dynamicCategories.find((c) => c.id === activeCategory)?.name || "Categories";




  /* =======================
     Filter Logic
  ======================= */
  const filteredProducts = products.filter((product) => {
    const matchCategory =
      activeCategory === "all" ||
      product.drugType?.id === activeCategory;

    const matchSearch = product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar/>
    <div className="min-h-screen bg-background py-10">
      {/* HERO (UNCHANGED) */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-hero-gradient ">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-semibold mb-4 animate-slide-in">
              Product Catalog
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 animate-slide-in">
Pharmaceutical Products Supplier from India            </h1>
            <p className="text-lg text-primary-foreground/80 animate-slide-in">
  Explore our wide range of WHO GMP certified pharmaceutical products.
  We supply high-quality generic medicines for global pharmaceutical
  distributors, hospitals, and importers.
</p>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* SIDEBAR */}
            <aside className="lg:w-64 shrink-0">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="bg-card rounded-xl border border-border p-4">

  {/* Header (clickable only on mobile) */}
  <button
  type="button"
  onClick={() => setMobileCatOpen((prev) => !prev)}
  className="w-full flex items-center justify-between gap-2 mb-2"
>
  <div className="flex items-center gap-2 min-w-0">
    <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
    <span className="font-semibold truncate">
      {selectedCategory}
    </span>
  </div>

  <svg
    className={`w-4 h-4 transition-transform lg:hidden ${
      mobileCatOpen ? "rotate-180" : ""
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
      clipRule="evenodd"
    />
  </svg>
</button>


  {/* Category list */}
  <div
    className={`
      space-y-1
      ${mobileCatOpen ? "block" : "hidden"}
      lg:block
    `}
  >
    {dynamicCategories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => {
          setActiveCategory(cat.id);
          setMobileCatOpen(false); // close dropdown on mobile
        }}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
          activeCategory === cat.id
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <span>{cat.name}</span>
      </button>
    ))}
  </div>
</div>

            </aside>

            {/* PRODUCTS GRID */}
            <div className="flex-1 grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
{(error || isOffline) && !loading && (
  <div className="col-span-full flex justify-center py-20">
    <div className=" rounded-xl p-8 text-center max-w-md">
      <h2 className="text-xl font-bold mb-2">
        Connection Issue
      </h2>
      <p className="text-muted-foreground mb-4">
        {error || "You are currently offline."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/90 transition"
      >
        Retry
      </button>
    </div>
  </div>
)}






              {loading &&
    Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="rounded-lg border bg-card shadow-sm p-4 animate-pulse"
      >
        {/* IMAGE */}
        <div className="w-full h-40 bg-slate-200 rounded-md mb-4" />

        {/* PRODUCT NAME */}
        <div className="h-5 w-3/4 bg-slate-200 rounded mb-3" />

        {/* PHYSICAL FORM */}
        <div className="h-4 w-1/2 bg-slate-200 rounded mb-4" />

        {/* DETAILS */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-slate-200 rounded" />
            <div className="h-3 w-24 bg-slate-200 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-slate-200 rounded" />
            <div className="h-3 w-24 bg-slate-200 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-3 w-20 bg-slate-200 rounded" />
            <div className="h-3 w-24 bg-slate-200 rounded" />
          </div>
        </div>

        {/* BUTTON */}
        <div className="h-9 w-full bg-slate-200 rounded-lg" />
      </div>
    ))}


              {!loading &&
                filteredProducts.map((product) => (
                  <Link to={`/product/${product.docId}`} key={product.docId}>
                  <Card className="p-4" >
                    <img
                      src={product.image}
alt={`${product.name} pharmaceutical product supplier from India`}
                      className="w-full h-40 object-cover rounded-md mb-4 animate-fade-in"
                    />

                    <h3 className="font-bold mb-2 animate-slide-in line-clamp-1">{product.name}</h3>

                    <p className="text-sm text-muted-foreground mb-4 animate-slide-in">
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

                    <Button variant="outline" size="sm" className="w-full animate-slide-in" onClick={() => navigate(`/product/${product.docId}`)}>
                     View Product
                      <ArrowRight />
                    </Button>
                  </Card>
                      </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
      
    </div>
    <Footer/>
      <WhatsAppFloat/>
    </>
  );
};

export default Products;
