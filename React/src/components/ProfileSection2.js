import React from 'react';

import { FaUniversity } from "react-icons/fa";
import { SiStartrek } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";

const ProfileSection2 = ({data}) => {
    return (
            <div className='main-class'>
                <section id="Profile" className=" ">
                    <div className="bg-[url('https://cdn.leonardo.ai/users/45b61a2e-8e49-4d02-9eff-77c96e424d23/generations/5719efd0-02ee-4e51-8ecf-47a50313be1e/Leonardo_Phoenix_Create_a_futuristic_hightech_background_for_a_0.jpg')]  bg-cover bg-center shadow-md rounded-lg p-4 flex justify-center items-center ">
                    <div className="flex flex-col md:flex-row w-full text-cyan-200">
                        <div className="flex flex-col w-full  ">

                            <div className="p-1 m-2 flex flex-col md:flex-row-reverse  bg-opacity-70 justify-center text-center bg-gray-800 rounded-lg"> 
                                <div className="flex-col w-full inline-flex text-white">
                                    <span className="text-purple-600 font-bold font-mono">Cursus </span> 42Cursus 
                                </div>

                                <div className="flex w-full flex-col text-white">
                                    <span className="text-purple-600 font-bold font-mono"> Grade </span>{data.grade}
                                </div> 

                                <div className="flex w-full flex-col text-white ">
                                    <span className="text-purple-600 font-bold font-mono">Username </span>{data.login}
                                </div> 
                            </div>


                            <div className="p-10 m-2 flex flex-col md:flex-row justify-center text-center bg-opacity-70 bg-gray-800 rounded-md">

                                <div className="bg-opacity-70 bg-gray-700 py-14 mx-4 my-2 flex-col h-full w-full rounded-md  flex justify-center items-center">
                                    <h1 className="font-serif text-3xl text-purple-400">Blackholed</h1>
                                    <div className="hover:text-red-600 cursor-wait text-2xl"> 
                                        {new Date(data.blackholed_at).toLocaleDateString()}  
                                    </div>
                                </div>

                                <div className="bg-opacity-70 bg-gray-700 py-14 mx-4 my-2 flex-col h-full w-full rounded-md  flex justify-center items-center">
                                    {data.location ?  <h1 className="font-serif text-3xl  text-purple-400 ">Available</h1>
                                    : <h1 className="font-serif text-3xl  text-purple-400 ">Unavailable</h1>}
                                
                                    <div className="hover:text-cyan-800 cursor-not-allowed text-2xl">{data.location ? data.location : '-'}</div>
                                </div>
                            </div>

                            <div className="bg-opacity-70 bg-gray-800 p-4 m-2 rounded-lg justify-center text-center">
                                <div className="relative w-full bg-gray-600 rounded-md h-4 font-bold">
                                    <div
                                        className="bg-purple-700 h-4 rounded-md"
                                        style={{ width: `${(data.level % 1) * 100}%` }}/>
                                    <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                                    Level {Math.floor(data.level)} - {Math.round((data.level % 1) * 100)}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-opacity-70 bg-gray-800 md:w-[60%]  flex m-2 flex-col py-10 px-10  rounded-lg">

                            <div className="m-2 w-full rounded-md flex justify-center items-center">
                                <img src={data.image} className="w-40 h-40 rounded-full border-2 border-gray-600 object-cover" alt="afadlane" />
                            </div>
                            <div className=" w-full rounded-md flex justify-center items-center">
                                <h1 className="text-xl font-bold text-purple-500">{data.displayName}</h1>
                            </div>
                            <div className="m-1 py-6 px-4 w-full0 rounded-md flex flex-col justify-center items-center">
                                <div className="flex flex-row items-center">
                                    <FaUniversity size={25} className='text-purple-500 pr-1'/>  
                                    <span className="text-gray-200">{data.login}</span>
                                </div>
                                <div className="flex flex-row items-center">
                                    <SiStartrek size={25} className='text-purple-500 pr-1'/>  
                                    <span className="text-gray-200">{new Date(data.begin_at).toLocaleDateString()}</span>
                                </div>
                                
                                <div className="flex flex-row items-center">
                                    <MdOutlineEmail size={25} className='text-purple-500 pr-1'/>  
                                    <a href={`mailto:${data.email}`} className="text-gray-200">{data.email}</a>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
             </div>
    );
}


export default ProfileSection2;