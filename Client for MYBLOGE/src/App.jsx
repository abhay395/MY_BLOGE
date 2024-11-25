import React, { useEffect, useState } from "react";
import NavbarComponete from "./components/Navbar";
import { Route, Routes } from "react-router";
import { HomePage, LoginPage, SignupPage, AboutPage, AllBlogPage, CreateBlogPage, LogoutPage, MyProfilePage, ContactUs, Footer } from "./index";
import Oauth from "./components/ContactUs";
import { useDispatch, useSelector } from "react-redux";
// // import axios from "axios";
import { setLoading, setUser } from "./redux/user/userSlice";
import { useSelect } from "@nextui-org/react";
import 'react-quill/dist/quill.snow.css';
import DetailBloge from "./components/DetailBloge";
import { featchBlogesAsync } from "./features/Blog/blogeSlice";
import { featchUserAsync } from "./features/User/UserSlice";
// import Cookies from "js-cookie";
import { checkUserAsync, checkdata } from "./features/Auth/AuthSlice";
import MyblogePage from "./pages/MyblogePage";
import EditBlogePage from "./pages/EditBlogePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const check = useSelector(checkdata)
  // useEffect(() => {
  //   const setLanguageCookie = (language) => {
  //     const a= Cookies.get()
  //     // console.log("a")
  //     console.log(a)
  //   }
  //   setLanguageCookie("Hello")
  // }, []);
  // upload()
  useEffect(() => {
    dispatch(featchBlogesAsync())
    // dispatch(checkUserAsync())
  }, [dispatch]);

  useEffect(() => {
    // if (check!=null) {
      console.log("check",check)
    if(localStorage.getItem('token'))  dispatch(featchUserAsync())
    // }
  }, [dispatch,check]);

  return (
    <>
      <NavbarComponete />
      <Routes path='/'>
        <Route path='' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/allblog' element={<AllBlogPage />} />
        <Route path='/createblog' element={<CreateBlogPage />} />
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/myprofile' element={<MyProfilePage />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/mybloge/edit/:id' element={<EditBlogePage />} />
        {/* <Route path='/uplodefile' element={<Oauth />} /> */}
        <Route path='/create' element={<CreateBlogPage />} />
        <Route path="/mybloge" element={<MyblogePage/>}  />
        <Route path='/detaile/:id' element={<DetailBloge />} />
      </Routes>
      <ToastContainer/>
      <Footer />
    </>
  );
}
