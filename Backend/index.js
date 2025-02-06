const express = require("express")
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require("cors");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hackathons',
    resource_type: 'raw',
  },
});

const corsOptions = {
  origin: ['https://hackathon-1-j9qr.onrender.com', 'http://localhost:5173'],  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const app = express()
const prisma = new PrismaClient();
const upload = multer({ storage });

app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/signin", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const isuserexist = await prisma.user.findUnique({
      where: {

        email: email
      },
    })
    if (isuserexist) {
      return res.status(409).json({ message: "User already exists" })
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = await prisma.user.create({
      data: {
        email: email,
        password: hashedpassword,
        role: role
      },
    })
    return res.status(201).json({ message: "User created successfully", data: newuser })
  } catch (error) {
    return res.status(500).json({ message: error })
  }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!isUserExists) {
      return res
        .status(404)
        .json({ message: "user email not exists.Sign up" });
    }
    const passwordmatch = await bcrypt.compare(password, isUserExists.password);

    if (!passwordmatch) {
      return res.status(401).json({ message: "Invalid user password" });
    } else {
      return res.status(201).json({ message: "login successfull", data: isUserExists });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Create Profile Route
app.post("/profile/:user_id", upload.single('image'), async (req, res) => {
  const { user_id } = req.params;
  const data = req.body;

  try {
   const imageUrl = req.file?.path || data.image; // Use existing image if no new file
   const profileExists = await prisma.profile.findUnique({
    where:{
      user_id: parseInt(user_id),
    }
   })
   if (profileExists){
      const updateProfile =  await prisma.profile.update({
        where:{
          user_id: parseInt(user_id),
        },
        data:{
        name: data.name,
        department: data.department,
        year: data.year,
        section: data.section,
        register_number: data.register_number,
        roll_no: data.roll_no,
        staff_incharge: data.staff_incharge || null,
        class_incharge: data.class_incharge || null,
        placement_head: data.placement_head || null,
        batch: data.batch || null,
        image: imageUrl || null,
        },
      })
      return res.status(200).json({message:"Profile Updated Successfully",data:updateProfile});
   }else{
      const newProfile = await prisma.profile.create({
        data:{
          user_id: parseInt(user_id),
        name: data.name,
        department: data.department,
        year: data.year,
        section: data.section,
        register_number: data.register_number,
        roll_no: data.roll_no,
        staff_incharge: data.staff_incharge || null,
        class_incharge: data.class_incharge || null,
        placement_head: data.placement_head || null,
        batch: data.batch || null,
        image: imageUrl || null,
        },
      })
      return res.status(200).json({message:"Profile created successfully",data:newProfile})
   }
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
});

app.get("/getallProfile", async(req,res)=>{
  try{
  const  allProfile = await prisma.profile.findMany();
  return res.status(200).json({message:"All profiles fetched",data: allProfile});
  }catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get Profile Route
app.get("/getprofile/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const profileData = await prisma.profile.findUnique({
      where: {
        user_id: parseInt(user_id),
      },
    });

    if (!profileData) {
      return res.status(200).json({ message: "Profile not found"});
    }

    return res.status(200).json({ message: "Data retrieved successfully", data: profileData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/participation", upload.fields([{ name: 'image', maxCount: 5 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
  const data = req.body;
  
  try {
    if (!data.user_id || !data.competition_name || !data.college || !data.date) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    const imageUrls = req.files['image']
      ? req.files['image'].map(file => file.path).join(', ')
      : '';

    const pdfUrl = req.files['pdf'] && req.files['pdf'][0] ? req.files['pdf'][0].path : null;

    const profileData = await prisma.profile.findUnique({
      where:{
        user_id: parseInt(data.user_id),
        }
    })

    if (profileData){
      console.log(profileData)

      const participation = await prisma.participation.create({
        data: {
          user_id: parseInt(data.user_id),
          competition_name: data.competition_name,
          college: data.college,
          date: data.date,
          certificates: imageUrls,
          report: pdfUrl,
          year: profileData.year,
        },
      });

      const notificationData = await prisma.notifications.create({
        data: {
          content: `Participation details added by ${profileData.name}`,
        }
      });

      return res.status(201).json({ message: "Participation details successfully stored & notifications updated", data: participation });
    } else{
      return res.status(400).json({message:"Profile data not found"});
    }
    
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.get("/getparticipation/:user_id",async (req,res)=>{
  const {user_id} = req.params;
  console.log(user_id);

  try{
    const participationdata = await prisma.participation.findMany({
      where:{
        user_id : parseInt(user_id)
      }
    });
    return res.status(200).json({message:"Data retrieved successfully",data:participationdata});
  }catch(error){
    return res.status(500).json({message:error});
  }
  
});

app.post("/addPost",upload.fields([{ name: 'image', maxCount: 5 }, { name: 'pdf', maxCount: 1 }]),async (req,res)=>{
  const data = req.body;

  const imageUrls = req.files['image']
  ? req.files['image'].map(file => file.path).join(', ')
  : '';

const documentUrl = req.files['pdf'] && req.files['pdf'][0] ? req.files['pdf'][0].path : null;

  try{
    const postData = await prisma.post.create({
      data: {
        staff_id: parseInt(data.staff_id),
        description: data.description,
        link: data.link,
        fromDate: data.fromDate,
        toDate: data.toDate,
        registrationLimit: parseInt(data.registrationLimit),
        pdf: documentUrl,
        image: imageUrls,
        registeredNumber: parseInt(0),
      },
    }).catch(err => {
      console.error('Prisma error:', err);
      throw err;
    });

    const notificationData = await prisma.notifications.create({
      data: {
        content: `New post added - ${data.description}`,
      }
    })

    return res.status(200).json({message:"Post created successfully & notifications updated",data:postData});
  }catch(error){
    console.log("An error occured",error);
    return res.status(500).json({message:"An error occured",data:error});
  }
});

app.get("/getallPost", async(req,res)=>{
 try{
  const postData = await prisma.post.findMany();
  return res.status(200).json({message:"All post Details fetched",data: postData});
 }catch(error){
  console.log("An error occured",error);
  return res.status(500).json({message:"An error occured",data: error});
 }
});


app.get("/getindividualPost/:post_id", async(req,res)=>{
const {post_id} = req.params;
try{
  const postData = await prisma.post.findUnique({
    where:{
      id : parseInt(post_id),
    },
  });
  return res.status(200).json({message:"Post details fetched",data:postData});
}catch(error){
  console.log("An error occured",error);
  return res.status(500).json({message:"An error occured",data: error});
 }
});

app.post("/studentPost", async(req,res)=>{
   const data = req.body;
   try{
    const registeredNum = await prisma.post.findUnique({
      where:{
        id: parseInt(data.post_id),
      },
      select:{
        registeredNumber: true,
      },
    });
    const updateNum = await prisma.post.update({
      where:{
        id : parseInt(data.post_id),
      }, data:{
        registeredNumber:parseInt(registeredNum.registeredNumber + 1),
      },
    });
    const isStudentExist = await prisma.studentpost.findFirst({
      where: {
        student_id: parseInt(data.student_id),
        post_id: parseInt(data.post_id),
      },
    });
        
    if (isStudentExist){
      return res.status(200).json({message:"registered"});
    }else{
      const addStudentList = await prisma.studentpost.create({
        data:{
          post_id: parseInt(data.post_id),
          student_id : parseInt(data.student_id),
        },
      });
      return res.status(200).json({message:"All changes updated succeffully",data:{"registeredNumber":updateNum,"studentAdded": addStudentList}});
   
    }
      }catch(error){
    console.log("An error occured",error);
    return res.status(500).json({message:"An error occured",data:error});
   }
});

app.post("/getStudentRegister", async(req,res)=>{
   const data = req.body;
   try{
    const isStudentExist = await prisma.studentpost.findFirst({
      where: {
        student_id: parseInt(data.student_id),
        post_id: parseInt(data.post_id),
      },
    });
    if(isStudentExist){
      return res.status(200).json({message:"registered"});
    } else{
      return res.status(200).json({message:"not registered"});
    }
}catch(error){
  console.log("An error occured",error);
  return res.status(500).json({message:"An error occured",data:error});
 }}
);

app.get("/getStudentList/:post_id", async(req,res)=>{
    const {post_id}= req.params;
    try{
      const studentList = await prisma.studentpost.findMany({
        where:{
          post_id: parseInt(post_id),
        }, 
      });
      const finalList = await Promise.all(
        studentList.map(async (student) => {
          const studentData = await prisma.profile.findUnique({
            where: {
              user_id: parseInt(student.student_id),
            },
          });
          return studentData; 
        })
      );
      return res.status(200).json({message:"List details fetched",data: finalList});
    }catch(error){
    console.log("An error occured",error);
    return res.status(500).json({message:"An error occured",data:error});
   }
});

app.get("/getNotifications", async(req,res)=>{
   try{
    const notificationData = await prisma.notifications.findMany();
    return res.status(200).json({message:"Notifications fetched", data : notificationData});
  }catch(error){
    console.log("An error occured",error);
    return res.status(500).json({message:"An error occured",data:error});
   }
});

app.listen(3027, () => {
  console.log("Server is running on port 3027");
});
