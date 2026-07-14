import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  // READ (realtime)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });
    return () => unsub();
  }, []);

  // ADD
  const addCategory = async (name) => {
    const exists = categories.some(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) throw new Error("Category already exists");

    const ref = await addDoc(collection(db, "categories"), {
      name: name.trim(),
      createdAt: serverTimestamp(),
    });

    return ref.id;
  };

  // UPDATE
  const updateCategory = async (id, name) => {
    await updateDoc(doc(db, "categories", id), {
      name: name.trim(),
    });
  };

  // DELETE
  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, "categories", id));
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
