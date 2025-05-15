import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login"); // Redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-slate-700">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen text-slate-800 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-slate-300 flex items-center justify-center text-xl font-bold text-white">
            {user.displayName ? user.displayName.charAt(0) : "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.displayName || "Unnamed User"}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* User Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/edit-profile")}
            className="block w-full bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
