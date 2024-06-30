import React, { Fragment, useEffect, useState } from 'react'
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers';
import { useParams } from 'react-router-dom';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {loadStripe} from "@stripe/stripe-js"
const stripePromise = loadStripe('pk_test_51M3ZeNSEjgF9wMD711wFoJMzWMb7VlGufipYgTxVyKiQdBuoK4slum0FLFNHLP3oGshqXxIkj2XgFX22bW62h5wc00EaFkURv4');

const Booking = () => {
const [movie, setMovie]=useState();
const [inputs, setInputs]= useState({seatNumber:"", date: ""});
const id=useParams().id;
console.log(id);
    useEffect(()=>{
        getMovieDetails(id).then((res)=> setMovie(res.movie)).catch((err)=> console.log(err));
    },[id]);

const handleChange =(e)=>{
   setInputs((prevState)=> (
    {
      ...prevState, [e.target.name]: e.target.value,
    }
   ));
}

const handleSubmit= async(e)=>{
  e.preventDefault();
  console.log(inputs);
  
  newBooking({
    ...inputs, movie: movie._id
  }).then((res)=> console.log(res)).catch((err)=>console.log(err));

  try {
    const response = await fetch('http://localhost:5000/payment/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: movie._id, ...inputs }),
    });

    const session = await response.json();
    const stripe = await stripePromise;

    await stripe.redirectToCheckout({ sessionId: session.id });
    toast.success("Booking Successfull!")
  } catch (error) {
    console.error('Error:', error);
    toast.error('Payment failed!');
  }
}
  return (
    <div>
      {
        movie && (
          <Fragment>
            <Typography padding={3} fontFamily="fantasy" variant='h4' textAlign={"center"}>
           Book Tickets of Movie: {movie.title}
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              <Box display={"flex"} justifyContent={"column"} flexDirection="column" paddingTop={3} width="50%" marginRight={"auto"}>
                  <img width="80%" height={"70%"} src={movie.posterUrl} alt={movie.title}>
                  </img>
                  <Box width={"80%"} marginTop={3} padding={2}>
                    <Typography paddingTop={2}>{movie.description}</Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>
                      Starrer:
                      {movie.actors.map((actor)=>  " "+actor+", ")}

                    </Typography>
                    <Typography fontWeight={"bold"}marginTop={1}>
                    Release Date: {new Date(movie.releaseDate).toDateString()}
                    </Typography>
                  </Box>
              </Box>
<Box width={"50%"} paddingTop={3}>
<form onSubmit={handleSubmit}>
  <Box padding={5} margin={"auto"} display="flex" flexDirection={"column"}>
<FormLabel>Seat Number</FormLabel>
<TextField value={inputs.seatNumber}  onChange={handleChange} name="seatNumber" type={"String"} margin="normal" variant="standard"></TextField>

<FormLabel>Booking Date</FormLabel>
<TextField value={inputs.date}  onChange={handleChange} name='date' type={"date"} margin='normal' variant='standard'></TextField>
<Button type="submit" sx={{mt: 3}}>Book Now</Button>
  </Box>
</form>
</Box>
            </Box>
          </Fragment>
        )
      }
    </div>
  )
}

export default Booking