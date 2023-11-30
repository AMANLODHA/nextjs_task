"use client";

import UserContext from "@/context/userContext";
import { deleteTask, getTasksOfUser } from "@/services/taskService";
import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ShowTasks = () => {

    const [tasks, setTasks] = useState([]);
    const context = useContext(UserContext);

    async function loadTasks(userId) {
        try{
           const tasks = await getTasksOfUser(userId);
           setTasks([...tasks].reverse());                // jo task add hoga upper aajayega
           console.log(tasks);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {

        if(context.user) {
            loadTasks(context.user._id);
        }

    }, [context.user]);

    async function deleteTaskParent(tasksId){
        const result = await Swal.fire({
            title: "Are You Sure Want To Delete It?",
            text: "You Won\'t be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if(result.isConfirmed) {
            try{
                const result = await deleteTask(tasksId);
                console.log(result);
                const newTasks = tasks.filter(item => item._id!=tasksId);                      // jo task bhi delete kre hai filter baaki jo bhi task hai unko show krega
                setTasks(newTasks);
                toast.success("Your task is deleted");
            }catch(error){
                console.log(error);
                toast.error("Error in deleting task !!")
            }
        }
    }

  return (
    <div className="grid grid-cols-12 mt-3">
        <div className="col-span-6 col-start-4">
            <h1 className="text-3xl text-center mb-3"> Your Tasks ({tasks.length}) </h1>

            {tasks.map((task) => (
                <Task 
                    task={task} 
                    key={task._id} 
                    deleteTaskParent={deleteTaskParent} />
            ))}
        </div>
    </div>
  )
}

export default ShowTasks;
