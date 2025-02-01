import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidemenu = () => {
  const [profile, setProfile] = useState({});
  const [closemenu , setClosemenu]= useState(false);
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://hackathon-q8la.onrender.com/getprofile/${userId}`
        );
        if (response.ok) {
          const result = await response.json();
          setProfile(result.data);
        }
      } catch (error) {
        console.log("An error occured", error);
      }
    };
    fetchProfile();
  }, [userId]);

  return (
    <>
    <div className="md:hidden p-4 fixed m-4" onClick={()=> setClosemenu(!closemenu)}>
    <i className="fa-solid fa-bars fa-2xl"></i>      
    </div>
      <div className={`bg-[#0e2f44] w-[220px] h-screen p-5 ${!closemenu ? `hidden` : `flex flex-col` } md:flex md:flex-col md:items-center space-y-7 pt-[40px] fixed z-20`}>
        <div className="md:hidden" onClick={()=> setClosemenu(!closemenu)} >
        <i className="fa-solid fa-xmark fa-2xl"></i>
        </div>
      <div className="w-[110px] h-[110px] border-[1px] border-[#039ee3] rounded-full overflow-hidden">
        <img
          src={
            profile?.image? profile.image:
            "https://ik.imagekit.io/mino2112/css%20driving%20skl/woman.png?updatedAt=1725791888913"
          }
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>

      <hr className="w-full border-t-2 border-[#039ee3]" />

      <div className="w-full space-y-4 text-lg text-white">
        <h2 className="hover:bg-[#039ee3] hover:text-[#0e2f44] p-2 rounded-md cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </h2>
       
        <h2 className="hover:bg-[#039ee3] hover:text-[#0e2f44] p-2 rounded-md cursor-pointer">
          {role === "student" ? (
            <Link to="/dashboard/participation">Participation</Link>
          ) : (
            <Link to="/staff/post">Post</Link>
          )}
        </h2>
        <h2 className="hover:bg-[#039ee3] hover:text-[#0e2f44] p-2 rounded-md cursor-pointer">
          <Link to="/dashboard/notifications">Notifications</Link>
        </h2>
        {role ==="staff"&&
        <h2 className="hover:bg-[#039ee3] hover:text-[#0e2f44] p-2 rounded-md cursor-pointer">
          
          <Link to ="/staff/search">Student Search</Link>
          
        </h2>}
        {role === "student" &&
        <h2 className="hover:bg-[#039ee3] hover:text-[#0e2f44] p-2 rounded-md cursor-pointer">
          
            <Link to="/dashboard/profile">Profile</Link>
          
        </h2>}

        <hr className="border-t-2 border-[#039ee3]" />

        <h2 className="p-2 rounded-md cursor-pointer hover:bg-red-500 hover:text-white">
          <Link to="/">Logout</Link>
        </h2>
      </div>
    </div> 
    
    </>
  );
};

export default Sidemenu;
