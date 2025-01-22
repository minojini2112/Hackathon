import React, { useEffect ,useState
  
} from "react";
import { useParams, useNavigate } from "react-router-dom";


const listpage=(props)=>{
  return(
    <div>
      <h1>studentlist</h1>
      {props.list.map((student) => {
        return(
          <div key={student.user_id}>
            <p>{student.name}</p>
            <p>{student.department}</p>
            <p>{student.year}</p>
            <p>{student.section}</p>
            <p>{student.register_number}</p>
            <p>{student.roll_no}</p>
            <p>{student.batch}</p>
            <p>{student.staff_incharge}</p>
            <p>{student.class_incharge}</p>
            <p>{student.placement_head}</p>
          </div>
        );
      }
        
      )}
    </div>
  );
  
}
const PostDetails = () => {

  const { id } = useParams();
  console.log("post id",id);
  const[postdata,setpostdata]=useState({});
  const[studentlist,setstudentlist]=useState([]);
  const navigate = useNavigate();
  const role=localStorage.getItem("role");

  useEffect(()=>{
    const fetchpost=async()=>{
      try{
        const response = await fetch(`http://localhost:3005/getindividualPost/${id}`);
        if(response.ok){
          const data = await response.json();
          console.log(data);
          setpostdata(data.data);
        }else{
          throw new Error("Failed to fetch posts");
        }
      }catch(error){
        console.error("Error fetching posts:", error);
      }
    }
    fetchpost();
  },[]);
  //const post = posts.find((p) => p.id === parseInt(id));

  const fetchList=async(post_id)=>{
    try{
      const response = await fetch(`http://localhost:3005/getStudentlist/${post_id}`);
      if(response.ok){
        const data = await response.json();
        console.log(data);
        setstudentlist(data.data);
      }else{
        throw new Error("Failed to fetch posts");
      }
    }catch(error){
      console.error("Error fetching posts:", error);
    }
  }

  if (!postdata) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="flex min-h-screen p-10 bg-gray-100">
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
        {role=="staff"?<p>
          <strong className="text-gray-700">Registered Number:</strong>{" "}
          <button 
           onClick={() => fetchList(postdata.id)} 
           className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
          {postdata.registeredNumber}
      </button>
      <listpage list={studentlist}/>
    </p>
        :<div>
          <label>Register</label>
          <input type="checkbox"/>
          </div>}
        
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
