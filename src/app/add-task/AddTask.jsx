"use client";
import React from "react";
import { useState } from "react";
import LoginSvg from "@/assets/login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import { toast } from "react-toastify";

const AddTask = () => {
  // console.log("This is add-task component");

  const [task, setTask] = useState({
    title: "", 
    content: "", 
    status: "none", 
    // temporary solution hai direct id dena dynamic tabhi hogi jb user authentication aur authorization hoga
    userId: "654cbc03b8286cd605d3d712",
  });

  const handleAddTask = async (event) => {
    event.preventDefault();
    console.log(task);
    // validate task data 
    try{
      const result = await addTask(task)
      console.log(result);
      toast.success("Your task is added !", {
        position: "top-center",
      });
      setTask({
        title:"",
        content:"",
        status:"none",
      });
    } catch (error) {
      console.log(error);
      toast.error("Task Not Added !! ", {
        position: "top-center",
      });
    }
  }

  return (
    <div className="grid grid-cols-12 justify-center">
      <div className="col-span-4 col-start-5 p-5 shadow-grey-200 shadow-sm">
        <div className="my-8 flex justify-center">
          <Image src={LoginSvg} alt="Login banner" style={{
            width:"50%",
          }} />
        </div>
        <h1 className="text-3xl text-center"> Add Your Task Here </h1>

        <form action="#!" onSubmit={handleAddTask}>
          {/* Task Title */}
          <div className="mt-4">
            <label htmlFor="task_title" className="block text-sm font-medium mb-2 "> Title </label>
            <input 
              type="text" 
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring focus:ring-gray-400 focus:ring-opacity-100 border border-gray-800 text-white" 
              id="task_title"
              name="task_title"
              onChange={(event) => {
                setTask({...task, title:event.target.value});
              }}
              value={task.title}
            />
          </div>

          {/* Task Content */}
          <div className="mt-4">
            <label htmlFor="task_content" className="block text-sm font-medium mb-2 "> Content </label>
            <textarea 
              type="text" 
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring focus:ring-gray-400 focus:ring-opacity-100 border border-gray-800 text-white" 
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(event) => {
                setTask({...task, content:event.target.value});
              }}
              value={task.content}
            />
          </div>

          {/* Task Status */}
          <div className="mt-4">
            <label htmlFor="task_status" className="block text-sm font-medium mb-2 "> Status </label>
            <select id="task_status" 
              className="w-full p-3 rounded-3xl bg-gray-800 focus:ring focus:ring-gray-400 focus:ring-opacity-100 border border-gray-800 text-white"
              name="task_status"
              onChange={(event) => {
                setTask({...task, status:event.target.value});
              }}
              value={task.status}
              >

              <option value="none" disabled> --Select Status-- </option>
              <option value="completed"> Completed </option>
              <option value="pending"> Pending </option>
            </select>
          </div>

          {/* Button Actions */}
          <div className="mt-4 flex justify-center">
            <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800"> Add Task </button>
            <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3"> Clear </button>
          </div>

          {/* {
            JSON.stringify(task)
          } */}

        </form>

      </div>
    </div>
  )
}

export default AddTask;
