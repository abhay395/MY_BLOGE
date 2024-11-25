import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { featchUserBlogeAsync, Status } from '../features/User/UserSlice'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from "react-icons/fa"; // FontAwesome icons
import moment from 'moment'
import { CircularProgress } from '@nextui-org/react';
// import { selectBloges } from '../features/Blog/blogeSlice';
import { checkdata } from '../features/Auth/AuthSlice';
import { delteBlogeAsync, featchBlogesByUserAsync, Loading, selectBloges, selectBlogesForFrontPage, selectBlogesforUser, setEditBloge } from '../features/Blog/blogeSlice';
import { motion, AnimatePresence } from 'framer-motion';
function Mybloge() {
    const dispatch = useDispatch()
    const user = useSelector(checkdata)
    const [bloges, setBloges] = useState(null)
    const userBloge = useSelector(selectBlogesforUser)
    const loading = useSelector(Loading)
    const navigate = useNavigate()
    // const [userBloge, setuserBloge] = useState([])
    const status = "fulfilled"
    // let userBloge = allboges.filter((bloge)=>bloge.userId==user._id)
    useEffect(() => {
        dispatch(setEditBloge())
        setBloges(null)
        dispatch(featchBlogesByUserAsync())
        // if (allboges) {
        // setuserBloge(()=>allboges.filter((bloge)=>bloge.userId._id==user._id))
        // }
    }, [])
    useEffect(() => {
        dispatch(setEditBloge)
        if (userBloge) {
            setBloges(userBloge)
            // console.log(userBloge)
        }
    }, [userBloge])

    const deleteHandler = (id) => {
        setBloges(bloges.filter((item) => item._id !== id));
        dispatch(delteBlogeAsync(id))
    }
    return (
        <div>
            {loading && !bloges ? (

                <div className='flex items-center justify-center w-full h-screen'><CircularProgress size='lg' aria-label="Loading..." /></div>
            ) : (
                <section className="flex flex-col items-center w-full bg-white min-h-screen">
                        <h1 className="text-4xl mt-7 font-semibold">My Blogs</h1>
                    <AnimatePresence>
                        {
                            bloges?.length > 0 ? <div className="grid grid-cols-1 gap-6 py-12 px-5 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
                                {bloges?.map((item, index) => (
                                    <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                                        
                                        key={index}
                                        className="border rounded-lg w-[350px] shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
                                    >
                                        {/* Blog Image */}
                                        <Link to={`/detaile/${item._id}`}>
                                            <img
                                                src={item.url}
                                                alt={item.title}
                                                className="w-full h-[200px] object-cover"
                                            />
                                        </Link>

                                        {/* Blog Content */}
                                        <div className="p-4">
                                            {/* Title */}
                                            <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
                                            {/* Time */}
                                            <p className="text-sm text-gray-500 mt-2">
                                                {moment(item.createdAt).format("MMMM Do YYYY")}
                                            </p>
                                        </div>

                                        {/* Edit and Delete Icons */}
                                        <div className="absolute top-3 right-3 flex space-x-2">
                                            <Link to={`/mybloge/edit/${item._id}`}
                                                //   onClick={() => navigate(`/edit/${item._id}`)}
                                                className="text-blue-500 bg-white rounded-full p-2 flex justify-center items-center hover:text-blue-700"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </Link>
                                            <button
                                                onClick={() => deleteHandler(item._id)}
                                                className="text-red-500  bg-white rounded-full p-2 flex justify-center items-center hover:text-red-700"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div> : <div className="flex items-center justify-center w-full h-screen">
                                <h1 className="text-2xl font-semibold text-gray-500">
                                    You have not created any blogs yet.
                                </h1>
                            </div>
                        }
                    </AnimatePresence>
                </section>
            )}

        </div>

    )
}

export default Mybloge