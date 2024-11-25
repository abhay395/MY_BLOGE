import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/user/userSlice'
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { featchUserAsync, selectUser, Status } from '../features/User/UserSlice'
import { Button } from '@nextui-org/react'
import { authError, authLoading, checkdata, LogiUserAsync, setAuth } from '../features/Auth/AuthSlice'
import { toast, ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const check = useSelector(selectUser)
  const status = useSelector(Status)
  const notify = (message, type) => toast(message, { type: type })
  const onSubmit = (data) => {
    setLoading(true)
    axios.post('https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/auth/login', data).then((res) => {
      const data = res.data
      console.log(data)
      const token = res.data.token
      localStorage.setItem("token", token)
      dispatch(setAuth(res.data.user))
      dispatch(featchUserAsync())
      if (localStorage.getItem('token')) {
        // notify("Login Successfully")
        setTimeout(() => {
          setLoading(false)
          navigate("/")
        }, 1200)
      }
      // setLoading(true)
      // navigate('/')
    }).catch((err) => {
      notify(err.response.data.message, 'warning')
    })
  }
  // useEffect(()=>{
  //   if(!loading &&error){
  //     console.log(error)
  //     // notify(error)
  //   }
  // },[error])
  //  useEffect(()=>{
  //   if(!loading && user){
  //     dispatch(featchUserAsync())
  //     navigate('/')
  //   }
  //  },[loading])
  return (
    <>
    {localStorage.getItem('token') && <Navigate to='/' replace={true}  ></Navigate>}
    <motion.form
      initial={{ opacity: 0, y: 20 }}  // Start off-screen with low opacity
      animate={{ opacity: 1, y: 0 }}   // Fade in and move up to normal position
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onSubmit={handleSubmit(onSubmit)} className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")'
          }}
        ></div>
        <div className="w-full  p-8 lg:w-1/2">
          {/* <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Brand
          </h2> */}
          <p className="text-3xl text-gray-600 font-bold text-center">Welcome back!</p>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              {...register("email", { required: true })}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <a href="#" className="text-xs text-gray-500">
                Forget Password?
              </a>
            </div>
            <input
              {...register("password", { required: true })}
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
            />
          </div>
          <div className="mt-8">
            <Button isLoading={loading} type='submit'
              color="secondary"
              spinner={
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              }
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
              Login
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4" />
            <Link to='/signup' className="text-xs text-gray-500 uppercase">
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </motion.form>
    </>
  )
}
