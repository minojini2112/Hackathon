import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const posts = [
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
];

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen flex">
      <img
        src={post.image}
        alt="Post"
        className="w-1/2 h-auto rounded-lg shadow-lg"
      />
      <div className="ml-10">
        <h1 className="text-3xl font-bold mb-6">{post.description}</h1>
        <p className="mb-4">
          <strong>From:</strong> {post.fromDate}
        </p>
        <p className="mb-4">
          <strong>To:</strong> {post.toDate}
        </p>
        <p className="mb-4">
          <strong>Registration Limit:</strong> {post.registrationLimit}
        </p>
        <p>
        <strong className="text-gray-700">Registered Number:</strong>{" "}
        <button 
         onClick={() => handleClick()} 
         className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
        {post.registeredNumber}
    </button>
  </p>
        <p className="mb-4">
          <strong>Document:</strong>{" "}
          <a
            href={`/${post.document}`}
            download
            className="text-blue-600 underline"
          >
            {post.document}
          </a>
        </p>
        <p className="mb-4">
          <strong>Link:</strong>{" "}
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {post.link}
          </a>
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
