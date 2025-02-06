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

const handlePdfUpload = (e)=>{ //to upload a single pdf
  setPdf(e.target.files[0]);
}

const handleImageUpload=(e)=>{ //to upload multiple images
  setImage(e.target.files);
}

const handleSubmit = async()=>{
  const formData = new FormData();

  for (const key in data) {  
    formData.append(key, data[key]);
  }  ; 
  if (pdf) {    //upload pdf into formdata
    formData.append("pdf", pdf);
  };
  for (let i = 0; i < image.length; i++) {   
    formData.append("image", image[i]); 
  }
  try{
    const requestData = await fetch("https://hackathon-8k3r.onrender.com/participation",{
      method:"POST",
      body: formData,
    })
    const resData = await requestData.json();
    if (requestData.ok){
      console.log(resData);
      alert("Particiption Details stored Successfully !");
      setAdd(false);
      window.location.reload();
     }else{
     console.log("Error storing participation details", resData);
     alert("Unable to store participation details");
     setAdd(false);
     }
}catch(error){
  console.log(error);
  alert("Unable to store participation details");
}
}


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