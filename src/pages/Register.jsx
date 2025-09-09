// src/pages/Register.jsx
// import { useState } from "react";
// import { registerUser } from "../services/authService";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await registerUser(form.name, form.email, form.password);
//       navigate("/login"); // redirect after register
//     } catch (err) {
//       setError("Registration failed. Try again.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Register</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         />
//         <button className="bg-green-600 text-white px-4 py-2 rounded">
//           Register
//         </button>
//       </form>

//       <p className="mt-4 text-gray-400">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-400 hover:underline">
//           Login
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Register;





import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- import context

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- we’ll auto-login after register

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await registerUser(
        form.name,
        form.email,
        form.password
      );
      login(user, token); // <-- update context right away
      navigate("/profile"); // redirect after register
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>

      <p className="mt-4 text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
