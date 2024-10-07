import React, { useEffect } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { MdContactEmergency } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import PieChart from './PieChart'; // Adjust the import based on your file structure

function User() {
    const data = JSON.parse(localStorage.getItem('Data'));
    console.log('Data:', data);
    
    useEffect(() => {
        document.body.classList.add('bg-black', 'text-white');
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Navigation */}
            <nav className="shadow-md bg-gray-800 text-white w-full">
                <div className="flex items-center justify-between px-4 py-2">
                    <h2 className="text-xl font-semibold text-gray-400">{data.login}</h2>
                    <img 
                        className="w-16 h-16 rounded-full border-2 border-gray-600 object-cover"
                        src={data.image.link} 
                        alt={data.login} 
                    />
                </div>

            </nav>

            <div className="flex flex-1">
                {/* Vertical Navigation on the Left */}
                <nav className="fixed top-0 left-0 h-full w-20 shadow-md bg-gray-800 text-white flex flex-col justify-between py-4">
                    <div>
                        <a href="#Profile" className="py-2 text-gray-400 hover:text-white transition-colors duration-300"><IoHomeSharp size={40} /></a>
                        <a href="#projects" className="py-2 text-gray-400 hover:text-white transition-colors duration-300"><FaProjectDiagram size={40} /></a>
                        <a href="#skills" className="py-2 text-gray-400 hover:text-white transition-colors duration-300"><GiSkills size={40} /></a>
                        <a href="#contact" className="py-2 text-gray-400 hover:text-white transition-colors duration-300"><MdContactEmergency size={40} /></a>
                    </div>
                    <a href="/" className="py-2 text-gray-400 hover:text-red-400 transition-colors duration-300"><BiLogOutCircle size={40} /></a>
                </nav>

                <div className="ml-20 flex-1 p-8 overflow-y-auto">
                        {/* Profile Section */}
                        <section id="Profile" className="my-8 bg-gray-800 shadow-md rounded-lg p-6 transition-transform transform hover:scale-105">
                        <div className="bg-gray-700 rounded-lg p-4">
                            <h2 className="text-xl font-semibold">{data.displayname}</h2>
                            <p className="text-gray-300">{data.email}</p>
                            <div className="mt-4"></div>
                                <p className="text-gray-300 mb-2">Level: {data.cursus_users[1].level}</p>
                                <div className="w-full bg-gray-600 rounded-full h-4">
                                    <div 
                                        className="bg-blue-500 h-4 rounded-full" 
                                        style={{ width: `${(data.cursus_users[1].level % 1) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        {/* </div> */}
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="my-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.projects_users.slice(0, 10).map((project) => (
                                <div key={project.project.id} className="bg-gray-700 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                                    <h2 className="text-xl font-semibold">{project.project.name}</h2>
                                    <p className="text-gray-300">{project.project.description}</p>
                                    <p className="text-gray-400">Final Mark: {project.final_mark}</p>
                                    <p className="text-gray-400">Marked At: {new Date(project.marked_at).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section id="skills" className="my-8">
                        
                        <PieChart skills={data.cursus_users[1].skills} />
                    </section>

                    {/* Contact Section */}
                    <section id="contact" className="my-8">
                        <div className="bg-gray-700 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
                            <h2 className="text-xl font-semibold">{data.email}</h2>
                            <p className="text-gray-300">Phone: {data.phone}</p>
                            <p className="text-gray-300">Address: {data.address}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default User;
