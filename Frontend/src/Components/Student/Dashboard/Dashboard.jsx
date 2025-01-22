import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);  // State to store posts fetched from API
  const [searchTerm, setSearchTerm] = useState("");  // State for search input
  const navigate = useNavigate();
  

  // Fetch posts from the backend using useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3005/getallPost");
        const data = await response.json();
        if (response.ok) {
        setPosts(data.data);
        console.log(data.data);
        }else{
          console.log("error",data.data);
        }
        
  // Set the fetched posts to state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  // Filter posts based on the search term
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
    <div className="p-10 bg-gradient-to-br from-white via-[#eaf7fc] to-[#d1f0fa] min-h-screen ml-[250px] w-[90%]">
      <h1 className="bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9]">
        Dashboard
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by description or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
        />
      </div>

      {/* Filtered Posts */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 transition-shadow transform bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105"
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





