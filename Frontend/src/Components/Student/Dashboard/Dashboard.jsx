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
        const response = await fetch("https://hackathon-q8la.onrender.com/getallPost");
        if (response.ok) {
          const data = await response.json();
        setPosts(data.data);
        console.log(data.data);
        }else{
          console.log("error",response.data);
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
        {filteredPosts.map((post) => {
 const today = new Date(); //current date
 const start = new Date(post.fromDate);
 const timeDifference = start - today; //in milliseconds 
 const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); //milli sec to days
 console.log(days);
       return(
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
            <p className="p-1 px-4 mt-2 text-sm text-white bg-blue-500 rounded-xl w-fit">
            { 
            days<0?"Expired": `${days} days left `
            }
            </p>
          </div>
          );
        
})}
      </div>
    </div>
  );
};

export default Dashboard;



