import React, { useState ,useEffect} from 'react';
import { IoShareSocialOutline, IoNotificationsCircleSharp } from "react-icons/io5";
import { FaSitemap } from "react-icons/fa";
import { CiGrid42, CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { TbChartBubble } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import Footer from './Footer';
import { FaUserAstronaut} from 'react-icons/fa';
import Preloader from './Preloader';
import { ProfileSection, ProjectsSection, SkillsSection } from './Sections';
import ContactSection from './Contact';
import { FaRankingStar } from "react-icons/fa6";
import Promo from './promo';

const User = () => {
    console.log(localStorage.getItem('accessToken'));
    const [showPromo, setShowPromo] = useState(false); 
    const data = JSON.parse(localStorage.getItem('Data')) || null;
    console.log(data);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
        setLoading(false);
        }
        , 2000);
        return () => clearTimeout(timer);
    }, []);
  
    const handleOnClick = (event, isPromoLink) => {
        setShowPromo(false);
        setShowPromo(isPromoLink);
        const mainClass = document.getElementsByClassName('main-class');
        for (let i = 0; i < mainClass.length; i++) {
            mainClass[i].style.display = 'block';
        }
    };
    const handlePromoClose = () => {
        setShowPromo(true);
        const mainClass = document.getElementsByClassName('main-class');
        for (let i = 0; i < mainClass.length; i++) {
            mainClass[i].style.display = 'none';
        }

    };

    const NavLink = ({ href, icon, ariaLabel, isPromoLink }) => (
        <a 
            href={href} 
            onClick={(event) => handleOnClick(event, isPromoLink)} 
            aria-label={ariaLabel} 
            className={`${href} py-8 text-gray-400 rounded transition-colors duration-300 flex items-center justify-center hover:text-purple-400`}
        >
            {React.cloneElement(icon, { size: 30 })}
        </a>
    );

    return (
        <>
            {!data ? (<h1>Loading...</h1>) : (
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
                                <NavLink href="/user" icon={<CiGrid42 />} isPromoLink={false} />
                                <NavLink href="#Home" icon={<RxAvatar />} isPromoLink={false} />
                                <NavLink href="#projects" icon={<FaSitemap />} isPromoLink={false} />
                                <NavLink href="#skills" icon={<TbChartBubble />} isPromoLink={false} />
                                <NavLink href="#contact" icon={<IoShareSocialOutline />} isPromoLink={false} />
                                <a 
                                    href="#promo"
                                    onClick={(event) => handlePromoClose()} // Close the promo
                                    // aria-label={ariaLabel} 
                                    className={" py-8 text-gray-400 rounded transition-colors duration-300 flex items-center justify-center hover:text-purple-400"}
                                >
                                    <FaRankingStar size={30} />
                                </a>
                            </div>
                            <NavLink href="/" icon={<BiLogOutCircle className='hover:text-red-600' />} ariaLabel="Logout" isPromoLink={false} />
                        </nav>
                        <div className="ml-20 flex-1 p-2 overflow-y-auto">
                            <div className='main-class'>
                                {loading ? (
                                    <Preloader />
                                ) : ( 
                                    <>
                                    <ProfileSection data={data} />
                                    <ProjectsSection projects={data?.projects_users || []} />
                                    <SkillsSection skills={data?.cursus_users[1]?.skills || []} achievements={data.achievements} />
                                    <ContactSection data={data} /> 
                                    </>
                                )}

                            </div>
                                <Promo status={showPromo}/>
                        </div>
                    </div>
                    <Footer />
                    <div className="fixed bottom-20 right-10 cursor-pointer bg-cyan-50 text-lg font-bold rounded-full w-12 h-12 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-cyan-500">
                        <FaUserAstronaut size={40} /> 
                    </div>

                </div>
            )}
        </>
    );
}

export default User;
