import React, { useEffect } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { FaProjectDiagram, FaUser } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { IoShareSocialOutline } from "react-icons/io5";
import { CiShoppingTag } from "react-icons/ci";
import { FaRocketchat } from "react-icons/fa6";
import { IoLogoBuffer } from "react-icons/io";
import { FaSitemap } from "react-icons/fa";
import { IoLogoSlack } from "react-icons/io5";
import { CiGrid42 } from "react-icons/ci";
import { FaRankingStar } from "react-icons/fa6";

import { MdContactEmergency } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { TfiHome } from "react-icons/tfi";
import { HiOutlineHome } from "react-icons/hi";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineRadarChart } from "react-icons/ai";
import { TbChartBubble } from "react-icons/tb";

import { BiLogOutCircle } from "react-icons/bi";
import { ImBookmarks } from "react-icons/im";
import { Si42 } from "react-icons/si";
import PieChart from './PieChart';
import { CiSearch } from "react-icons/ci";
import Footer from './Footer';
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import About from './About';
function User() {
    const data = JSON.parse(localStorage.getItem('Data'));
    console.log('Data:', data);
    
    useEffect(() => {
        if (!data) {
            return <h1>Loading...</h1>;
        }
        document.body.classList.add('bg-black', 'text-white');
    }, []);

    return (
        <div id="Home" className="min-h-screen flex flex-col bg-black">
                <nav className="ml-16  h-16 shadow-md bg-gray-900 text-gray">
                    <div className="flex items-center justify-between px-4 py-2">
                        <CiSearch size={40} className='text-gray-400 ml-4'/>
                        <input
                            type="text"
                            placeholder="Search..."
                            style={{
                                border: 'none',
                            }}
                            className="bg-gray-900 h-3 text-gray-400 border-none focus:outline-none"
                        />
                        <IoNotificationsCircleSharp size={40} className='text-purple-300 mr-4 hover:text-purple-400 cursor-pointer'/>
                        <h2 className="pr-10 text-xl font-semibold text-gray-400 ">{data?.login}</h2>
                        <img
                            className="w-10 h-10 rounded-full  border-gray-600 object-cover"
                            src={data?.image?.link}
                            alt={data?.login}
                        />
                    </div>
                </nav>
            <div className="flex">
                <nav className="fixed top-0 left-0 h-full w-20 shadow-md bg-gray-800 flex flex-col justify-between">
                    <div className="flex  flex-col h-8 justify-between items-center ">
                        <NavLink href="/user" icon={<CiGrid42 />} /> 
                        <NavLink href="#Home" icon={<RxAvatar />} />
                        <NavLink href="#projects" icon={<FaSitemap />} />
                        <NavLink href="#skills" icon={<TbChartBubble />} />
                        <NavLink href="#contact" icon={<IoShareSocialOutline />} />
                        <NavLink href="#rank" icon={<FaRankingStar />} />
                    </div>
                    <NavLink href="/" icon={<BiLogOutCircle  className='hover:text-red-600'/>} ariaLabel="Logout" />
                </nav>
                <div className="ml-20 flex-1 p-2 overflow-y-auto">
                    <ProfileSection data={data} />
                    <ProjectsSection projects={data?.projects_users || []} />
                    <SkillsSection skills={data?.cursus_users[1]?.skills || []} />
                    <ContactSection data={data} />
                </div>
            </div>
                <Footer />
        </div>
    );
}

const NavLink = ({ href, icon, ariaLabel }) => (
    <a 
        href={href} 
        aria-label={ariaLabel} 
        className="py-8 text-gray-400 rounded transition-colors duration-300 flex items-center justify-center  hover:text-purple-400"
    >
        {React.cloneElement(icon, { size: 30 })}
    </a>
);


const ProfileSection = ({ data }) => (
    <section id="Profile" className=" ">
        <div className="bg-[url('https://cdn.leonardo.ai/users/45b61a2e-8e49-4d02-9eff-77c96e424d23/generations/5719efd0-02ee-4e51-8ecf-47a50313be1e/Leonardo_Phoenix_Create_a_futuristic_hightech_background_for_a_0.jpg')]  bg-cover bg-center rounded-lg p-4 flex justify-center items-center ">
            <About data={data} />
        </div>
    </section>
);


const ProjectsSection = ({ projects }) => (
    <section id="projects" className="my-8">
        <div className="bg-[url('https://cdn.leonardo.ai/users/45b61a2e-8e49-4d02-9eff-77c96e424d23/generations/5719efd0-02ee-4e51-8ecf-47a50313be1e/Leonardo_Phoenix_Create_a_futuristic_hightech_background_for_a_1.jpg')] bg-cover bg-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0,6).map(project => (
                <ProjectCard key={project.project.id} project={project} />
            ))}
        </div>

    </section>
);

const ProjectCard = ({ project }) => (
    <div className="bg-gray-700 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
        <div className="flex items-center mb-2">
            <ImBookmarks className="text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold text-purple-300">{project.project.name}</h2>
        </div>
            <p className="text-gray-300">Score: {project.final_mark}</p>
            <p className="text-gray-300">Status: {project.status}</p>
            <p className="text-gray-300">Marked At: {project.marked_at}</p>
    </div>
);

const SkillsSection = ({ skills }) => (
    <section id="skills" className="my-8">
        <div className="bg-[url('https://cdn.leonardo.ai/users/45b61a2e-8e49-4d02-9eff-77c96e424d23/generations/dece49e1-263f-4142-a36c-e8b85028dfe8/Leonardo_Phoenix_Create_a_futuristic_hightech_background_for_a_3.jpg')] bg-cover  shadow-md rounded-lg p-4">
            <h1 className="text-3xl font-bold text-gray-100 text-center mb-4">SKILLS</h1>
        <PieChart skills={skills} />
        </div>
    </section>
);



const ContactSection = ({ data }) => (
    <section id="contact" className="my-8">
        <div className="bg-[url('https://cdn.leonardo.ai/users/45b61a2e-8e49-4d02-9eff-77c96e424d23/generations/dece49e1-263f-4142-a36c-e8b85028dfe8/Leonardo_Phoenix_Create_a_futuristic_hightech_background_for_a_1.jpg')] bg-cover bg-center shadow-md rounded-lg p-4">
        <h1 className="text-gray-400 text-center">
            Feel free to <span className="text-purple-400 font-semibold">connect</span> with me
        </h1>
        <ul className="flex justify-center space-x-4 mt-4">
            <li>
                <a
                    href="https://github.com/Abdeladim-Fadlane"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-purple-400 transition"
                >
                    <AiFillGithub size={30} />
                </a>
            </li>
            <li>
                <a
                    href="https://www.linkedin.com/in/abdeladim-fadlane/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-purple-400 transition"
                >
                    <FaLinkedinIn size={30} />
                </a>
            </li>
            <li>
                <a
                    href="mailto:abdofadlane128@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-purple-400 transition"
                >
                    <FaEnvelope size={30} />
                </a>
            </li>
            <li>
                <a
                    href="https://leetcode.com/u/afadlane/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-300 hover:text-purple-400 transition"
                >
                    <SiLeetcode size={30} />
                </a>
            </li>
        </ul>
    </div>
    </section>
);




export default User;