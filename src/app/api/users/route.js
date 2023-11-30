import { connectDb } from "@/helper/db";
import {User} from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


// Get request function
export async function GET (request){
    let users = [];
    try {
        await connectDb();
        users = await User.find().select("-password");
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message:"failed to get users",
            success: false,
        });
    }

    return NextResponse.json(users);
}

//Post request function
//data post
//create user
export async function POST(request){

    //fetch user detail from request

    const {name, email, password, about, profileURL } = await request.json();

    //create user detail from request

    console.log({name, email, password, about, profileURL });

    const user = new User({
        name,
        email,
        password,
        about,
        profileURL,
    });
    try {
        //save the object to database 
        user.password = bcrypt.hashSync(user.password,  // agar hashSync use kr rhe hai tho await lagane ki jarurat nhi hai kyuki yeah already syncronus tarika hai but agar hash use kr rhe hai tho await use krne ki jarurat padegi
        parseInt( process.env.BCRYPT_SALT));  // BCRYPT_SALT string m aayega tho int m krne k liye parseInt ka use kra
        console.log(user);
        await connectDb();
        const createdUser = await user.save();

    const response=NextResponse.json(user, {
        status: 201,
    });

    return response;
} catch (error) {
    console.log(error);
    return NextResponse.json({
        message: "Failed to create user !!",
        status: false,
    }, {
        status: 500,
    })
}

    //const body = request.body;
    // console.log(body);
    // console.log(request.method);
    //console.log(request.cookies);
    //console.log(request.headers);
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextUrl.searchParams);

    //const jsonData = await request.json();
    //const textData = await request.text();

    //console.log(jsonData);
    //console.log(textData);

    // return NextResponse.json({
    //     message:"Posting user data",
    // });
}

//Delete request function
//uri variable
export function DELETE (request){
    console.log("delete api called");
    return NextResponse.json({
        message:"deleted !!",
        status:true,
    },{status:201, statusText:"Hey Changed Text"});
}

//Put request function
export function PUT(){}