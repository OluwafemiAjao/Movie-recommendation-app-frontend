// import React from "react";
// import Watchlist from "../components/Watchlist";

// const Profile = () => {
//   return (
//     <div className="profile-page">
//       <h1>User Profile</h1>
//       <section>
//         <h2>Welcome back, [User]!</h2>
//         <p>Email: user@example.com</p>
//       </section>

//       <section>
//         <h2>Your Watchlist</h2>
//         <Watchlist />
//       </section>
//     </div>
//   );
// };

// export default Profile;




// import React, { useState, useEffect } from "react";
// import Watchlist from "../components/Watchlist";

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     favoriteGenre: "",
//   });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("profile"));
//     if (saved) setProfile(saved);
//   }, []);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     localStorage.setItem("profile", JSON.stringify(profile));
//     alert("Profile saved!");
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
//         <div className="space-y-4">
//           <input
//             name="name"
//             value={profile.name}
//             onChange={handleChange}
//             placeholder="Name"
//             className="border p-2 w-full"
//           />
//           <input
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border p-2 w-full"
//           />
//           <input
//             name="favoriteGenre"
//             value={profile.favoriteGenre}
//             onChange={handleChange}
//             placeholder="Favorite Genre"
//             className="border p-2 w-full"
//           />
//           <button
//             onClick={handleSave}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Save Profile
//           </button>
//         </div>
//       </div>

//       {/* Optional Watchlist */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
//         <Watchlist hideTitle />
//       </div>
//     </div>
//   );
// };

// export default Profile;






// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Watchlist from "../components/Watchlist";

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     favoriteGenre: "",
//   });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("profile"));
//     if (saved) setProfile(saved);
//   }, []);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     localStorage.setItem("profile", JSON.stringify(profile));
//     alert("Profile saved!");
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
//         <div className="space-y-4">
//           <input
//             name="name"
//             value={profile.name}
//             onChange={handleChange}
//             placeholder="Name"
//             className="border p-2 w-full"
//           />
//           <input
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="border p-2 w-full"
//           />
//           <input
//             name="favoriteGenre"
//             value={profile.favoriteGenre}
//             onChange={handleChange}
//             placeholder="Favorite Genre"
//             className="border p-2 w-full"
//           />
//           <button
//             onClick={handleSave}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Save Profile
//           </button>
//         </div>

//         {/* Quick Navigation */}
//         <div className="flex gap-4 mt-6">
//           <Link to="/favorites" className="text-blue-400 hover:underline">
//             View Favorites
//           </Link>
//           <Link to="/" className="text-blue-400 hover:underline">
//             Back to Home
//           </Link>
//         </div>
//       </div>

//       {/* Optional Watchlist */}
//       <div>
//         <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
//         <Watchlist hideTitle />
//       </div>
//     </div>
//   );
// };

// export default Profile;




// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import backendApi from "../services/axiosConfig";
// import Watchlist from "../components/Watchlist";
// import { logoutUser } from "../services/authService";

// const Profile = () => {
//   const [profile, setProfile] = useState({ name: "", email: "", favoriteGenre: "" });

//   useEffect(() => {
//     backendApi.get("/users/me")
//       .then((res) => setProfile(res.data))
//       .catch(() => {});
//   }, []);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // const handleSave = async () => {
//   //   await backendApi.put("/users/me", profile);
//   //   alert("Profile updated!");
//   // };
  
//   const handleSave = async () => {
//   try {
//     const res = await backendApi.put("/users/me", profile);
//     alert(res.data.message); // Will show "Profile saved successfully!"
//   } catch (err) {
//     if (err.response && err.response.data.message) {
//       alert(err.response.data.message); // Will show "Profile already exists."
//     } else {
//       alert("Error saving profile.");
//     }
//   }
// };
  
  
//   const handleLogout = () => { // 1. Clear JWT token (from localStorage/sessionStorage/cookies)
//     logoutUser();
//     // 2. Redirect user to login page
//     window.location.href = "/login";
//   };

//   return (
//     <div className="p-6 space-y-8">
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
//         <div className="space-y-4">
//           <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
//           <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
//           <input name="favoriteGenre" value={profile.favoriteGenre} onChange={handleChange} placeholder="Favorite Genre" className="border p-2 w-full" />
//           <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save Profile</button>
//           <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
//         </div>
//         <div className="flex gap-4 mt-6">
//           <Link to="/favorites" className="text-blue-400 hover:underline">View Favorites</Link>
//           <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
//         </div>
//       </div>
//       <div>
//         <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
//         <Watchlist hideTitle />
//       </div>
//     </div>
//   );
// };

// export default Profile;





import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backendApi from "../services/axiosConfig";
import Watchlist from "../components/Watchlist";
import { logoutUser } from "../services/authService";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", favoriteGenre: "" });

  useEffect(() => {
    backendApi.get("/users/me")
      .then((res) => setProfile(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  
  // const handleSave = async () => {
  //   try {
  //     const res = await backendApi.put("/users/me", profile);
  //     alert(res.data.message);
  //   } catch (err) {
  //     if (err.response?.data?.message) {
  //       alert(err.response.data.message);
  //     } else {
  //       alert("Error saving profile.");
  //     }
  //   }
  // };


  const handleSave = async () => {
  try {
    const res = await backendApi.put("/users/me", profile);
    alert(res.data.message || "Profile saved successfully!");
    setProfile(res.data.user || profile); // ✅ keep profile state in sync
  } catch (err) {
    alert(err.response?.data?.message || "Error saving profile.");
  }
};
  
  const handleLogout = () => {
    logoutUser();
    window.location.href = "/login";
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <div className="space-y-4">
          <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" className="border p-2 w-full" />
          <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
          <input name="favoriteGenre" value={profile.favoriteGenre} onChange={handleChange} placeholder="Favorite Genre" className="border p-2 w-full" />
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save Profile</button>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
        </div>
        <div className="flex gap-4 mt-6">
          <Link to="/favorites" className="text-blue-400 hover:underline">View Favorites</Link>
          <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Your Watchlist</h2>
        {/* Pass prop to ensure add/remove buttons show */}
        <Watchlist hideTitle showButtons />
      </div>
    </div>
  );
};

export default Profile;


