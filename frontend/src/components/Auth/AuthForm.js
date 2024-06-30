import React, { useState } from 'react'
import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link } from 'react-router-dom';

const labelStyle = { mt: 1, mb: 1 };

const AuthForm = ({onSubmit, isAdmin}) => {
    const [isSignup, setIsSignup]=useState(false);
    const [inputs, setInputs] =useState({
        name: "", password:"", email:""
    });
    const handlechange =(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        onSubmit({inputs, signup: isAdmin? false: isSignup});
    }
        return (
        <Dialog PaperProps={{style: {borderRadius: 20}}} open={true}>
            <Box sx={{ml: 'auto', padding:1 }}>
                <IconButton LinkComponent={Link} to="/">
                    <CloseRoundedIcon/>
                </IconButton>
            </Box>
            <Typography variant='h4' textAlign={"center"}>
            {isSignup?"SignUp": "Login" }
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box padding={6} display={"flex"} justifyContent={"center"} flexDirection="column" width={400} margin="auto" alignContent={"center"}>
            { !isAdmin && isSignup && <> <FormLabel sx={labelStyle}>Name</FormLabel>
                    <TextField value={inputs.name}
                    onChange={handlechange} margin='normal' variant='standard' type={"text"} name='name' /> </> 
            }
                    <FormLabel sx={labelStyle}>Email</FormLabel>
                   
        
                    <TextField value={inputs.email}
                    onChange={handlechange}  margin='normal' variant='standard' type={"email"} name='email' />
                    <FormLabel margin='normal' variant='standard' sx={labelStyle}>Password</FormLabel>
                    <TextField value={inputs.password}
                    onChange={handlechange}  type={"password"} name='password' />
                    <Button sx={{mt: 2, borderRadius: 10, bgcolor: "#2b2d42"}} type='submit' fullWidth variant='contain'> {isSignup?"SignUp": "Login" } </Button>

              {  !isAdmin &&     <Button onClick={()=> setIsSignup(!isSignup)} sx={{mt: 2, borderRadius: 10,}} fullWidth> Switch To {isSignup?"Login": "Signup" }</Button>
}
                </Box>
            </form>
        </Dialog>
    )
}

export default AuthForm