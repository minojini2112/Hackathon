import  { useEffect, useState } from "react";
import {  Link , useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const[profile,setProfile]=useState({});
    const [loading , setLoading] = useState(false);
    const userId = localStorage.getItem("user_id");
    const role =localStorage.getItem("role");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://hackathon-q8la.onrender.com/getprofile/${userId}`
        );
        if (response.ok) {
          const result = await response.json();
          setProfile(result.data);
        }
      } catch (error) {
        console.log("An error occured", error);
      }
    };
    fetchProfile();
  }, [userId]);
  
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://hackathon-q8la.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        localStorage.setItem("user_id",result.data.id);
        localStorage.setItem("role",result.data.role);
        setMessage(result.message || "Login successful!");
        if (profile){
          navigate("/dashboard");
        }else{
          if(role==="student"){
            navigate("/dashboard/profile");
          }else{
            navigate("/dashboard");
          }
          
        }
      } else {
        const error = await response.json();
        setMessage(error.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[url('https://vcet.ac.in/vcetit/images/it_service/VCET.jpeg')] bg-cover">
      <div className="w-full max-w-md p-8 mx-auto space-y-6 bg-red-900 bg-rounded-lg">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full flex justify-center items-center gap-2 px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login {loading && <div className="loader"></div>} 
          </button>
        </form>
        <p className="text-center text-gray-950">Dont have an account? {" "}
          <Link to="/signin" className="text-white hover:underline">
             Create
          </Link>
        </p>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Login