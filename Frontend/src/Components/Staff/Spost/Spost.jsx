import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Spost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    staff_id: localStorage.getItem("user_id"),
    description: "",
    link: "",
    fromDate: "",
    toDate: "",
    registrationLimit: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {

    e.preventDefault();
    const input = new FormData();
  
    for (const key in formData) {
      if (key === 'image' || key === 'pdf') {
        input.append(key, formData[key]);
      } else {
        input.append(key, formData[key]);
      }
    }  
  
    try {
      const response = await fetch(`https://hackathon-q8la.onrender.com/addPost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(input),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("post details",data.data);
        alert('Post added successfully!');
        navigate("/dashboard");
      } else {
        const errorMessage = await response.text();
        console.error(`Server Error: ${errorMessage}`);
        alert(`Failed to add profile details: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Fetch error:', error); 
    }finally{
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center md:ml-[250px] justify-center bg-[#cceef9]">
      <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9] rounded-lg shadow-md md:w-[1000px]">
        <h2 className="mt-8 mb-6 text-2xl font-bold text-gray-800 md:mt-2">Add New Post</h2>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter description"
            required
          />
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              multiple
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload Document</label>
            <input
              type="file"
              name="pdf"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Link Input */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Link</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter URL"
          />
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">From Date</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">To Date</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Registration Limit */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Registration Limit</label>
          <input
            type="number"
            name="registrationLimit"
            value={formData.registrationLimit}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter registration limit"
            required
          />
        </div>

        

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-[#039ee3] rounded-md shadow-md hover:bg-[#0288d1]"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
};

Spost.propTypes = {
  userId: PropTypes.string,
};

export default Spost;
