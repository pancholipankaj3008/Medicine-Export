

import React, { useEffect, useState } from "react";
import {
  Package,
  Pill,
  Info,
  CheckCircle,
  ClipboardList,
  MoveLeft,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../index.css"
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  const [openForm, setOpenForm] = useState(false);
  const [result, setResult] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    const data = new FormData();
    data.append("access_key", "8e5d9345-f1b2-44e2-af18-7f628ef31f0e");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("company", formData.company);
    data.append(
      "message",
      `Product: ${product.name}\n\n${formData.message}`
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const res = await response.json();

      if (res.success) {
        setResult("Enquiry sent successfully!");
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch (error) {
      setResult("Network error. Please try later.");
    }
  };







  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProduct(snap.data());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        message: `I would like to inquire about ${product.name}.`,
      }));
    }
  }, [product]);



  if (loading) {
    return (
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">

            {/* Image Skeleton */}
            <div className="bg-white rounded-2xl p-6">
              <div className="bg-slate-200 rounded-xl h-[420px]" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="h-6 w-32 bg-slate-200 rounded-full" />
              <div className="h-6 w-32 bg-slate-200 rounded" />
              <div className="h-10 w-3/4 bg-slate-200 rounded" />
              <div className="h-5 w-full bg-slate-200 rounded" />
              <div className="h-5 w-full bg-slate-200 rounded" />
              <div className="h-5 w-5/6 bg-slate-200 rounded" />

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="h-24 bg-slate-200 rounded-xl" />
                <div className="h-24 bg-slate-200 rounded-xl" />
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }


  if (!product) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-md text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Product Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            Something Wrong!!
          </p>
          <a
            href="/Products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full"
          >
            Back to Products
          </a>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-6 py-3 mt-3 rounded-lg hover:bg-primary/90 transition w-full"
          >
            Retry
          </button>
        </div>

      </section>
    );
  }



  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <Link
  to="/products"
  className="flex items-center w-56 gap-2 px-6 py-2 mb-5 border rounded-lg hover:bg-blue-500 hover:text-white"
>
  <MoveLeft size={18} /> Back to Products
</Link>

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16
  animate-[fadeInUp_0.6s_ease-out]">

          {/* IMAGE */}
          {/* <div className="bg-white rounded-2xl shadow-sm p-6"> */}
            <div className="bg-slate-100 rounded-xl p-4 flex items-center justify-center">
              <img
                src={product.image}
alt={`${product.name} generic medicine supplier from India for pharmaceutical export`}
                className="max-h-[380px] w-full object-contain transition-transform duration-300 hover:scale-105"
              />

            </div>
          {/* </div> */}

          {/* SUMMARY */}
          <div>
            <span className="inline-block bg-blue-600 text-white text-sm px-4 py-1 rounded-full mb-4">
              Featured Product
            </span>

            <p className="text-blue-600 font-medium mb-2">
              {product.drugType?.name}
            </p>

            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {product.name}
            </h1>

            <p className="text-slate-600 text-lg mb-8">
              {product.productDescription}{" "}
  Contact us to request export pricing, documentation,
  and bulk supply options for this pharmaceutical product.
            </p>

            {/* INFO CARDS */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <InfoCard
                icon={<Pill className="w-5 h- text-blue-600" />}
                title="Physical Form"
                value={product.physicalForm}
              />
              <InfoCard
                icon={<Package className="w-5 h-5 text-blue-600" />}
                title="Packing Style"
                value={product.packingStyle?.[0]}
              />
            </div>

            {/* EXPORT INFO
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2 mb-4">
                <Info className="w-5 h-5" />
                Export Information
              </h3>

              <ul className="space-y-3 text-blue-700">
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                  Available for bulk orders worldwide
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                  COA and MSDS documentation included
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                  Temperature controlled shipping options
                </li>
              </ul>
            </div> */}

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white text-lg font-medium px-8 py-4 rounded-xl shadow-md" onClick={() => setOpenForm(true)}>
              Inquire About This Product
            </button>

            {openForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative">

                  <button
                    onClick={() => setOpenForm(false)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-slate-800"
                  >
                    ✕
                  </button>

                  <h3 className="text-2xl font-bold mb-2">
                    Product Enquiry
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Enquiry for <strong>{product.name}</strong>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        className="border rounded-lg px-4 py-2"
                        placeholder="Full Name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />

                      <input
                        type="email"
                        className="border rounded-lg px-4 py-2"
                        placeholder="Email Address"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <input
                      className="border rounded-lg px-4 py-2 w-full"
                      placeholder="Company Name"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />

                    <textarea
                      rows={4}
                      className="border rounded-lg px-4 py-2 w-full"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      Send Enquiry
                    </button>

                    {result && (
                      <p className="text-center text-sm mt-2">{result}</p>
                    )}
                  </form>
                </div>
              </div>
            )}



          </div>
        </div>

        {/* SPECIFICATIONS */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-6">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            Product Specifications
          </h2>

          <div className="divide-y">
            <SpecRow label="Product Name" value={`${product.name} Pharmaceutical Product`} />
            <SpecRow label="Physical Form of Medicine" value={product.physicalForm} />
            <SpecRow label="Drug Type" value={product.drugType?.name} />
            <SpecRow label="Storage Instructions" value={product.storage} />
            <SpecRow
              label="Minimum Order"
              value={`${product.minimumOrder?.quantity} ${product.minimumOrder?.unit} (${product.minimumOrder?.note})`}
            />
            <SpecRow
              label="Packing Style"
              value={product.packingStyle?.[0]}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Product Description
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            {product.productDescription}
            {" "}
  This {product.name} is supplied by a trusted pharmaceutical exporter from India,
  suitable for bulk orders and international markets.
          </p>
        </div>

      </div>
    </section>
  );
};

/* INFO CARD */
const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl border p-5 shadow-sm">
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h4 className="font-semibold text-slate-800">{title}</h4>
    </div>
    <p className="text-slate-600 text-sm">{value}</p>
  </div>
);

/* SPEC ROW */
const SpecRow = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-4 gap-2">
    <span className="text-slate-500 font-medium">{label}</span>
    <span className="text-slate-800 font-semibold">{value}</span>
  </div>
);

export default ProductDetails;




