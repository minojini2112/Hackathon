/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts] = useState([
    {
      id: 1,
      description: "Workshop on AI and Machine Learning",
      image: "https://via.placeholder.com/300x200",
      document: "WorkshopDetails.pdf",
      link: "https://example.com/ai-workshop",
      fromDate: "2025-01-25",
      toDate: "2025-01-26",
      registrationLimit: "100",
      registeredNumber: "45",
    },
    {
      id: 2,
      description: "Web Development Bootcamp",
      image: "https://via.placeholder.com/300x200",
      document: "BootcampDetails.pdf",
      link: "https://example.com/web-bootcamp",
      fromDate: "2025-02-10",
      toDate: "2025-02-12",
      registrationLimit: "150",
      registeredNumber: "100",
    },
    {
      id: 3,
      description: "Cybersecurity Awareness Seminar",
      image: "https://via.placeholder.com/300x200",
      document: "SeminarDetails.pdf",
      link: "https://example.com/cybersecurity",
      fromDate: "2025-03-01",
      toDate: "2025-03-02",
      registrationLimit: "200",
      registeredNumber: "150",
    },
    {
      id: 4,
      description: "Data Science Workshop",
      image: "https://via.placeholder.com/300x200",
      document: "DataScienceDetails.pdf",
      link: "https://example.com/data-science",
      fromDate: "2025-04-10",
      toDate: "2025-04-12",
      registrationLimit: "120",
      registeredNumber: "80",
    },
    {
      id: 5,
      description: "Cloud Computing Bootcamp",
      image: "https://via.placeholder.com/300x200",
      document: "CloudDetails.pdf",
      link: "https://example.com/cloud-bootcamp",
      fromDate: "2025-05-15",
      toDate: "2025-05-18",
      registrationLimit: "180",
      registeredNumber: "100",
    },
    {
      id: 6,
      description: "Python Programming Workshop",
      image: "https://via.placeholder.com/300x200",
      document: "PythonWorkshop.pdf",
      link: "https://example.com/python-workshop",
      fromDate: "2025-06-01",
      toDate: "2025-06-03",
      registrationLimit: "150",
      registeredNumber: "120",
    },
  ]);

  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="p-10 bg-gradient-to-br from-white via-[#eaf7fc] to-[#d1f0fa] min-h-screen">
      <h1 className="mb-8 text-4xl font-extrabold text-center text-gray-800">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ml-52">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105"
            onClick={() => handlePostClick(post.id)}
          >
            <img
              src={post.image}
              alt="Post Thumbnail"
              className="mb-4 rounded-lg w-full h-[200px] object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {post.description}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {post.fromDate} - {post.toDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts] = useState([
    {
      id: 1,
      description: "Workshop on AI and Machine Learning",
      image: "https://via.placeholder.com/300x200",
      document: "WorkshopDetails.pdf",
      link: "https://example.com/ai-workshop",
      fromDate: "2025-01-25",
      toDate: "2025-01-26",
      registrationLimit: "100",
      registeredNumber: "45",
    },
    {
      id: 2,
      description: "Web Development Bootcamp",
      image: "https://via.placeholder.com/300x200",
      document: "BootcampDetails.pdf",
      link: "https://example.com/web-bootcamp",
      fromDate: "2025-02-10",
      toDate: "2025-02-12",
      registrationLimit: "150",
      registeredNumber: "100",
    },
    {
      id: 3,
      description: "Cybersecurity Awareness Seminar",
      image: "https://via.placeholder.com/300x200",
      document: "SeminarDetails.pdf",
      link: "https://example.com/cybersecurity",
      fromDate: "2025-03-01",
      toDate: "2025-03-02",
      registrationLimit: "200",
      registeredNumber: "150",
    },
    {
      id: 4,
      description: "Data Science Workshop",
      image: "https://via.placeholder.com/300x200",
      document: "DataScienceDetails.pdf",
      link: "https://example.com/data-science",
      fromDate: "2025-04-10",
      toDate: "2025-04-12",
      registrationLimit: "120",
      registeredNumber: "80",
    },
    {
      id: 5,
      description: "Cloud Computing Bootcamp",
      image: "https://via.placeholder.com/300x200",
      document: "CloudDetails.pdf",
      link: "https://example.com/cloud-bootcamp",
      fromDate: "2025-05-15",
      toDate: "2025-05-18",
      registrationLimit: "180",
      registeredNumber: "100",
    },
    {
      id: 6,
      description: "Python Programming Workshop",
      image: "https://via.placeholder.com/300x200",
      document: "PythonWorkshop.pdf",
      link: "https://example.com/python-workshop",
      fromDate: "2025-06-01",
      toDate: "2025-06-03",
      registrationLimit: "150",
      registeredNumber: "120",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState(""); // State to store search input
  const navigate = useNavigate();

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      post.description.toLowerCase().includes(searchLower) ||
      post.fromDate.includes(searchLower) ||
      post.toDate.includes(searchLower)
    );
  });

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="p-10 bg-gradient-to-br from-white via-[#eaf7fc] to-[#d1f0fa] h-screen ml-[250px] w-[90%]">
      <h1 className="mb-8 text-4xl font-extrabold text-center text-gray-800">
        Dashboard
      </h1>

      {/* Search Bar */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by description or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Filtered Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:scale-105"
            onClick={() => handlePostClick(post.id)}
          >
            <img
              src={post.image}
              alt="Post Thumbnail"
              className="mb-4 rounded-lg w-full h-[200px] object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {post.description}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {post.fromDate} - {post.toDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;




