import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux'
import { setUser } from '../features/User/UserSlice';
import { CircularProgress } from "@nextui-org/react";
import { setAuth } from '../features/Auth/AuthSlice';
export default function LogoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  async function logout() {
    const res = await axios.get('https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/auth/logout', {
      headers: {
        "authorization": localStorage.getItem('token'),
      },
    });
    // console.log(res)
    if (res.status === 200) {
      // localStorage.clear()
      localStorage.removeItem('token');
      dispatch(setUser(null))
      dispatch(setAuth(null))
      navigate('/')
    }
  }
  useEffect(() => {
    logout()
  }, [])
  return (

    <div className='flex items-center justify-center w-full min-h-[600px]'><CircularProgress size='lg' aria-label="Loading..." /></div>

  )
}
