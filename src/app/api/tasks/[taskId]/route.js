// /api/tasks/{taskId}

import {Task} from "@/models/task";
import { NextResponse } from "next/server";
import { getResponseMessage } from "@/helper/response.Message";
import { connectDb } from "@/helper/db";

// Get Single Tasks
export async function GET(request, { params }) {
    const { taskId } = params;

    try{
        await connectDb();
        const task = await Task.findById(taskId);

        return NextResponse.json(task);
    }catch (error) {
        console.log(error);
        return getResponseMessage("Erroe In Getting Task !!", 404, false);
    }
}

export async function PUT(request, { params }) {
    try{
        const {taskId} = params;
        const { title, content, status } = await request.json();

        let task = await Task.findById(taskId);

        (task.title=title),
        (task.content=content),
        (task.status=status);

        await connectDb();
        const updatedtask = await task.save();
        return NextResponse.json(updatedtask);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error In Getting Task Updating !!!", 500, false);
    }
}

export async function DELETE(request, { params }) {
    try{
        const {taskId} = params;
        await connectDb();
        await Task.deleteOne({
            _id:taskId
        });
        return getResponseMessage("Task Deleted !!", 200, true);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error In Deleting Task !!", 500, false);
    }
}