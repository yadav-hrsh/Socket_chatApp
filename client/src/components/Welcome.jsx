import React from 'react'
import Robo from '../assets/robot.gif';
const Welcome = ({currentUser}) => {
  return (
    <div className='flex justify-center items-center flex-col '>
      <img src={Robo} alt="" />
      <h1 className='text-white'> welcome, <span className='text-violet-700'>{currentUser.username}</span></h1>
      <h3 className='text-white'>Please select a Chat to continue</h3>
    </div>
  )
}

export default Welcome