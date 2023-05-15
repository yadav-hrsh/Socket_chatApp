import React, {useEffect,useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
const Register = () => {

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
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/chat');
    }
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, confirmPassword, username, email } = values;
      console.log("nikla")
      const data = await axios.post(registerRoute, {
        password, confirmPassword, username, email
      });
      console.log(data)
      if (data.data.status === 'false') {
        toast.error(data.data.msg, toastOptions);
      }


      else if (data.data.status === 'true') {
        localStorage.setItem(
          "chat-app-user", JSON.stringify(data.data.user)
        );
        navigate("/setAvatar");
      }

    }

  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 3) {
      toast.error(
        "Password should be equal or greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
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
          <input className='input_btn' type="email" name="email" placeholder='Email' onChange={(e) => handleChange(e)} />
          <input className='input_btn' type="password" name="password" placeholder='Password' onChange={(e) => handleChange(e)} />
          <input className='input_btn' type="password" name="confirmPassword" placeholder='Confirm Password' onChange={(e) => handleChange(e)} />
          <button className='button' type='submit'>Create User</button>
          <span className='text-white'>Already registered User ? <Link className='bg-transparent text-[#4e0eff] ' to={'/login'}>Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </div>
  )
}
const FormContainer = styled.div`

`;



export default Register