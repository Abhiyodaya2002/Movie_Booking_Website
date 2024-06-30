import { Box, Button, Checkbox, FormLabel , TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addMovie } from '../../api-helpers/api-helpers';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const labelProps={
    mt: 1,
    mb: 1
};
const AddMovie = () => {
    const [inputs, setInputs] = useState({
        title:"",
        description:"",
        posterUrl:"",
        releaseDate:"",
        featured: false,
    });
const [actors, setActors] =useState([]);
const [actor, setActor]= useState("");
    const handleChange =(e)=>{
        setInputs((prevState) =>(
            {
       ...prevState,
       [e.target.name] : e.target.value        
            }
        ))
    }

    const handleSubmit=(e)=>{
       e.preventDefault();
       console.log(inputs,actors);
       toast.success("New Movie Added Successfully!")
       addMovie({...inputs, actors}).then((res)=> {
         console.log(res);
         setInputs({
            title: "",
            description: "",
            posterUrl: "",
            releaseDate: "",
            featured: false,
        });
        setActors([]);
        setActor("");
      }).catch((err)=> console.log(err));
    }
  return (
    <div>
       <form onSubmit={handleSubmit}>
        <Box width={"50%"} padding={10} margin="auto" display={"flex"} flexDirection="column" boxShadow={"10px 10px 20px #ccc"}>
     <Typography textAlign={"center"} variant='h5' fontFamily={"verdana"}>
        Add New Movie
     </Typography>
     <FormLabel sx={labelProps} >Title</FormLabel >
     <TextField name='title' value={inputs.title} onChange={handleChange} variant='standard' margin='normal'/>

     <FormLabel sx={labelProps}  >Description</FormLabel >
     <TextField name='description' value={inputs.description} onChange={handleChange} variant='standard' margin='normal'/>

     <FormLabel sx={labelProps} >Poster URL</FormLabel >
     <TextField name='posterUrl' value={inputs.posterUrl} onChange={handleChange} variant='standard' margin='normal'/>

     <FormLabel sx={labelProps} >Release Date</FormLabel >
     <TextField type={'date'} name='releaseDate' value={inputs.releaseDate} onChange={handleChange}variant='standard' margin='normal'/>
     
     <FormLabel sx={labelProps} >Actor</FormLabel >
     <Box display={"flex"}>
     <TextField name='actor' value={actor} variant='standard' margin='normal' onChange={(e)=>setActor(e.target.value)}/>
     <Button onClick={()=> {setActors([...actors, actor])
        setActor("");
     }}>Add</Button>
     </Box>
     <FormLabel sx={labelProps} >Featured</FormLabel >
     <Checkbox name='featured' checked={inputs.featured} onClick={(e)=> setInputs((prevState)=> ({ ...prevState, featured:e.target.checked} ))} sx={{mr:"auto"}}/>
     <Button type='submit' variant='contained' sx={{width: "30%", bgcolor: "#2b2d42", margin: "auto", ":hover": {
        bgcolor: "#121217"
     }}}>Add New Movie</Button>
        </Box>
       </form>
    </div>
  )
}

export default AddMovie