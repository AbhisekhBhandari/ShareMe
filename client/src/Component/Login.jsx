import React from 'react'
import {useNavigate} from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png'
import { signIn } from '../firebase';
import { client } from '../client';

const Login = () => {


  const navigate= useNavigate();
    const signInFunc = async() =>{
      const result = await signIn();
      localStorage.setItem('user', JSON.stringify(result.user));
      const {displayName, photoURL, uid} = result.user
      
      const doc = {
        _id : uid,
        _type: 'user',
        username: displayName,
        image: photoURL
      }
      try{
      const createClient=  await client.createIfNotExists(doc);
      navigate('/', {replace:true})
      }catch(e){
        console.log(e, 'login');
      }

    }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type= 'video/mp4'
          loop
          controls= {false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay '>
          <div className='p-5'>
            <img src={logo} alt='logo' width='130px'  />
          </div>
        <div className=' shadow-2xl'>

              <button
                type='button'
                className=' bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                onClick={signInFunc}
                >
              <FcGoogle className='mr-4'/>Sign in with google
              </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login
