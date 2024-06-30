import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getAllMovies = async ()=>{
    const res= await axios.get("http://localhost:5000/movie").catch((err)=>{
        console.log(err);
    });

     if(res.status!==200)
        return console.log("No data");

     const data = res.data;
//    console.log("Testing the data", data);
     return data;

}

export const sendUserAuthRequest =async(data,signup)=>{
    const res= await axios.post(`http://localhost:5000/user/${signup?"signup":"login"}`,{
        name: signup? data.name: "",
        email: data.email,
        password: data.password,
    }).catch((err)=>{ console.log(err);
        toast.error("Invalid Credentials!!")
});
    if(res.status !==200 && res.status!==201)
        {
            console.log("Unexpected Error occured");
            toast.error("Invalid Credentials!!")
        }
        const resData = await res.data;
        toast.success("User Logged In!")
        return resData;
}
  

export const sendAdminAuthRequest= async(data)=>{
    const res =await axios.post("http://localhost:5000/admin/login",{
        email: data.email,
        password: data.password,
    }).catch((err)=>{
        toast.error("Invalid Credentials!!");
        return console.log(err);
        
    })
    if(res.status!==200)
        {
            toast.error("Invalid Credentials!!");
            return console.log("unexpected error");
            
        }
    const resData= await res.data;
    toast.success("Admin Logged In!")
    return resData;
}

export const getMovieDetails =async(id)=>{
   const res= await axios.get(`http://localhost:5000/movie/${id}`).catch((err)=> console.log(err));
   if(res.status!==200)
    {
        return console.log("Unexpected Error");
    }
    const resData = await res.data;
    return resData;
}

export const newBooking= async(data)=>{
    const res =await axios.post("http://localhost:5000/booking/",{
        movie: data.movie,
        seatNumber: data.seatNumber,
        date: data.date,
        user: localStorage.getItem("userId")
    }).catch((err)=> console.log(err));

    if(res.status!==201)
        {
            return console.log("Unexpected Error");
        }
        const resData =await res.data;
        
        return resData;
}

export const getUserBooking = async()=>{
    const id=localStorage.getItem("userId");
    const res= await axios.get(`http://localhost:5000/user/bookings/${id}`).catch((err)=> console.log(err));

    if(res.status!==200)
        {
            return console.log("Unexpected Error");
        }
        const resData = await res.data;
        return resData;
}

export const deleteBooking= async(id)=>{
    const res =await axios.delete(`http://localhost:5000/booking/${id}`).catch((err)=> console.log(err));

    if(res.status!==200)
        {
            return console.log("Unexpected Error");
        }

        const resData = await res.data;
        return resData;
}

export const getUserDetails = async()=>{
    const id= localStorage.getItem("userId");
    const res= await axios.get(`http://localhost:5000/user/${id}`).catch((err)=> console.log(err));
    if(res.status!==200)
        {
            return console.log("Unexpected Error");
        }

        const resData = await res.data;
        return resData;
}

export const addMovie =async (data)=>{
  const res= await  axios.post("http://localhost:5000/movie", {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        featured: data.featured,
        actors: data.actors,
        admin: localStorage.getItem("adminId")
    }, {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).catch((Err)=> console.log(Err));

    if(res.status!==201)
        {
            return console.log("Unexpected Error Occured");
        }
        const resData= await res.data;
        console.log("From api helpers",resData);
        return resData;
}

export const getAdminById =async ()=>{
const adminId= localStorage.getItem("adminId");
const res =await axios.get(`http://localhost:5000/admin/${adminId}`).catch((err)=>console.log(err));

if(res.status!==200)
    {
        return console.log("Unexpected error Occured");
    }

    const resData = await res.data;
    return resData;
}