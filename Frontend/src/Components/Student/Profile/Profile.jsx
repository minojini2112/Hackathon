import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EditProfile=({ userId, profileData, setProfileData, setIsEditing, isEditing })=>{
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    year: '',
    section: '',
    register_number: '',
    roll_no: '',
    batch: '',
    staff_incharge: '',
    class_incharge: '',
    placement_head: '',
    image:'',
    user_id: userId
  });
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData((prev) => ({
        ...prev,
        ...profileData,
      }));
    }
  }, [profileData]);  

  const handleChange = (e) => {
    const { name, value , files } = e.target;
    if (name === 'image' && files.length > 0) {
      setFormData({ ...formData, image: files[0] }); // Store file in state
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
    const validateForm = () => {
    if (!formData.name) return 'Name is required.';
    if (!formData.year) return 'Year is required.';
    if (!formData.department) return 'Department is required.';
    if (!formData.section) return 'Section is required.';
    if (!formData.register_number) return 'Register number is required.';
    if (!/^[0-9]{12}$/.test(formData.register_number)) return 'Register number must be 12 digits.';
    if (!formData.roll_no) return 'Roll number is required.';
    if (!formData.batch) return 'Batch is required.';
    if (!formData.image) return 'Please select a file to upload.';
    return null;
  };
  const uploadProfilePicture = async (file) => {
    const imageKitUrl = "https://upload.imagekit.io/api/v1/files/upload";
    const privateApiKey = "private_a23TYqkGKJR/3VlG/eB/eY7Xn0s="; 
    const folder = "profile"; 

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("folder", folder);
  
    try {
      const response = await fetch(imageKitUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(privateApiKey + ":")}`, 
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.url) {
        return data.url;
      } else {
        console.error("ImageKit Upload Failed:", data);
        return null;
      }
    } catch (error) {
      console.error("ImageKit Upload Error:", error);
      return null;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const errorMessage = validateForm();
    if (errorMessage) {
      alert(errorMessage);
      setLoading(false);
      return;
    }
  
    try {
      let profilePicUrl = formData.image;
      
      if (formData.image && formData.image instanceof File) {
        profilePicUrl = await uploadProfilePicture(formData.image);
        if (!profilePicUrl) {
          alert("Failed to upload profile picture.");
          setLoading(false);
          return;
        }
      }
        const updatedFormData = {
        ...formData,
        image: profilePicUrl, 
      };
  
      const response = await fetch(`https://hackathon-8k3r.onrender.com/profile/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });
  
      if (response.ok) {
        const data = await response.json();
        setProfileData(data.data);
        alert("Profile details added successfully!");
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        console.error(`Server Error: ${errorMessage}`);
        alert("Error updating profile.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error updating profile.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9] sm:p-6 md:ml-[250px] ">
      <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9] rounded-lg shadow-md w-[90%] sm:p-6 lg:p-8">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 sm:mt-8">
          {!isEditing ? 'Edit Profile Details' : 'Enter Profile Details'}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
          <div>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="" disabled>Select Year</option>
                <option value="I Year">I Year</option>
                <option value="II Year">II Year</option>
                <option value="III Year">III Year</option>
                <option value="IV Year">IV Year</option>
              </select>
            </div>

            <div className="mb-4">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="" disabled>Select Department</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="EEE">Electrical and Electronics Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="ECE">Electronics and Communication Engineering</option>
                <option value="CSE">Computer Science and Engineering</option>
                <option value="AI & DS">Artificial Intelligence </option>
                <option value="Cyber Security">Cyber Security</option>
              </select>
            </div>

            <div className="mb-4">
              <select
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              >
                <option value="" disabled>Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="register_number"
                placeholder="Register Number"
                value={formData.register_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <div className="mb-4">
              <input
                type="text"
                name="roll_no"
                placeholder="Roll Number"
                value={formData.roll_no}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <input
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
                placeholder='Enter batch'
              />
               
              
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="placement_head"
                placeholder="Placement Student Head"
                value={formData.placement_head}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="class_incharge"
                placeholder="Class Incharge"
                value={formData.class_incharge}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="staff_incharge"
                placeholder="Placement Staff Head"
                value={formData.staff_incharge}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
              <div className="mb-4">
              <input
                type="file"
                name="image"
                //value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>
        

        <div className="flex justify-end mt-6 sm:justify-end sm:mt-8">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-[#039ee3] rounded-md shadow-md hover:bg-[#0288d1] flex items-center justify-center gap-2"
          >
            Save Changes {loading && <div className="loader"></div>} 
          </button>
        </div>
      </form>
    </div>
  );
};

// PropTypes validation
EditProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  profileData: PropTypes.object.isRequired,
  setProfileData: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

const DisplayProfile = ({ profileData, setIsEditing }) => {
  if (!profileData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9]">
        <p className="text-xl text-gray-600">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9] lg:ml-[250px]">
      <div className="flex flex-col w-full max-w-screen-xl p-8 mx-auto md:flex-row">
        <div className="flex flex-col items-center justify-center p-8 md:w-1/3">
          <div className="w-[150px] h-[150px] border-4 border-black rounded-full overflow-hidden mb-4">
            <img
              src={profileData.image}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-800">{profileData.name}</h2>
          <h3 className="text-xl text-gray-700">{profileData.year}</h3>
          <h4 className="text-gray-800 text-md">{profileData.department}</h4>
        </div>

        {/*Academic Details */}
        <div className="flex flex-col justify-center p-8 md:w-[60%] w-[90%]">
          <div className="p-6 mb-6 text-gray-800 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 border-b-2 border-[#039ee3] pb-2">Academic Details</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Detail label="Section" value={profileData.section} />
              <Detail label="Register Number" value={profileData.register_number} />
              <Detail label="Roll Number" value={profileData.roll_no} />
              <Detail label="Batch" value={profileData.batch} />
            </div>
          </div>

          <div className="p-6 text-gray-800 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 border-b-2 border-[#039ee3] pb-2">Incharge</h3>
            <div className="grid grid-cols-1 gap-4">
              <Detail label="Placement Student Head" value={profileData.placement_head} />
              <Detail label="Class Incharge" value={profileData.class_incharge} />
              <Detail label="Placement Staff Head" value={profileData.staff_incharge} />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="fixed bottom-8 right-8 p-4 bg-[#039ee3] text-white rounded-full shadow-lg hover:bg-[#0288d1] cursor-pointer"
        title="Edit Profile"
      >
        edit
      </button>
    </div>
  );
};

DisplayProfile.propTypes = {
  profileData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    section: PropTypes.string,
    register_number: PropTypes.string,
    roll_no: PropTypes.string,
    batch: PropTypes.string,
    placement_head: PropTypes.string,
    class_incharge: PropTypes.string,
    staff_incharge: PropTypes.string,
    image : PropTypes.string,
  }),
  setIsEditing: PropTypes.func.isRequired,
};

// Reusable Component for Profile Details
const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-medium">{value || "N/A"}</p>
  </div>
);

Detail.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};



const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        setLoading(true); // Start loading
      
        const fetchProfile = async () => {
          try {
            const response = await fetch(`https://hackathon-8k3r.onrender.com/getprofile/${userId}`);
            if (!response.ok) {
              throw new Error('Error fetching profile data.');
            }
            const result = await response.json();
    
            if (result.data) {
              setProfileData(result.data); // Update state with existing profile data
              setIsEditing(false); // Render DisplayProfile component
            } else {
              setProfileData({}); // Set empty profile data for editing
              setIsEditing(true); // Render EditProfile component
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching profile data!');
          } finally {
            setLoading(false); // Stop loading
          }
        };
      
        fetchProfile();
      }, [userId]);

      if (loading) {
        return (
          <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#e6f5fc] to-[#cceef9]">
            <p className="text-xl text-gray-600">Loading profile data...</p>
          </div>
        );
      }
      
      return isEditing ? (
        <EditProfile
          userId={userId}
          profileData={profileData}
          setProfileData={setProfileData}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      ) : (
        <DisplayProfile profileData={profileData} setIsEditing={setIsEditing} />
      );
    
     
      
    }      
    
export default Profile;