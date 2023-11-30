import { NextResponse } from "next/server";
import {User} from "@/models/user";
//import { connectDb } from "@/helper/db";

// export const GET = () => {}  arrow function

//get user
export async function GET(request,{params}){
    const {userId} = params

    const user = await User.findById(userId).select("-password");  // run time p field change kr skte hai kya chahiye aur kya nhi

    return NextResponse.json(user);
}

//delete user
export async function DELETE(request, {params}){
    
    const {userId} = params;
    
    try{
        //await connectDb();
        await User.deleteOne({
            _id:userId
        })
        return NextResponse.json({
            message:"user deleted !!",
            success: true,
        })
    }catch(error){
        return NextResponse.json({
            message:"Error in deleting user !!",
            success: false,
        })
    }
}

//update user 

export async function PUT(request, {params}){
    const {userId} = params

    const {name, password, about, profileURL} = await request.json()

    try{
        //await connectDb();
        const user = await User.findById(userId);

        user.name = name;
        user.password = password;
        user.about = about;
        user.profileURL = profileURL;

        const updatedUser = await user.save()

        return NextResponse.json(updatedUser);

    }catch(error){
        return NextResponse.json({
            message: "failed to user updated !!",
            success: false,
        })
    }
}