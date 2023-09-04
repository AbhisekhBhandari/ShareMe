import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { } from 'uuid';
import {RotatingSquare} from 'react-loader-spinner'
const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
        <RotatingSquare
         height="100"
         width="200"
         color='#EF4444'
         strokeWidth="10"
         
        />
        <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner
