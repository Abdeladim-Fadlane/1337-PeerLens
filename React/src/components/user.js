import React, { useEffect, useState } from 'react';
import { IoShareSocialOutline, IoNotificationsCircleSharp } from "react-icons/io5";
import { FaSitemap } from "react-icons/fa"; // Use the correct icon

import { CiGrid42, CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { TbChartBubble } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import Footer from './Footer';
import { NavLink, ProfileSection, ProjectsSection, SkillsSection } from './Sections';
import ContactSection from './Contact';

import { FaRankingStar } from "react-icons/fa6";

function User() {
    const [userData, setData] = useState(null);
    const data = JSON.parse(localStorage.getItem('Data'));
    console.log(data);
    useEffect(() => {
        if (data) {
            setData(data);
        }
        document.body.classList.add('bg-black', 'text-white');
    }, []);

    return (
        <>
            {!userData ? (<h1>Loading...</h1>) : (
                <div id="Home" className="min-h-screen flex flex-col bg-black">
                    <nav className="ml-16 h-16 shadow-md bg-gray-900 text-gray">
                        <div className="flex items-center justify-between px-4 py-2">
                            <CiSearch size={40} className='text-gray-400 ml-4' />
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{ border: 'none' }}
                                className="bg-gray-900 h-3 text-gray-400 border-none focus:outline-none"
                            />
                            <IoNotificationsCircleSharp size={40} className='text-purple-300 mr-4 hover:text-purple-400 cursor-pointer' />
                            <h2 className="pr-10 text-xl font-semibold text-gray-400">{data?.login}</h2>
                            <img
                                className="w-10 h-10 rounded-full border-gray-600 object-cover"
                                src={data?.image?.link}
                                alt={data?.login}
                            />
                        </div>
                    </nav>
                    <div className="flex">
                        <nav className="fixed top-0 left-0 h-full w-20 shadow-md bg-gray-800 flex flex-col justify-between">
                            <div className="flex flex-col h-8 justify-between items-center">
                                <NavLink href="/user" icon={<CiGrid42 />} />
                                <NavLink href="#Home" icon={<RxAvatar />} />
                                <NavLink href="#projects" icon={<FaSitemap />} />
                                <NavLink href="#skills" icon={<TbChartBubble />} />
                                <NavLink href="#contact" icon={<IoShareSocialOutline />} />
                                <NavLink href="#achievement" icon={<FaRankingStar />} />
                            </div>
                            <NavLink href="/" icon={<BiLogOutCircle className='hover:text-red-600' />} ariaLabel="Logout" />
                        </nav>
                        <div className="ml-20 flex-1 p-2 overflow-y-auto">
                            <ProfileSection data={data} />
                            <ProjectsSection projects={data?.projects_users || []} />
                            <SkillsSection skills={data?.cursus_users[1]?.skills || []} achievements={data.achievements} />
                            <ContactSection data={data} />
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
}


export default User;
