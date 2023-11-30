"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="h-40 bg-blue-600 mt-5">
      <div className="flex p-5 justify-around">
        <div className="text-center flex flex-col justify-center">
            <h1 className="text-3xl"> Welcome To Work Manager </h1>
            <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo, iure. </p>
        </div>
        <div className="text-center">
            <h1> Important Links </h1>
            <ul>
                <li>
                    <a href="#!"></a> Facebook 
                </li>

                <li>
                    <a href="#!"></a> YouTube 
                </li>

                <li>
                    <a href="#!"></a> Instagram 
                </li>
            </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
