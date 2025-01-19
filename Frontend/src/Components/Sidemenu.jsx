import { Link } from "react-router-dom";

const Sidemenu = () => {
  return (
    <div className='bg-[#0e2f44] w-[220px] h-screen p-5 flex flex-col items-center space-y-7 pt-[40px] fixed'>
     
      <div className='w-[110px] h-[110px] border-[1px] border-[#039ee3] rounded-full overflow-hidden'>
        <img 
          src='https://ik.imagekit.io/mino2112/css%20driving%20skl/woman.png?updatedAt=1725791888913' 
          alt='Profile'
        />
      </div>

     
      <hr className='w-full border-t-2 border-[#039ee3]' />

      
      <div className='w-full space-y-4 text-lg text-white'>
        <h2 className='hover:bg-[#039ee3] hover:text-[#0e2f44] p-2 rounded-md cursor-pointer'><Link to="/dashboard">Dashboard</Link></h2>
        <h2 className='hover:bg-[#039ee3] hover:text-[#0e2f44] p-2 rounded-md cursor-pointer'><Link to="/dashboard/profile">Profile</Link></h2>
        <h2 className='hover:bg-[#039ee3] hover:text-[#0e2f44] p-2 rounded-md cursor-pointer'><Link to="/dashboard/participation">Participation</Link></h2>
        <h2 className='hover:bg-[#039ee3] hover:text-[#0e2f44] p-2 rounded-md cursor-pointer'><Link to="/dashboard/notifications">Notifications</Link></h2>
      
        <hr className='border-t-2 border-[#039ee3]' /> 
        
        <h2 className='p-2 rounded-md cursor-pointer hover:bg-red-500 hover:text-white'><Link to="/">Logout</Link></h2>
      </div>
    </div>
  );
};

export default Sidemenu;