import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, featchBlogeByIdAsync, selectBloges, selectSingleBloges } from '../features/Blog/blogeSlice';
import { featchBlogeById } from '../features/Blog/blogeApi';
import { Avatar, Button, Textarea } from "@nextui-org/react";
import { AiFillLike } from "react-icons/ai";
import styled from 'styled-components'
import parse from 'html-react-parser';
import { CircularProgress } from '@nextui-org/react';
import { selectUser } from '../features/User/UserSlice';
import axios from 'axios';
import moment from 'moment';
import CommentCard from './CommentCard';
export default function DetailBloge() {
  const { id } = useParams();
  const variants = ["flat", "faded", "bordered", "underlined"];
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const data = useSelector(selectSingleBloges)
  const loading = useSelector(Loading)
  const [LoadingIncomment, setLoading] = useState(false)
  const [commentes, setcommentes] = useState(null)
  const navigate = useNavigate()
  const  Container = styled`
`
  // console.log(data)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: 'smooth', // Optional: smooth scrolling animation
    });
  };
  useEffect(() => {
    scrollToTop();
    dispatch(featchBlogeByIdAsync(id));

  }, [dispatch, id]);
  const commenteHandler = () => {
    const comment = {
      postId: data._id,
      contente: value
    }
    axios.post('https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/comment/create', comment, {
      headers: {
        'authorization': localStorage.getItem('token')
      }
    }).then(response => {
      setValue("")
      setcommentes([response.data.comment, ...commentes])
    }).catch((error) => {
      console.log(error)
    })
  }
  useEffect(() => {
    setLoading(true)
    fetch('https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/comment/' + id).then(response => {
      //  setcommentes(response.data)
      return response.json()
      //  console.log(response.data)
    }).
      then((res) => { setLoading(false); setcommentes(res) }).catch((error) => console.log(error))
  }, [])
  const likeHandler = (id) => {
    if (user) {
      axios.patch(`https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/comment/like/${id}`, {}, {
        headers: {
          'authorization': localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data.message)
        // if(response.data.message === 'liked'){
        setcommentes(() => {
          return commentes.map(comment => {
            if (comment._id === id) {
              comment.numberOfLikes = response.data.numberOfLikes
              comment.likes = response.data.likes
            }
            return comment
          })
        })
      }).catch((error) => {
        console.log(error)
      })
    }
    else {
      navigate('/login')
    }
  }
  // const styledDescription = data?.description
  // ?.replace(/<h1>/g, '<h1 class="text-3xl font-bold leading-loose ">')
  // ?.replace(/<p>/g, '<p class="text-lg ">')
  // ?.replace(/<ul>/g, '<ul class="list-disc ">')
  // ?.replace(/<li>/g, '<li class="text-gray-800">')
  // ?.replace(
  //   /<pre class="ql-syntax" spellcheck="false">/g,
  //   '<pre class="bg-gray-300 text-sm pl-[45px] m-4 overflow-x-auto">'
  // )
  // console.log(data?.description)
  return (
    <>
      <div className='min-h-screen animate-fade animate-duration-[1500ms] bg-gray-50 animate-delay-100 flex justify-center mb-20 '>
        {data && loading === false ? (
          <div className='w-[95%] sm:w-[70%] lg:w-[45%] flex flex-col items-center '>
            <div className='flex flex-col items-center w-[100%] bg-gray-50 justify-center '>
              <h1 className='text-[2.20rem] sm:text-[3.3rem] lg:text-[2.5rem] text-left mt-7 text-black leading-[1.19] font-bold pl-1  w-[95%]' >{data.title}</h1>
              <div className='flex  w-full mt-5'>
                <Avatar src={data?.userId?.image} className="w-12 ml-4 mt-1 h-12 text-large" />
                <div className='ml-6 '>
                  <p className='text-lg pb-1'>{data?.userId?.name}<button className='ml-8 text-blue-400'>Follow</button></p>
                  <div className='flex items-baseline gap-x-4'>
                    <p className='text-md pb-1 sm:text-lg'>Published in <span className='font-semibold'>{data.category}</span></p>
                    <p className='text-xs pb-1 sm:text-sm '>{moment(data.createdAt).format("MMMM Do YYYY")}</p>
                  </div>
                </div>
              </div>
              {/* <h1 className='text-xl mt-4 font-bold text-center border p-1 rounded-md text-gray-600' >{data.category}</h1> */}
              <img src={data.url} className=' h-[270px] sm:h-[420px]  mt-7 w-[95%] rounded-md bg-gray-50 ' alt="" />
            </div>
            {/* <div className='lg:w-[80%]' dangerouslySetInnerHTML={{ __html:  data?.description }} /> */}
            <div className=' flex flex-col justify-center items-center w-full'>
              {/* <Container> */}
              
              <div
              // id='ql-editor'
                className="text-wrap w-[100%] text-left ql-editor text-black opacity-80 text-lg lg:text-xl leading-relaxed  bg-gray-50 p-4 "
                dangerouslySetInnerHTML={{ __html: data?.description }}
              ></div>
              {/* </Container> */}
              {user ? <div className=" w-[95%]  flex flex-col rounded-md border-1 p-8 justify-center">
                <Textarea
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Enter your comment here"
                  className="w-[100%]"
                  value={value}
                  onValueChange={setValue}
                  maxLength={200}
                />
                <div className='flex justify-between items-center mt-4'>
                  <p className='opacity-40 md:text-[15px] text-[13px] '>{200 - value.length} characters remaining</p>
                  {/* <Button className='' color='primary'>Submit</Button> */}
                  <Button color="primary" onClick={commenteHandler} className='w-[20%]  hover:bg-blue-600 hover:text-white ' variant={"bordered"}>
                    Submit
                  </Button>
                </div>

              </div> : (
                <p className='text-blue-500'>You must be logged in to comment. Login</p>
              )}
            </div>
            <div className='w-[100%] flex flex-col mt-1 items-center'>
              <div className="w-[95%] ">
                {LoadingIncomment && !commentes ? (
                  <div className="flex items-center justify-center w-full">
                    <CircularProgress size="lg" aria-label="Loading..." />
                  </div>
                ) : (
                  commentes?.map((item, index) => (
                    <CommentCard
                      key={index}
                      userImage={item.userId?.image}
                      userName={item.userId?.name}
                      createdAt={item.createdAt}
                      content={item.contente}
                      likes={item.likes}
                      onLike={() => likeHandler(item._id)}
                      isLiked={item.likes?.includes(user?._id)}
                    />
                  ))
                )}
                {!LoadingIncomment && commentes?.length === 0 && (
                  <p className="text-center text-sky-800">No comments yet</p>
                )}
              </div>

            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center w-full h-screen'><CircularProgress size='lg' aria-label="Loading..." /></div>
        )}
      </div>
    </>
  );
}
