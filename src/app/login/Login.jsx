"use client";
import UserContext from "@/context/userContext";
import { useContext } from "react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";

const Login = () => {

    const router = useRouter();
    const context = useContext(UserContext);
    const [loginData, setLoginData] = useState({
        email:"",
        password:"",
    });

    const loginFormSubmitted = async (event) => {
        event.preventDefault();
        console.log(loginData);
        if(loginData.email.trim() === "" || loginData.password.trim() === "") {
            toast.info("Invalid data !!", {
                position: "top-center",
            });
            return;
        }
        //valid data
        //Login

        try{
            const result = await login(loginData);
            console.log(result);
            toast.success("Logged In");
            //redirect
            context.setUser(result.user);
            router.push("/profile/user");
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message, {
                position: "top-center",
            });
        }
    };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5">
        <div className="py-5">
            
            <h1 className="text-center"> Login Here </h1>
            <form action="#!" className="mt-5" onSubmit={loginFormSubmitted}>
                <div className="mt-3">
                    <label htmlFor="user_email" className="block text-sm font-medium mb-2 ps-2"> Email </label>
                    <input 
                        type="email"
                        className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 focus:ring-opacity-100 border border-gray-800 text-white"
                        placeholder="Enter Here"
                        id="user_email"
                        name="user_email"
                        onChange={(event) => {
                            setLoginData({
                                ...loginData,
                                email: event.target.value,
                            });
                        }}
                        value={loginData.email}
                    />
                </div>

                <div className="mt-3">
                    <label htmlFor="user_password" className="block text-sm font-medium mb-2 ps-2"> Password </label>
                    <input 
                        type="password" 
                        className="w-full p-3 rounded-2xl bg-gray-800 focus:ring-gray-400 focus:ring-opacity-100 border border-gray-800 text-white"
                        placeholder="Enter Here"
                        id="user_password"
                        //name="user_password"
                        onChange={(event) => {
                            setLoginData({
                                ...loginData,
                                password: event.target.value,
                            });
                        }}
                        value={loginData.password}
                    />
                </div>

                <div className="mt-3 text-center">
                    <button 
                        type="submit"
                        className="px-3 py-2 bg-green-600 rounded hover:bg-green-400"
                    > 
                        Login 
                    </button>
                    <button 
                        type="button" 
                        className="px-3 py-2 bg-orange-600 rounded ms-3 hover:bg-orange-400"
                        // onClick={resetForm}
                    > 
                        Reset 
                    </button>
                </div>
            </form>
        </div>
        {/* {
            JSON.stringify(loginData)
        } */}
      </div>
    </div>
  )
}

export default Login;
