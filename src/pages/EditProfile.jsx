import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const EditProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateProfile(user, {
        displayName: displayName.trim(),
        photoURL: photoURL.trim(),
      });
      setMessage(" Profile updated successfully!");
    } catch (error) {
      setMessage("❌ Failed to update profile.");
    }
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen p-6 text-slate-800">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none"
              placeholder="Your name"
              required
            />
          </div>

         
          <button
            type="submit"
            className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600 transition"
          >
            Save Changes
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium text-slate-800">{message}</p>
        )}

        <div className="mt-6">
          <Link
            to="/profile"
            className="text-slate-800 underline hover:text-slate-700"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
