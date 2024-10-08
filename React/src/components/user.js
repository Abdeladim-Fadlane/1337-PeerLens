import React, { useEffect } from 'react';
import { IoHomeSharp } from "react-icons/io5";
import { FaProjectDiagram, FaUser } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { MdContactEmergency } from "react-icons/md";
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
        document.body.classList.add('bg-black', 'text-white');
    }, []);

    return (
        <div id="Home" className="min-h-screen flex flex-col bg-gray-900">
            {/* Top Navigation */}
            <nav className="ml-16 shadow-md bg-gray-800 text-gray">
                <div className="flex items-center justify-between px-4 py-2">
                    <CiSearch size={50} />
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            border: 'none',
                        }}
                        className="bg-gray-800 text-gray-400 border-none focus:outline-none"
                    />

                    <h2 className="pr-10 text-xl font-semibold text-gray-400 ml-4">{data?.login}</h2>
                    <img
                        className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
                        src={data?.image?.link}
                        alt={data?.login}
                    />
                </div>
            </nav>

            {/* main content */}
            <div className="flex">
                {/* Vertical Navigation on the Left */}
                <nav className="fixed top-0 left-0 h-full w-20 shadow-md bg-gray-800 text-white flex flex-col justify-between">
                <div className="flex m-10 flex-col items-center ">
                     <NavLink  href="#Home" icon={<IoHomeSharp />} /> </div>
                    <div className="flex flex-col items-center space-y-20">
                        <NavLink href="#Profile" icon={<FaUser />} />
                        <NavLink href="#projects" icon={<FaProjectDiagram />} />
                        <NavLink href="#skills" icon={<GiSkills />} />
                        <NavLink href="#contact" icon={<MdContactEmergency />} />
                    </div>
                    <NavLink href="/" icon={<BiLogOutCircle />} ariaLabel="Logout" />
                </nav>
                <div className="ml-20 flex-1 p-8 overflow-y-auto">
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
        className="py-2 text-gray-400 hover:bg-gray-700 rounded transition-colors duration-300 flex items-center justify-center"
    >
        {React.cloneElement(icon, { size: 40 })}
    </a>
);


const ProfileSection = ({ data }) => (
    <section id="Profile" className="my-8 ">
        <div className="bg-gray-700 rounded-lg p-4 flex justify-center items-center">
            <About data={data} />
        </div>
    </section>
);


const ProjectsSection = ({ projects }) => (
    <section id="projects" className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map(project => (
                <ProjectCard key={project.project.id} project={project} />
                
            ))}
        </div>
    </section>
);

const ProjectCard = ({ project }) => (
    <div className="bg-gray-700 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
        <div className="flex items-center mb-2">
            <ImBookmarks className="text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-300">{project.project.name}</h2>
        </div>
        <p className="text-gray-300 mb-2"> lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex justify-center">
            <button className="bg-gray-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-500 transition flex items-center">
                <AiFillGithub className="mr-2" size={20} /> View Code
            </button>
        </div>
    </div>
);

const SkillsSection = ({ skills }) => (
    <section id="skills" className="my-8">
        <div className="bg-gray-700 shadow-md rounded-lg p-4">
            <h1 className="text-3xl font-bold text-gray-300 text-center mb-4">SKILLS</h1>
        <PieChart skills={skills} />
        </div>
    </section>
);



const ContactSection = ({ data }) => (
    <section id="contact" className="my-8">
        <div className="bg-gray-700 shadow-md rounded-lg p-4">
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