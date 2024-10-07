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


function User() {
    const data = JSON.parse(localStorage.getItem('Data'));
    console.log('Data:', data);

    useEffect(() => {
        document.body.classList.add('bg-black', 'text-white');
    }, []);

    return (
        <div id="Home" className="min-h-screen flex flex-col bg-gray-900">
            {/* Top Navigation */}
            <nav className="ml-16 shadow-md bg-gray-800 text-white">
                <div className="flex items-center justify-between px-4 py-2">
                    <CiSearch size={50} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-gray-700 text-white px-2 py-1 h-4 border-none m-none"
                    />

                    <h2 className="text-xl font-semibold text-gray-400 ml-4">{data?.login}</h2>
                    <img
                        className="w-16 h-16 rounded-full border-2 border-gray-600 object-cover"
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
                     <NavLink href="#Home" icon={<IoHomeSharp />} /> </div>
                    <div className="flex flex-col items-center space-y-20">
                        <NavLink href="#Profile" icon={<FaUser />} />
                        <NavLink href="#projects" icon={<FaProjectDiagram />} />
                        <NavLink href="#skills" icon={<GiSkills />} />
                        <NavLink href="#contact" icon={<MdContactEmergency />} />
                    </div>
                    <NavLink href="/" icon={<BiLogOutCircle />} ariaLabel="Logout" />
                </nav>
                <div className="ml-20 flex-1 p-8 overflow-y-auto">
                    {/* Profile Section */}
                    <ProfileSection data={data} />

                    {/* Projects Section */}
                    <ProjectsSection projects={data?.projects_users || []} />

                    {/* Skills Section */}
                    <SkillsSection skills={data?.cursus_users[1]?.skills || []} />

                    {/* Contact Section */}
                    <ContactSection data={data} />
                </div>
            </div>
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
    <section id="Profile" className="my-8 bg-gray-800 shadow-md rounded-lg p-6 transition-transform transform hover:scale-105">
        <div className="bg-gray-700 rounded-lg p-4">
            <h2 className="text-xl font-semibold">{data.displayname}</h2>
            <p className="text-gray-300">{data.kind}</p>
            <LevelDisplay level={data.cursus_users[1].level} />
        </div>
        <CampusInfo campus={data.campus[0]} />
    </section>
);

const LevelDisplay = ({ level }) => (
    <div className="mt-4">
        <p className="text-gray-300 mb-2">Level: {level}</p>
        <div className="w-full bg-gray-600 rounded-full h-4">
            <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${(level % 1) * 100}%` }}
            />
        </div>
    </div>
);

const CampusInfo = ({ campus }) => (
    <div className="mt-4">
        Cursus <Si42 /> 
        <p className="text-gray-300">{campus.name}</p>
        <p className="text-gray-300">{campus.country}</p>
        <p className="text-gray-300">{campus.address}</p>
    </div>
);

const ProjectsSection = ({ projects }) => (
    <section id="projects" className="my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 10).map(project => (
                <ProjectCard key={project.project.id} project={project} />
            ))}
        </div>
    </section>
);

const ProjectCard = ({ project }) => (
    <div className="bg-gray-700 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
        <h2 className="text-xl font-semibold">
            <ImBookmarks /> {project.project.name}
        </h2>
        <p className="text-gray-300">{project.project.description}</p>
        <p className="text-gray-400">Final Mark: {project.final_mark}</p>
        <p className="text-gray-400">Marked At: {new Date(project.marked_at).toLocaleDateString()}</p>
    </div>
);

const SkillsSection = ({ skills }) => (
    <section id="skills" className="my-8">
        <PieChart skills={skills} />
    </section>
);

const ContactSection = ({ data }) => (
    <section id="contact" className="my-8">
        <div className="bg-gray-700 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold">{data.email}</h2>
            <p className="text-gray-300">Phone: {data.phone}</p>
            <p className="text-gray-300">Address: {data.address}</p>
        </div>
    </section>
);

export default User;