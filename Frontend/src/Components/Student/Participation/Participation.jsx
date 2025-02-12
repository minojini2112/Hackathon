/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Submission from "./Submission";
import History from "./History";

const Participation = () => {
  const [add, setAdd] = useState(false);
  const [history , setHistory]= useState([]);
  const [data, setData] = useState({
    "user_id": localStorage.getItem("user_id"),
  });
  const [pdf , setPdf] =useState();
  const [image , setImage]=useState([]);
  const [loading, setLoading] = useState(false);
  const userId=localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  useEffect(() => {
    setLoading(true);
    const fetchParticipation = async () => {
      try {
        const data = await fetch(
          `https://hackathon-8k3r.onrender.com/getparticipation/${userId}`
        );
        const response = await data.json();
        setHistory(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        alert("An error occured!");
      } finally {
        setLoading(false);
      }
    };
    fetchParticipation();
  }, []);

  const handleInputChange = (e) => {
    setData({
        ...data, 
        [e.target.name]: e.target.value 
    });
}

const uploadToCloudinary = async (file, resourceType) => {
  const cloudName = "ds65kgmhq";
  const uploadPreset = "hackathon";
  
  const formDataUpload = new FormData();
  formDataUpload.append("file", file);
  formDataUpload.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formDataUpload,
    });

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

const handlePdfUpload = (e) => {
  setPdf(e.target.files[0]); // Store single PDF file
};

const handleImageUpload = (e) => {
  setImage([...e.target.files]); // Store multiple images as an array
};

const handleSubmit = async () => {
  let imageUrls = [];
  let pdfUrl = "";

  try {
    // Upload all images
    for (let i = 0; i < image.length; i++) {
      const url = await uploadToCloudinary(image[i], "raw"); // "raw" for images too
      if (url) imageUrls.push(url);
    }

    // Upload PDF
    if (pdf) {
      pdfUrl = await uploadToCloudinary(pdf, "raw"); // "raw" for PDFs
    }

    // Create formData
    const formData = {
      user_id: parseInt(data.user_id),
      competition_name: data.competition_name,
      college: data.college,
      date: data.date,
      certificates: imageUrls.join(","), // Store images as comma-separated string
      report: pdfUrl || " ", // Store PDF URL
    };

    // Send data to backend
    const requestData = await fetch("https://hackathon-8k3r.onrender.com/participation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const resData = await requestData.json();
    if (requestData.ok) {
      console.log(resData);
      alert("Participation Details Stored Successfully!");
      setAdd(false);
      window.location.reload();
    } else {
      console.log("Error storing participation details", resData);
      alert("Unable to store participation details");
      setAdd(false);
    }
  } catch (error) {
    console.log(error);
    alert("Unable to store participation details");
  }
};


  return (
    <div className="p-4 space-y-4 w-[100%] md:w-[80%] md:ml-[250px]">
      <div className="text-[#0e2f44] font-bold text-2xl text-center">
        Participation Details
      </div>
       <div className="flex items-center justify-center">
      <button
        onClick={() => {
          setAdd(true);
        }}
        className="bg-[#039ee3] font-semibold p-2 px-3 rounded-lg hover:bg-[#90c2e1] text-black w-[fit]"
      >
        Add Participation +
      </button>
    </div>
    <div className="w-[100%]">
      {add && (
        <Submission
          handleInputChange={handleInputChange}
          pdfUpload ={handlePdfUpload}
          imageUpload ={handleImageUpload}
          submit ={handleSubmit}
        />
      )}
    </div>
      <div>
        <p className="text-[#0e2f44] font-semibold text-xl text-center">
          Participation History
        </p>
        <div>
        <History history={history} loading={loading}/>
        </div>
      </div>
    </div>
  );
};

export default Participation;