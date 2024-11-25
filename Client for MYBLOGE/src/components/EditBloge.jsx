import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Button, CircularProgress, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Loading, featchBlogeByIdAsync, selectSingleBloges, updateBlogeByIdAsync } from "../features/Blog/blogeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";

export default function EditBloge() {
  const [url, setUrl] = useState(null);
  const notify = (message) => {
    toast(message)
 };
  const [quillText, setQuillText] = useState("");
  const [title, setTitle] = useState("");
  const [Selectedcategory, setSelectedcategory] = useState("Education");
  const [loading, setLoading] = useState(false);

  const { id } = useParams(); // Get blog ID from the URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadingForBlog = useSelector(Loading);
  const blog = useSelector(selectSingleBloges);

  const category = ["LifeStyle", "Education", "Medical", "Job", "Kids"];

  // Fetch blog data or reset form if ID changes
  useEffect(() => {
    if (!blog) {
      dispatch(featchBlogeByIdAsync(id));
    } else {
      setTitle(blog.title || "");
      setSelectedcategory(blog.category || "");
      setUrl(blog.url || null);
      setQuillText(blog.description || "");
    }
  }, [dispatch, blog, id]);

  // Handle image upload
  const handleUpload = async (data) => {
    const formData = new FormData();
    formData.append("image", data);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://server-for-mybloge-git-main-abhay395s-projects.vercel.app/bloge/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response) {
        setUrl(response.data.image);
        notify("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      notify("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    handleUpload(event.target.files[0]);
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title || !Selectedcategory || !url || !quillText) {
      notify("All fields are required!");
      return;
    }

    const updatedBlog = {
      id,
      title,
      category: Selectedcategory,
      url,
      description: quillText,
    };

    try {
      console.log(updatedBlog)
      dispatch(updateBlogeByIdAsync(updatedBlog));
      notify("Blog updated successfully!");
      // dispatch()
      // setTimeout(()=>{
      if(!loadingForBlog )  setTimeout(()=>navigate("/mybloge"),1000); // Redirect to home after update
      // },2000)
    } catch (error) {
      console.error("Error updating blog:", error);
      notify("Failed to update blog.");
    }
  };
  // useEffect(()=>{
  //  if(!blog && !loadingForBlog)  navigate('/mybloge')
  // },[blog])
  if (loadingForBlog && !blog) {
    return <div className='flex items-center justify-center w-full h-screen'><CircularProgress size='lg' aria-label="Loading..." /></div>;
  }

  return (
    <form className="min-h-screen h-auto mb-10 flex flex-col items-center justify-center" onSubmit={onSubmit}>
    <div className="w-[90%] md:w-[70%] mt-4">
        <div className="flex flex-col md:flex-row">
            <Input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                label="Title"
                radius="none"
                className="border md:mr-1 cursor-pointer bg-white w-full md:w-[70%]"
            />
            <Select
                radius="none"
                size="md"
                label="Select Category"
                className="rounded-sm w-full md:w-[30%] md:mt-0 mt-3 mb-3 h-[40px]"
                // value={Selectedcategory}
                defaultSelectedKeys={[blog?.category]} // Bind to the current selected value
                onSelectionChange={(value) => setSelectedcategory(value.currentKey)} // Update state directly
            >
                {category.map((item) => (
                    <SelectItem value={item} key={item}>
                        {item}
                    </SelectItem>
                ))}
            </Select>


        </div>
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
            {/* Blog Image Upload Section */}
            <div className={`w-full max-w-3xl border border-dashed border-gray-300 rounded-lg p-6 bg-white ${loading ? "cursor-not-allowed" : ""}`}>
                <label
                    htmlFor="blogImageInput"
                    className={`flex flex-col items-center justify-center space-y-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"} hover:bg-gray-100 p-6 rounded-lg transition-all duration-300`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16s0-2 1-4a10 10 0 0116 0c1 2 1 4 1 4H3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16v2a4 4 0 008 0v-2" />
                    </svg>
                    <span className="text-sm text-gray-600">Click to upload your blog image</span>
                    <input
                        id="blogImageInput"
                        type="file"
                        disabled={loading}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                </label>
            </div>
            {url && (
                <div className="w-full max-w-3xl">
                    <img src={url} className="w-full h-[450px] rounded-lg shadow-md mt-4 animate-fade" alt="Blog Preview" />
                </div>
            )}
        </div>
    </div>

    <div className="w-[90%] md:w-[70%] h-[400px] mx-auto mt-6">
        <div className="bg-gray-50 border border-gray-300 rounded-lg shadow-md p-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Write Your Content</label>
            <ReactQuill
                value={quillText}
                theme="snow"
                onChange={(value) => setQuillText(value)}
                className="h-[320px] border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-2"
                required
            />
        </div>
    </div>

    <div className="mt-8 w-[90%] md:w-[70%]">
        <Button  className="w-[100%]" type="submit" radius="none" isLoading={loadingForBlog} color="primary">
            Update
        </Button>
    </div>
    <ToastContainer />
</form>
  );
}
