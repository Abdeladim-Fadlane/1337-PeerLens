import React from 'react';
import { ImBookmarks } from "react-icons/im";
import PieChart from './PieChart';

import About from './About';

export const NavLink = ({ href, icon, ariaLabel }) => (
    <a 
        href={href} 
        aria-label={ariaLabel} 
        className="py-8 text-gray-400 rounded transition-colors duration-300 flex items-center justify-center  hover:text-purple-400"
    >
        {React.cloneElement(icon, { size: 30 })}
    </a>
);


export const ProfileSection = ({ data }) => (
    <section id="Profile" className=" ">
        <div className="bg-[url('https://cdn.leonardo.ai/users/45b61a2e-8e49-4d02-9eff-77c96e424d23/generations/5719efd0-02ee-4e51-8ecf-47a50313be1e/Leonardo_Phoenix_Create_a_futuristic_hightech_background_for_a_0.jpg')]  bg-cover bg-center shadow-md rounded-lg p-4 flex justify-center items-center ">
            <About data={data} />
        </div>
    </section>
);


export const ProjectsSection = ({ projects }) => (
    <section id="projects" className="my-8">
        <div className=" last:bg-[url('https://cdn.leonardo.ai/users/45b61a2e-8e49-4d02-9eff-77c96e424d23/generations/5719efd0-02ee-4e51-8ecf-47a50313be1e/Leonardo_Phoenix_Create_a_futuristic_hightech_background_for_a_1.jpg')] bg-cover bg-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0,6).map(project => (
                <ProjectCard key={project.project.id} project={project} />
            ))}
        </div>

    </section>
);

const ProjectCard = ({ project }) => (
    <div className="bg-opacity-80 bg-gray-700 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
        <div className="flex items-center mb-2">
            <ImBookmarks className="text-gray-100 mr-2" />
            <h2 className="text-xl font-semibold text-purple-500 font-mono">{project.project.name}</h2>
        </div>
            <p className="text-gray-300">Score: {project.final_mark}</p>
            <p className="text-gray-300">Status: {project.status}</p>
            <p className="text-gray-300">Marked At: {project.marked_at}</p>
    </div>
);

const AchievementSections = ({ achievements }) => (
    <section id="projects" className="my-8">
        <div className=" last:bg-[url('https://cdn.leonardo.ai/users/45b61a2e-8e49-4d02-9eff-77c96e424d23/generations/5719efd0-02ee-4e51-8ecf-47a50313be1e/Leonardo_Phoenix_Create_a_futuristic_hightech_background_for_a_1.jpg')] bg-cover bg-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.slice(0,6).map(achievement => (
                <AchievementsCard key={achievement.id} achievement={achievement} />
            ))}

        </div>
    </section>
);

const AchievementsCard = ({ achievement }) => (
    <div className="bg-opacity-80 bg-gray-700 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
        <div className="flex items-center mb-2">
            <ImBookmarks className="text-gray-100 mr-2" />
            <h2 className="text-xl font-semibold text-purple-500 font-mono">{achievement.name}</h2>
        </div>
            <p className="text-gray-300">name: {achievement.name}</p>
            <img src={`https://cdn.intra.42.fr/${achievement.image.replace("/uploads","")}`} alt="Achievement"  className="w-20 h-20 rounded-full border-2 border-gray-600 object-cover" />
            <p className="text-gray-300">description: {achievement.description}</p>
        
    </div>
);

export const SkillsSection = ({ skills ,achievements}) => (
    <section id="skills" className="my-8">
        <div className="flex flex-row bg-gray-500 bg-cover  shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <AchievementSections achievements = {achievements}/>
            </div>
            {/* <PieChart skills={skills} /> */}
        </div>
    </section>
);
