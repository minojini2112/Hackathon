import React, { useEffect } from 'react'
import History from '../Participation/History'
import { useParams } from 'react-router-dom'
import { useState } from 'react';

const StaffParticipation = () => {
    const  {student_id} = useParams();
    const [history , setHistory] = useState([]);

    useEffect(()=>{
        const fetchParticipation= async()=>{
          try{
            const response = await fetch(`https://hackathon-y591.onrender.com/getParticipation/${student_id}`);
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
        fetchParticipation();
    },[student_id]);

  return (
    <div className='ml-[250px] w-[100%]'>
      <h1 className='text-center text-2xl font-semibold mt-5'>Student Participation History</h1>
        <History history={history}/>
    </div>
  )
}

export default StaffParticipation