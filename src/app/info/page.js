"use client";              //make client component other wise render on server side component 
export default function Info () {
    console.log("This is component");
    return (
        <div>
            <h1> This is Info component </h1>
            <p> nabiweugvqaeuopwqniixnbdcuobuycvrguqfuqbeubcubqieucvuyvyvyvlvlvyeve </p>
            <button className="px-3 py-2 rounded bg-blue-600"> Click Here </button>
        </div>
    )
}