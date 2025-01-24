import React, { useEffect } from 'react'
import History from '../Participation/History'
import { useParams } from 'react-router-dom'
import { useState } from 'react';

const StaffParticipation = () => {
    const  {student_id} = useParams();
    const [history , setHistory] = useState([]);
    const[profile , setProfile]= useState({});

    useEffect(()=>{
        const fetchParticipation= async()=>{
          try{
            const response = await fetch(`https://hackathon-q8la.onrender.com/getParticipation/${student_id}`);
            const data = await response.json();
            if (response.ok){
                setHistory(data.data);
                console.log("participation data", data.data);
            }
          }catch(error){
            console.log("Error:",error);
            alert("Error fetching student participation");
          }
        }
        const fetchProfile=async()=>{
          try{
            const response = await fetch(`https://hackathon-q8la.onrender.com/getProfile/${student_id}`);
            const data = await response.json();
            if (response.ok){
                setProfile(data.data);
                console.log("Profile data", data.data);
            }
          }catch(error){
            console.log("Error:",error);
            alert("Error fetching student profile");
          }
        }
        fetchParticipation();
        fetchProfile();
    },[student_id]);

  return (
    <div className='ml-[250px] w-[100%] flex flex-col justify-center items-center '>
      <div className='p-4 '>
      <h1 className='text-center text-2xl font-semibold mt-5'>Student Details</h1>
      <div className="flex items-center justify-center gap-10 w-[70%] mx-auto bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9] p-2 mt-3 rounded-xl">
          <div className="w-[15%] h-[15%] border-4 border-black rounded-full overflow-hidden ">
            <img
              src={profile.image}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-800">{profile.name} - {profile.register_number}</h2>
          <h5 className="text-lg text-gray-800">{profile.year}</h5>
          <h5 className="text-gray-800 text-lg">{profile.department}</h5>
          <h5 className="text-gray-800 text-lg">{profile.section}</h5>
          <h5 className="text-gray-800 text-lg">{profile.roll_no}</h5>
          </div>
          
        </div>

      </div>
      <hr/>
      <div className='w-[100%]'>
      <h1 className='text-center text-2xl font-semibold mt-5'>Student Participation History</h1>
      <History history={history}/>
      </div>
     
    </div>
  )
}

export default StaffParticipation