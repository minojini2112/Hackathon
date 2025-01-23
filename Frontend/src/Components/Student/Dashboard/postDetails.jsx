import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  console.log("post id", id);
  const [postdata, setpostdata] = useState({});
  const [studentlist, setstudentlist] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchpost = async () => {
      try {
        const response = await fetch(
          `https://hackathon-y591.onrender.com/getindividualPost/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setpostdata(data.data);
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchpost();
  }, []);
  //const post = posts.find((p) => p.id === parseInt(id));

  const fetchList = async (post_id) => {
    try {
      const response = await fetch(
        `https://hackathon-y591.onrender.com/getStudentlist/${post_id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setstudentlist(data.data);
      } else {
        throw new Error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  if (!postdata) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="flex min-h-screen p-10 bg-gray-100/50 w-[100%]">
  {show && (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center p-5 bg-slate-200/70 shadow-xl absolute backdrop-blur-2xl w-[90%] mx-auto my-auto rounded-xl">
      <div className="flex justify-between items-center w-[100%]">
      <h1 className="text-center font-medium text-xl mb-5">Registered Students List</h1>
      <i className="fa-solid fa-xmark fa-xl hover:text-blue-600 hover:cursor-pointer" onClick={()=> setShow(false)}></i>
      </div>
        
      <table className="w-full text-center my-auto mx-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
  <thead className="bg-gray-200">
    <tr>
      <th className="border border-gray-300 px-4 py-2 ">Name</th>
      <th className="border border-gray-300 px-4 py-2 ">Department</th>
      <th className="border border-gray-300 px-4 py-2 ">Year</th>
      <th className="border border-gray-300 px-4 py-2 ">Section</th>
      <th className="border border-gray-300 px-4 py-2 ">Register Number</th>
      <th className="border border-gray-300 px-4 py-2 ">Roll Number</th>
      <th className="border border-gray-300 px-4 py-2 ">Batch</th>
      <th className="border border-gray-300 px-4 py-2 ">Placement Incharge</th>
      <th className="border border-gray-300 px-4 py-2 ">Class Incharge</th>
      <th className="border border-gray-300 px-4 py-2 ">Placement Head</th>
    </tr>
  </thead>
  <tbody>
    {studentlist.map((student, index) => (
      <tr
        key={student.user_id}
        className="bg-white
        hover:bg-gray-200 hover:cursor-pointer" onClick={()=>navigate(`/staff/studentParticipation/${student.user_id}`)}
      >
        <td className="border border-gray-300 px-4 py-2">{student.name}</td>
        <td className="border border-gray-300 px-4 py-2">{student.department}</td>
        <td className="border border-gray-300 px-4 py-2">{student.year}</td>
        <td className="border border-gray-300 px-4 py-2">{student.section}</td>
        <td className="border border-gray-300 px-4 py-2">{student.register_number}</td>
        <td className="border border-gray-300 px-4 py-2">{student.roll_no}</td>
        <td className="border border-gray-300 px-4 py-2">{student.batch}</td>
        <td className="border border-gray-300 px-4 py-2">{student.staff_incharge}</td>
        <td className="border border-gray-300 px-4 py-2">{student.class_incharge}</td>
        <td className="border border-gray-300 px-4 py-2">{student.placement_head}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  )}
  <img
        src={postdata.image}
        alt="Post"
        className="w-1/2 h-auto rounded-lg shadow-lg"
      />
      <div className="ml-10">
        <h1 className="mb-6 text-3xl font-bold">{postdata.description}</h1>
        <p className="mb-4">
          <strong>From:</strong> {postdata.fromDate}
        </p>
        <p className="mb-4">
          <strong>To:</strong> {postdata.toDate}
        </p>
        <p className="mb-4">
          <strong>Registration Limit:</strong> {postdata.registrationLimit}
        </p>
        {role == "staff" ? (
          <p>
            <strong className="text-gray-700">Registered Number:</strong>{" "}
            <button
              onClick={() => {
                fetchList(postdata.id);
                setShow((prev) => !prev);
              }}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {postdata.registeredNumber}
            </button>
          </p>
        ) : (
          <div>
            <label>Register</label>
            <input type="checkbox" />
          </div>
        )}

        <p className="mb-4">
          <strong>Document:</strong>{" "}
          <a
            href={`/${postdata.document}`}
            download
            className="text-blue-600 underline"
          >
            {postdata.document}
          </a>
        </p>
        <p className="mb-4">
          <strong>Link:</strong>{" "}
          <a
            href={postdata.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {postdata.link}
          </a>
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 mt-6 text-white bg-blue-600 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
