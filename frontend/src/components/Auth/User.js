import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { userActions } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const User = () => {
  const navigate =useNavigate();
  const dispatch= useDispatch();
  const onResReceived =(data)=>{
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id);
      navigate("/");
  }
  const getData =(data)=>{
      console.log("auth", data);
      
      sendUserAuthRequest(data.inputs,data.signup).then(onResReceived).catch((err)=> console.log(err));
      
  };
  return (

    <AuthForm onSubmit={getData} isAdmin={false}></AuthForm>
  )
}

export default User