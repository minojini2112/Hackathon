import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Worker, Viewer } from '@react-pdf-viewer/core';


const PostDetails = () => {
  const { id } = useParams();
  console.log("post id", id);
  const [postdata, setpostdata] = useState({});
  const [studentlist, setstudentlist] = useState([]);
  const [checked, setChecked] = useState(false);
  const [show, setShow] = useState(false);
  const [registered , setRegistered]= useState(false);
  const [days, setDays] = useState(null);
  const [PDFView, setPDFView] = useState(false);
 
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");
  const registration = {
    post_id: id,
    student_id: user_id,
  };
  const calculate=(startdate)=>{
    const today = new Date(); //current date
    const start = new Date(startdate);
    const timeDifference = start - today; //in milliseconds 
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); //milli sec to days
    console.log(days);
    setDays(days)
  }
  
  useEffect(() => {
    const fetchpost = async () => {
      try {
        const response = await fetch(
          `https://hackathon-8k3r.onrender.com/getindividualPost/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setpostdata(data.data);
          calculate(data.data.fromDate);
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchRegistered = async()=>{
      try {
        const response = await fetch(
          "https://hackathon-q8la.onrender.com/getStudentRegister",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registration),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if(data.message === "registered"){
            setRegistered(true);
          } else {
          setRegistered(false);
        }
      } }catch (error) {
        console.error("Error confirming registration:", error);
      }
    }
    fetchpost();
    if(role=="student"){
      fetchRegistered();
    }
  }, []);
  const PdfViewer = ({ pdfUrl }) => {
    return(
      <Worker workerUrl="https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js">
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    )
      };
    
    

  const fetchList = async (post_id) => {
    console.log("Button clicked");
    try {
      const response = await fetch(
        `https://hackathon-8k3r.onrender.com/getStudentlist/${post_id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setstudentlist(data.data)
      } else {
        throw new Error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch(
        "https://hackathon-8k3r.onrender.com/studentPost/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registration),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if(data.message === "registered"){
          alert("Already Registered ! ");
          navigate("/dashboard");
        } else {
        alert("Registration Confirmed! Please add Participation");
        navigate("/dashboard/participation");
      }
    } }catch (error) {
      console.error("Error confirming registration:", error);
    }
  };

  if (!postdata) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="flex min-h-screen p-10 bg-gray-100/50 w-[100%] flex-col md:flex-row">
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="flex flex-col justify-center items-center p-5 bg-slate-200/70 shadow-xl absolute backdrop-blur-2xl w-[90%] mx-auto my-auto rounded-xl">
            <div className="flex justify-between items-center w-[100%]">
              <h1 className="mb-5 text-xl font-medium text-center">
                Registered Students List
              </h1>
              <i
                className="fa-solid fa-xmark fa-xl hover:text-blue-600 hover:cursor-pointer"
                onClick={() => setShow(false)}
              ></i>
            </div>
            <div className="w-full mx-auto my-auto">

  <div className="hidden md:block">
    <table className="w-full text-center border border-collapse border-gray-300 rounded-lg shadow-lg">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 border border-gray-300">Name</th>
          <th className="px-4 py-2 border border-gray-300">Department</th>
          <th className="px-4 py-2 border border-gray-300">Year</th>
          <th className="px-4 py-2 border border-gray-300">Section</th>
          <th className="px-4 py-2 border border-gray-300">Register Number</th>
          <th className="px-4 py-2 border border-gray-300">Roll Number</th>
          <th className="px-4 py-2 border border-gray-300">Batch</th>
          <th className="px-4 py-2 border border-gray-300">Placement Incharge</th>
          <th className="px-4 py-2 border border-gray-300">Class Incharge</th>
          <th className="px-4 py-2 border border-gray-300">Placement Head</th>
        </tr>
      </thead>
      <tbody>
        {studentlist.map((student) => (
          student && (
            <tr
              key={student.user_id}
              className="bg-white hover:bg-gray-200 hover:cursor-pointer"
              onClick={() => navigate(`/staff/studentParticipation/${student.user_id}`)}
            >
              <td className="px-4 py-2 border border-gray-300">{student.name}</td>
              <td className="px-4 py-2 border border-gray-300">{student.department}</td>
              <td className="px-4 py-2 border border-gray-300">{student.year}</td>
              <td className="px-4 py-2 border border-gray-300">{student.section}</td>
              <td className="px-4 py-2 border border-gray-300">{student.register_number}</td>
              <td className="px-4 py-2 border border-gray-300">{student.roll_no}</td>
              <td className="px-4 py-2 border border-gray-300">{student.batch}</td>
              <td className="px-4 py-2 border border-gray-300">{student.staff_incharge}</td>
              <td className="px-4 py-2 border border-gray-300">{student.class_incharge}</td>
              <td className="px-4 py-2 border border-gray-300">{student.placement_head}</td>
            </tr>
          )
        ))}
      </tbody>
    </table>
  </div>

  <div className="block space-y-4 md:hidden">
    {studentlist.map((student, index) => (
      student && (
        <div
          key={index}
          onClick={() => navigate(`/staff/studentParticipation/${student.user_id}`)}
          className="p-4 bg-white border border-gray-300 rounded-lg shadow-md"
        >
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Register Number:</strong> {student.register_number}</p>
          <p><strong>Roll Number:</strong> {student.roll_no}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Year:</strong> {student.year}</p>
          <p><strong>Section:</strong> {student.section}</p>
          <p><strong>Staff In-Charge:</strong> {student.staff_incharge}</p>
          <p><strong>Placement In-Charge:</strong> {student.placement_head}</p>
        </div>
      )
    ))}
  </div>
</div>

            
          </div>
        </div>
      )}
      <img
        src={postdata.image}
        alt="Post"
        className="w-1/2 h-auto rounded-lg shadow-lg"
      />
      <div className="mt-6 md:ml-12 p-6 bg-white shadow-md rounded-lg">
  <h1 className="mb-6 text-2xl font-bold md:text-4xl text-gray-800">
    {postdata.description}
  </h1>
  
  <p className="mb-4 text-gray-700">
    <strong>From:</strong> {postdata.fromDate}
  </p>
  
  <p className="mb-4 text-gray-700">
    <strong>To:</strong> {postdata.toDate}
  </p>
  
  <p className="mb-4 text-gray-700">
    <strong>Registration Limit:</strong> {postdata.registrationLimit}
  </p>

  {role === "staff" ? (
    <p className="text-gray-700">
      <strong>Registered Number:</strong>{" "}
      <button
        onClick={() => {
          fetchList(postdata.id);
          setShow((prev) => !prev);
        }}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all"
      >
        {postdata.registeredNumber}
      </button>
    </p>
  ) : (
    <div className="flex items-center justify-start gap-4">
      {registered ? (
        <p className="p-2 px-4 mb-2 text-lg font-semibold text-white bg-green-500 rounded-xl">
          Registered
        </p>
      ) : days < 0 ? (
        <p className="p-2 px-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-xl">
          Expired
        </p>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Register</label>
            <input
              type="checkbox"
              onClick={() => {
                setChecked((prev) => !prev);
              }}
              className="w-5 h-5 accent-blue-600"
            />
          </div>

          <button
            className="px-5 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            onClick={() => {
              if (checked) {
                handleRegistration();
              } else {
                alert("Please select the checkbox");
              }
            }}
          >
            Confirm Registration
          </button>
        </>
      )}
    </div>
  )}

  <p className="mb-4 text-gray-700">
    <strong>Document:</strong>{" "}
    <a
      href={`https://docs.google.com/gview?url=${encodeURIComponent(postdata.pdf)}&embedded=true`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 font-semibold hover:underline"
    >
      View PDF
    </a>
  </p>

  <p className="mb-4 text-gray-700">
    <strong>Link:</strong>{" "}
    <a
      href={postdata.link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 font-semibold hover:underline"
    >
      {postdata.link}
    </a>
  </p>

  <button
    onClick={() => navigate(-1)}
    className="px-5 py-2 mt-6 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
  >
    Back to Dashboard
  </button>
</div>
    </div>
  );
};

export default PostDetails;
