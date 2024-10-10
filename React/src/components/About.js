import React from "react";
import Type from "./Type";
import { FaUniversity } from "react-icons/fa";
import { SiStartrek } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";

import { Si42 } from "react-icons/si";
const AboutSection = ({data}) => (
    <div className="flex flex-col md:flex-row w-full ">

        <div className="flex flex-col w-full  ">

            <div className="p-1 m-2 flex flex-col md:flex-row-reverse  bg-opacity-70 justify-center text-center bg-gray-800 rounded-lg"> 
                <div className="flex-col w-full inline-flex">
                    <span className="text-purple-300">Cursus </span> 42Cursus 
                </div>

                <div className="flex w-full flex-col">
                    <span className="text-purple-300"> Grade </span>{data.cursus_users[1].grade}
                </div> 

                <div className="flex w-full flex-col">
                    <span className="text-purple-300">Username </span>{data.login}
                </div> 
            </div>

            <div className="p-10 m-2 flex flex-col md:flex-row justify-center text-center bg-opacity-70 bg-gray-800 rounded-md">

                <div className="bg-opacity-70 bg-gray-700 py-14 mx-4 my-2 flex-col h-full w-full rounded-md  flex justify-center items-center">
                    <h1 className="font-serif text-2xl ">Blackholed</h1>
                    <div className="hover:text-red-600 cursor-wait"> 
                        {new Date(data.cursus_users[1].blackholed_at).toLocaleDateString()}  
                    </div>
                </div>

                <div className="bg-opacity-70 bg-gray-700 py-14 mx-4 my-2 flex-col h-full w-full rounded-md  flex justify-center items-center">
                    <h1 className="font-serif text-2xl">Available</h1>
                    <div className="hover:text-purple-800 cursor-pointer">{data.location}</div>
                </div>
            </div>

            <div className="bg-opacity-70 bg-gray-800 p-4 m-2 rounded-lg justify-center text-center">
                <div className="relative w-full bg-gray-600 rounded-md h-4 font-bold">
                    <div
                        className="bg-purple-700 h-4 rounded-md"
                        style={{ width: `${(data.cursus_users[1].level % 1) * 100}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                    Level {Math.floor(data.cursus_users[1].level)} - {Math.round((data.cursus_users[1].level % 1) * 100)}%
                    </span>
                </div>
            </div>
        </div>

        <div className="bg-opacity-70 bg-gray-800 md:w-[60%]  flex m-2 flex-col py-10 px-10  rounded-lg">

            <div className="m-2 w-full rounded-md flex justify-center items-center">
                <img src={data.image.link} className="w-40 h-40 rounded-full border-2 border-gray-600 object-cover" alt="afadlane" />
            </div>
            <div className="m-2 py-6 px-4 w-full0 rounded-md flex flex-col justify-center items-center">
                <div className="flex flex-row items-center">
                    <FaUniversity size={20} className='text-black pr-1'/>  
                    <span className="text-purple-600">{data.campus[0].name}</span>
                </div>
                <div className="flex flex-row items-center">
                    <SiStartrek size={20} className='text-black pr-1'/>  
                    <span className="text-purple-600">{new Date(data.cursus_users[1].begin_at).toLocaleDateString()}</span>
                </div>
                
                <div className="flex flex-row items-center">
                    <MdOutlineEmail size={20} className='text-black pr-1'/>  
                    <a href={`mailto:${data.email}`} className="text-purple-600">{data.email}</a>
                </div>
            </div>
        </div>
    </div>
);

export default AboutSection;
