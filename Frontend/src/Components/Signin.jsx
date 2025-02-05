import  { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {  Link,useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "", // Updated field
    email: "",
    password: "",
  });
  const [loading , setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    if (!formData.role) {
      toast.error("Role is required!");
      return false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("A valid email is required!");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   setLoading(true);
    if (!validateFields()) return;

    try {
      const response = await fetch("https://hackathon-8k3r.onrender.com/signin", {
        method: "POST",
        headers: {    
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("user_id",result.data.id);
        localStorage.setItem("role",result.data.role);
        setMessage(result.message || "Signup successful!");
        toast.success(result.message || "Signup successful!");
        navigate("/");
       
      } else {
        const error = await response.json();
        setMessage(error.message || "Signup failed.");
        toast.error(error.message || "Signup failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred.");
      toast.error("An error occurred.");
    }finally{
      setLoading(false);
    }
  };
       
  return (
    <div className="flex items-center justify-center h-screen bg-[url('https://vcet.ac.in/vcetit/images/it_service/VCET.jpeg')] bg-cover">
      <ToastContainer/>
      <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-red-900 bg-rounded-lg">
        <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full gap-2 px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up  {loading && <div className="loader"></div>} 
          </button>
        </form>
        <p className="text-center text-gray-950">Already have an account? {" "}
          <Link to="/" className="text-white hover:underline">
             Login
          </Link>
        </p>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Signin;