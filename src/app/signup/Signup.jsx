"use client";

import React, { useState } from "react";
import SignUpsvg from "@/assets/signup.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { signUp } from "@/services/userService";

const Signup = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL: 
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMRvIuYlX_p-EycZ0_RaTLv5teH9CLpMJCg&usqp=CAU",
    });

    const doSignUp = async (event) => {
        event.preventDefault();
        console.log(event);
        console.log(data);

        if(data.name.trim() === "" || data.name == null) {
            toast.warning("Name is required !!", {
                position: "top-center",
            });
            return;
        }
        ////// other field validation

        /////////
        //form submit
        try{
            const result = await signUp(data);

            console.log(result);

            toast.success("User Is Registered !!", {
                position: "top-center",
            });
            setData({
                name:"",
                email:"",
                password:"",
                about:"",
                profileURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMRvIuYlX_p-EycZ0_RaTLv5teH9CLpMJCg&usqp=CAU",
            })
        }catch(error){
            console.log(error);
            console.log(error.response.data.message);
            toast.error("SignUp Error !! " + error.response.data.message, {
                position: "top-center",
            });
        }
    };

    const resetForm = () => {
        setData({
            name:"",
            email:"",
            password:"",
            about:"",
            profileURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxMRvIuYlX_p-EycZ0_RaTLv5teH9CLpMJCg&usqp=CAU",
        });
    };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5">
        <div className="py-5">
            <div className="flex justify-center m-5">
                <Image src={SignUpsvg} alt="signup banner" style={{ width:"40%", }} />
            </div>
            <h1 className="text-3xl text-center"> SignUp Here </h1>
            <form action="#!" className="mt-5" onSubmit={doSignUp}>
                {/* name */}
                <div className="mt-3">
                    <label htmlFor="user_name" className="block text-sm font-medium mb-2 ps-2" > Username </label>
                    <input 
                        type="text" 
                        className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 focus:ring-opacity-100 border border-gray-800 text-white" 
                        placeholder="Enter Here"
                        name="user_name"
                        onChange={(event) => {
                            setData({
                                ...data,
                                name: event.target.value, 
                            });
                        }}
                        value={data.name}
                    />
                </div>
                {/* email */}
                <div className="mt-3">
                    <label htmlFor="user_email" className="block text-sm font-medium mb-2 ps-2" > Email </label>
                    <input 
                        type="email" 
                        className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 focus:ring-opacity-100 border border-gray-800 text-white" 
                        placeholder="Enter Here"
                        id="user_email"
                        name="user_email"
                        onChange={(event) => {
                            setData({
                                ...data,
                                email:event.target.value,
                            });
                        }}
                        value={data.email}
                    />
                </div>
                {/* password */}
                <div className="mt-3">
                    <label htmlFor="user_password" className="block text-sm font-medium mb-2 ps-2" > Password </label>
                    <input 
                        type="password" 
                        className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 focus:ring-opacity-100 border border-gray-800 text-white" 
                        placeholder="Enter Here"
                        id="user_password"
                        onChange={(event) => {
                            setData({
                                ...data,
                                password:event.target.value,
                            });
                        }}
                        value={data.password}
                    />
                </div>
                 {/* about section */}
                 <div className="mt-3">
                    <label htmlFor="user_about" className="block text-sm font-medium mb-2 ps-2" > About </label>
                    <textarea 
                        className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 focus:ring-opacity-100 border border-gray-800 text-white" 
                        placeholder="Enter Here"
                        id="user_about"
                        rows={8}
                        name="user_about"
                        onChange={(event) => {
                            setData({
                                ...data,
                                about: event.target.value,
                            });
                        }}
                        value={data.about}
                    ></textarea>
                </div>

                <div className="mt-3 text-center">
                    <button 
                        type="submit" 
                        className="px-3 py-2 bg-green-600 rounded hover:bg-green-400"
                    > 
                        Signup 
                    </button>

                    <button 
                        type="button"
                        className="px-3 py-2 bg-orange-600 rounded ms-3 hover:bg-orange-400"
                        onClick={resetForm}
                    > 
                        Reset 
                    </button>
                </div>

                {/* {
                    JSON.stringify(data)
                } */}
            </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;
