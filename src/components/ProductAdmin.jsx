import { useEffect, useState,  useRef } from "react";
import { Plus, Trash2, Box, X, Pencil, Check, Search } from "lucide-react";
import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import ImageUpload from "./ImageUpload";

const ProductAdmin = () => {
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();



  
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    physicalForm: "",
    packing: "",
    minQty: "",
    unit: "Box",
    storage: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [showCatInput, setShowCatInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCatId, setEditingCatId] = useState(null);
  const categoryPopupRef = useRef(null);
  const [categorySearch, setCategorySearch] = useState("");


  


  useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      showCatInput &&
      categoryPopupRef.current &&
      !categoryPopupRef.current.contains(e.target)
    ) {
      setShowCatInput(false);
      setEditingCatId(null);
      setNewCategory("");
      setCategorySearch("");
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, [showCatInput]);


  
  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProducts(data);
      setFilteredProducts(data);
    });
    return () => unsub();
  }, []);

  /* ================= FETCH CATEGORIES ================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  /* ================= FILTER ================= */
  useEffect(() => {
  let data = products;

  if (selectedCategory !== "all") {
    data = data.filter(
      (p) => p.drugType?.id === selectedCategory
    );
  }

  if (searchTerm.trim()) {
    data = data.filter((p) =>
      p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }

  setFilteredProducts(data);
}, [selectedCategory, searchTerm, products]);


  /* ================= ADD / UPDATE PRODUCT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCat = categories.find(
      (c) => c.id === form.categoryId
    );
    if (!selectedCat) return alert("Select category");

    const payload = {
      name: form.name,
      image: form.image,
      productDescription: form.description,
      physicalForm: form.physicalForm,
      drugType: {
        id: selectedCat.id,
        name: selectedCat.name,
      },
      packingStyle: [form.packing],
      minimumOrder: {
        quantity: Number(form.minQty),
        unit: form.unit,
        note: "Or as per packing style",
      },
      storage: form.storage,
      createdAt: new Date(),
    };

    if (editingId) {
      await updateDoc(doc(db, "products", editingId), payload);
    } else {
      await addDoc(collection(db, "products"), payload);
    }

    resetForm();
  };

  /* ================= CATEGORY ADD / UPDATE ================= */
  const handleAddOrUpdateCategory = async () => {
  const nameToSave = editingCatId
    ? newCategory.trim()
    : categorySearch.trim();

  if (!nameToSave) return;

  const alreadyExists = categories.some(
    (c) =>
      c.name.toLowerCase() === nameToSave.toLowerCase() &&
      c.id !== editingCatId
  );

  if (alreadyExists) {
    alert("Category already exists");
    return;
  }

  if (editingCatId) {
    await updateDoc(doc(db, "categories", editingCatId), {
      name: nameToSave,
    });
  } else {
    const ref = await addDoc(collection(db, "categories"), {
      name: nameToSave,
      createdAt: serverTimestamp(),
    });
    setForm({ ...form, categoryId: ref.id });
  }

  setNewCategory("");
  setCategorySearch("");
  setEditingCatId(null);
  setShowCatInput(false);
};



  const deleteCategory = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Delete this category?")) {
      await deleteDoc(doc(db, "categories", id));
      if (form.categoryId === id)
        setForm({ ...form, categoryId: "" });
    }
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      categoryId: "",
      physicalForm: "",
      packing: "",
      minQty: "",
      unit: "Box",
      storage: "",
      image: "",
    });
    setEditingId(null);
    setIsModalOpen(false);
    setShowCatInput(false);
    setNewCategory("");
    setEditingCatId(null);
    setCategorySearch("");

  };

  /* ================= EDIT ================= */
  const handleEdit = (p) => {
    setForm({
      name: p.name,
      description: p.productDescription,
      categoryId: p.drugType.id,
      physicalForm: p.physicalForm,
      packing: p.packingStyle[0],
      minQty: p.minimumOrder.quantity,
      unit: p.minimumOrder.unit,
      storage: p.storage,
      image: p.image || "",
    });
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  /* ================= DELETE ================= */
 const deleteProduct = async (id) => {
  if (!window.confirm("Delete product permanently?")) return;
  await deleteDoc(doc(db, "products", id));
};


  return (
    <>
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      {/* HEADER */}
      {/* HEADER SECTION */}
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 bg-white p-4 md:p-6 rounded-2xl border border-slate-100 shadow-sm">
  
  {/* LEFT SIDE: LOGO & TITLE */}
  <div className="flex items-center gap-4">
    <div className="flex-shrink-0">
      <img src="Logo-Blue.png" alt="Logo" className="h-12 md:h-14 w-auto object-contain" />
    </div>
    <div className="h-10 w-[2px] bg-slate-100 hidden md:block"></div> {/* Vertical Divider */}
    <div>
      <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-none">
        Product Admin
      </h1>
      <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
        Manage your inventory
      </p>
    </div>
  </div>

  {/* RIGHT SIDE: SEARCH & ACTIONS */}
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
    
    {/* 🔍 SEARCH PRODUCT */}
    <div className="relative flex-1 sm:flex-none">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input
        type="text"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-11 w-full md:w-40 pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-slate-50/50 outline-none focus:bg-white focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/5 transition-all"
      />
    </div>

    {/* CATEGORY & BUTTONS GROUP */}
    <div className="flex items-center gap-2">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="h-11 border border-slate-200 px-3 py-2 rounded-xl text-sm bg-white outline-none focus:border-[#1e3a5f] font-medium text-slate-600 flex-1 sm:flex-none min-w-[120px]"
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        onClick={() => setIsModalOpen(true)}
        className="h-11 bg-[#1e3a5f] text-white px-5 py-2 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-900/20 hover:bg-[#152a45] active:scale-95 transition-all whitespace-nowrap"
      >
        <Plus size={20} strokeWidth={3} /> 
        <span className="hidden sm:inline">Add Product</span>
        <span className="sm:hidden text-xs">Add</span>
      </button>

      <button
        onClick={() => navigate("/profile")}
        className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-[#1e3a5f] transition-all border border-slate-100"
        title="Profile"
      >
        <UserCircle size={28} />
      </button>
    </div>
  </div>
</div>

      {/* ================= TABLE UI (FIRST CODE – UNCHANGED) ================= */}
      <div className="hidden md:block bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 text-slate-500 text-sm">
  <tr>
    <th className="px-4 py-4 text-left w-[5%]">
      Sr No.
    </th>
    <th className="px-4 py-4 text-left w-[5%]">
  Image
</th>

    <th className="px-6 py-4 text-left w-[40%]">
      Product
    </th>
    <th className="px-6 py-4 text-left w-[30%]">
      Category
    </th>
    <th className="px-6 py-4 text-right w-[20%]">
      Actions
    </th>
  </tr>
</thead>

          <tbody>
            {filteredProducts.map((p,idx) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-4 font-medium">
    {idx + 1}
  </td>
  <td className="px-2 py-4">
  {p.image ? (
    <img
      src={p.image}
      alt={p.name}
      className="w-14 h-14 object-cover rounded-lg border"
    />
  ) : (
    <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400">
      No Image
    </div>
  )}
</td>

                <td className="px-6 py-4">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500">
                    {p.physicalForm} • Min {p.minimumOrder.quantity}{" "}
                    {p.minimumOrder.unit}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs">
                    {p.drugType.name}
                  </span>
                </td>
<td className="px-6 py-4 text-right">
  <div className="flex justify-end gap-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-slate-500"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE UI (UNCHANGED) ================= */}
      <div className="grid md:hidden xs:grid-cols1 sm:grid-cols-2 gap-4">
  {filteredProducts.map((p, idx) => (
    <div
  key={p.id}
  className="bg-white rounded-xl border p-4 shadow-sm max-w-sm w-full mx-auto "
>
  <div className="flex gap-4 items-start">
    
    {/* IMAGE */}
    <div className="flex-shrink-0">
      {p.image ? (
        <img
          src={p.image}
          alt={p.name}
          className="w-20 h-20 object-cover rounded-lg border"
        />
      ) : (
        <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400">
          No Image
        </div>
      )}
    </div>

    {/* CONTENT */}
    <div className="flex-1 min-w-0">
      
      {/* NAME + EDIT */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-sans font-medium text-sm text text-slate-00 ">
          {p.name}
        </h3>
        <button
          onClick={() => handleEdit(p)}
          className="text-slate-500"
        >
          <Pencil size={16} />
        </button>
      </div>

      {/* FORM + MIN */}
      <div className="text-sm text-slate-500 mt-1">
        {p.physicalForm} • Min {p.minimumOrder.quantity}
      </div>

      {/* CATEGORY + DELETE */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600">
          {p.drugType.name}
        </span>

        <button
          onClick={() => deleteProduct(p.id)}
          className="text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </div>
</div>

  ))}
</div>


      {/* ================= MODAL (SECOND CODE – REPLACED) ================= */}
      {isModalOpen && (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-start p-4 overflow-y-auto">
    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 md:p-8 my-8 relative">
      
      <button
        onClick={resetForm}
        className="absolute right-6 top-6 text-slate-300 hover:text-slate-500"
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-bold text-[#1e3a5f] mb-8">
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
       {/* 1️⃣ PRODUCT NAME + CATEGORY */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
  {/* Product Name */}
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-600">
      Product Name
    </label>
    <input
      placeholder="Enter name"
      className="w-full px-4 py-3 rounded-xl border border-slate-200"
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
      required
    />
  </div>

  {/* Category */}
  <div className="flex flex-col gap-2 relative">
    <label className="text-sm font-semibold text-slate-600">
      Category
    </label>

    <div className="flex gap-2">
      <select
        value={form.categoryId}
        onChange={(e) =>
          setForm({ ...form, categoryId: e.target.value })
        }
        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white"
        required
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="px-4 rounded-xl bg-slate-100"
        onClick={() => setShowCatInput(!showCatInput)}
      >
        <Plus size={18} />
      </button>
    </div>

    {/* CATEGORY ADD / SEARCH POPUP (already working code rahega) */}
    {showCatInput && (
              <div className="absolute z-10 mt-2 w-full bg-white border rounded-xl p-3 shadow-lg" ref={categoryPopupRef}>
                <div className="flex gap-2 mb-3">
                  <input
  autoFocus
  placeholder={
    editingCatId
      ? "Edit category..."
      : "Search or add category..."
  }
  className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-[#1e3a5f]"
  value={editingCatId ? newCategory : categorySearch}
  onChange={(e) =>
    editingCatId
      ? setNewCategory(e.target.value)
      : setCategorySearch(e.target.value)
  }
/>


                  <button
                    type="button"
                    onClick={handleAddOrUpdateCategory}
                    className="bg-[#1e3a5f] text-white px-3 rounded-lg"
                  >
                    <Check size={16} />
                  </button>
                </div>

                <div className="max-h-32 overflow-y-auto space-y-1">
                  {categories
  .filter((c) =>
    c.name
      .toLowerCase()
      .includes(
        (editingCatId ? newCategory : categorySearch).toLowerCase()
      )
  )
  .map((c) => (

                    <div
                      key={c.id}
                      className="flex justify-between items-center p-2 hover:bg-slate-50 rounded"
                    >
                      <span className="text-sm">
                        {c.name}
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCatId(c.id);
                            setNewCategory(c.name);
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) =>
                            deleteCategory(c.id, e)
                          }
                          className="text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
  </div>
</div>


{/* IMAGE URL */}
<ImageUpload
  value={form.image}
  onChange={(url) => setForm({ ...form, image: url })}
/>




{/* 2️⃣ DESCRIPTION */}
<div className="flex flex-col gap-2">
  <label className="text-sm font-semibold text-slate-600">
    Description
  </label>
  <textarea
    rows="3"
    placeholder="Product details..."
    className="w-full px-4 py-3 rounded-xl border border-slate-200 resize-none"
    value={form.description}
    onChange={(e) =>
      setForm({ ...form, description: e.target.value })
    }
  />
</div>

{/* 3️⃣ FORM / PACKING / MIN QTY / STORAGE */}
<div className="grid grid-cols-2 md:grid-cols-2 gap-4">
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-slate-500 uppercase">
      Form
    </label>
    <input
      placeholder="Tablet"
      className="px-4 py-3 rounded-xl border border-slate-200"
      value={form.physicalForm}
      onChange={(e) =>
        setForm({ ...form, physicalForm: e.target.value })
      }
    />
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-slate-500 uppercase">
      Packing
    </label>
    <input
      placeholder="10x10"
      className="px-4 py-3 rounded-xl border border-slate-200"
      value={form.packing}
      onChange={(e) =>
        setForm({ ...form, packing: e.target.value })
      }
    />
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-slate-500 uppercase">
      Min Qty
    </label>
    <input
      type="number"
      placeholder="100"
      className="px-4 py-3 rounded-xl border border-slate-200"
      value={form.minQty}
      onChange={(e) =>
        setForm({ ...form, minQty: e.target.value })
      }
    />
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-slate-500 uppercase">
      Storage
    </label>
    <input
      placeholder="Cool place"
      className="px-4 py-3 rounded-xl border border-slate-200"
      value={form.storage}
      onChange={(e) =>
        setForm({ ...form, storage: e.target.value })
      }
    />
  </div>
</div>

{/* 4️⃣ BUTTONS */}
<div className="flex justify-end gap-3 pt-6">
  <button
    type="button"
    onClick={resetForm}
    className="px-6 py-2 border rounded-xl"
  >
    Cancel
  </button>
  <button
    type="submit"
    className="px-8 py-2 rounded-xl bg-[#1e3a5f] text-white"
  >
    {editingId ? "Update" : "Add"}
  </button>
</div>

      </form>
    </div>
  </div>
)}

    </div>

<footer className="w-full border-t border-slate-200 bg-white mt-8">
  <div className="max-w-7xl mx-auto px-4 py-5 text-center">
    <p className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide">
      © {new Date().getFullYear()}{" "}
      <span className="text-[#1e3a5f]">
        Sun Elite Pharma Export
      </span>
      . All rights reserved.
    </p>
  </div>
</footer>

</>
  );
};

export default ProductAdmin;




