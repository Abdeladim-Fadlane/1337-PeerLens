import React from "react";
import Type from "./Type";
import { Si42 } from "react-icons/si";
const AboutSection = ({data}) => (
    <div className="flex w-full">

        <div className="flex flex-col w-full px-2">

            <div className="p-1 m-2 flex flex-row-reverse justify-center text-center  bg-gray-800  rounded-lg "> 
                <div className="flex-col w-full inline-flex ">
                    <span  className="text-purple-300">Cursus </span> 42Cursus 
                </div>

                <div className="flex w-full flex-col">
                    <span className="text-purple-300"> Grade </span>{data.cursus_users[1].grade}
                </div> 

                <div className="flex w-full flex-col">
                    <span  className="text-purple-300">Username </span>{data.login}
                </div> 
            </div>

            <div className="p-1 m-2 flex flex-row justify-center text-center  bg-gray-800  rounded-lg ">
                <div className="bg-gray-600 w-full m-2 p-2">
                    <img src={data.image.link} className="w-40 h-40 rounded-full border-2 border-gray-600 object-cover" alt="afadlane" />
                </div> 

                <div className="bg-gray-600 w-full m-2 p-2">
                    <div><span>Available </span>{data.location}</div>
                    
                </div>
            </div>
            <div className="bg-gray-800 w-full">
                <span>Level </span>{data.cursus_users[1].level}
            </div>
        </div>

        <div className="bg-gray-500">
            <p className="">Campus :{data.campus[0].name}</p> 
            <p className="">Begin at: {data.cursus_users[1].begin_at}</p>
            <p className="">Email: {data.email}</p>
        </div>
    </div>
);

export default AboutSection;
