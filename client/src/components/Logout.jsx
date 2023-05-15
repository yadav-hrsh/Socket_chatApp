import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';
const Logout = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login')
    }
    return (
        <div className='flex items-center justify-center bg-violet-800 h-8 w-8 rounded-2xl  text-2xl'>
                <BiPowerOff className='cursor-pointer' style={{ color: "white" }} onClick={handleClick} />
        </div>
    )
}

export default Logout