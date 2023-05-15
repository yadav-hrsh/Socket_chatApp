import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
const Login = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate('/chat');
    }
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      console.log("nikla")
      const data = await axios.post(loginRoute, {
        password, username
      });
      console.log(data.data, "line no 40 login.jsx")
      if (data.data.status === false) {
        toast.error(data.data.msg, toastOptions);
      }

      if (data.data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.data.user)
        );
        console.log(data.data.cisAvatarImageSet,"line 48")
        // console.log(data.data)
        if(data.data.user.isAvatarImageSet){
          navigate('/chat')
        }else{
          navigate("/setAvatar");}
      }
    }

  }

  const handleValidation = () => {
    const { password, username } = values;
    if (username.length === 0) {
      toast.error(
        "Username is required.",
        toastOptions
      );
      return false;
    }
    else if (password === "") {
      toast.error(
        "Password required.",
        toastOptions
      );
      return false;
    }
    return true;

  }
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <FormContainer className='flex justify-center items-center bg-[#131324] h-[100vh]'>
        <form onSubmit={(event) => { handleSubmit(event) }} className='flex flex-col space-y-5 bg-[#00000076] rounded-md px-[5rem] py-[1rem] overflow-hidden'>
          <div className='brand flex space-x-5 items-center'>
            <img src={Logo} alt="" className='h-[45px]' />
            <h1 className='text-white font-extrabold text-3xl'>Snappy</h1>
          </div>
          <input className='input_btn' type="text" name="username" placeholder='Username' onChange={(e) => handleChange(e)} />
          <input className='input_btn' type="password" name="password" placeholder='Password' onChange={(e) => handleChange(e)} />
          <button className='bg-[#997af0] text-white py-[1rem] px-[2rem] hover:bg-[#4e0eff] duration-700 rounded-lg font-extrabold' type='submit'>Login</button>
          <span className='text-white'>Don't have registered User ? <Link className='bg-transparent text-[#4e0eff] ' to={'/register'}>Register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </div>
  )
}
const FormContainer = styled.div`

`;



export default Login