import React, { useState } from "react";
import PropTypes from "prop-types";

const Spost = () => {
  const [formData, setFormData] = useState({
    description: "",
    image: null,
    document: null,
    link: "",
    fromDate: "",
    toDate: "",
    registrationLimit: "",
    registeredNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add logic to handle post submission
  };

  return (
    <div className="flex items-center ml-[250px] justify-center bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9]">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-[1000px]">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Add New Post</h2>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">Description</label>
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
            <label className="block mb-2 text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Upload Document</label>
            <input
              type="file"
              name="document"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Link Input */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">Link</label>
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
            <label className="block mb-2 text-gray-700 font-medium">From Date</label>
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
            <label className="block mb-2 text-gray-700 font-medium">To Date</label>
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
          <label className="block mb-2 text-gray-700 font-medium">Registration Limit</label>
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

        {/* Registered Number */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">Registered Number</label>
          <input
            type="number"
            name="registeredNumber"
            value={formData.registeredNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter number of registered students"
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

// PropTypes validation
Spost.propTypes = {
  userId: PropTypes.string,
};

export default Spost;
