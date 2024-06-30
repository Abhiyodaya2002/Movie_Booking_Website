import { Button, Card, CardActions, CardContent,  Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MovieItem = ({title, id, releaseDate, posterUrl}) => {
  const isUserLoggedIn = useSelector( (state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const handleClick= (e)=>{
    if(!isUserLoggedIn)
      {
        toast.error("User Must Login to Book the Movie")
      }
      else
      {
        navigate(`/booking/${id}`);
      }
  }
  return (
    <Card sx={{ margin: 3.3, width: 250, height: 380 , borderRadius: 5, ":hover":{
        boxShadow: "10px 10px 20px #ccc"
    } }}>
      <img height={'60%'} width= "100%" src={posterUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom fontSize={18}  component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} sx={{ margin: "auto", bgcolor: "#2b2d42", ":hover": {
        bgcolor: "#121217"
     } }} size="small" variant='contained' fullWidth>Book</Button>
      </CardActions>
    </Card> 
  )
}

export default MovieItem