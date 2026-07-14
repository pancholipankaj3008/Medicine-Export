import { useEffect, useState } from "react";
import {
  
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import { auth } from "../firebase";
import { User, Lock, LogOut , MoveLeft} from "lucide-react";

const Profile = () => {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(true);


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

 useEffect(() => {
  const fetchUserData = async () => {
    if (!user) return;

    const ref = doc(db, "admins", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      setName(snap.data().name || "");
    }
    setNameLoading(false);
  };

  fetchUserData();
}, [user]);


const handleNameUpdate = async () => {
  if (!name.trim()) {
    alert("Name cannot be empty");
    return;
  }

  try {
    setLoading(true);

    const ref = doc(db, "admins", user.uid);
    await updateDoc(ref, {
      name: name.trim(),
    });

    alert("Name updated successfully");
  } catch (e) {
    alert(e.message);
  } finally {
    setLoading(false);
  }
};


  /* ================= RE-AUTH ================= */
  const reAuth = async () => {
    if (!currentPassword) {
      throw new Error("Enter current password");
    }

    const cred = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    await reauthenticateWithCredential(user, cred);
  };

  

  /* ================= PASSWORD CHANGE ================= */
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill both password fields");
      return;
    }

    try {
      setLoading(true);
      await reAuth();
      await updatePassword(user, newPassword);
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  
  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <button
  onClick={() => (window.location.href = "/productAdmin")}
  className="flex items-center gap-2 px-6 py-2 mb-5 border rounded-lg  hover:bg-blue-500 hover:text-white "
>
  <MoveLeft size={18}/> Back
</button>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* PROFILE INFO */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <User size={18} /> Profile Info
          </h2>
          

          <div className="grid gap-4">
            <div>
              <label className="text-sm text-slate-600">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg"
              />
              
            </div>
            


            <div>
              <label className="text-sm text-slate-600">Email</label>
              <input
                value={user.email}
                disabled
                className="w-full border px-4 py-2 rounded-lg bg-slate-100"
              />
            </div>

            <button
  disabled={loading || nameLoading}
  onClick={handleNameUpdate}
  className="self-end bg-[#1e3a5f] text-white px-6 py-2 rounded-lg"
>
  Save Name
</button>


          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Lock size={18} /> Security
          </h2>

          <div className="grid gap-3">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border px-4 py-2 rounded-lg"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border px-4 py-2 rounded-lg"
            />
            <button
              disabled={loading}
              onClick={handlePasswordChange}
              className="bg-[#1e3a5f] text-white px-6 py-2 rounded-lg w-fit"
            >
              Change Password
            </button>

            <a
              href="/forgotPassword"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-bold mb-4">Actions</h2>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-red-500 hover:text-white "
            >
              <LogOut size={16} /> Logout
            </button>

            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
