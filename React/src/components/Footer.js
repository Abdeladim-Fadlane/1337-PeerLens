import React from "react";
import {
  AiFillGithub,
  AiOutlineMail,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="fixed bottom-0 ml-20 left-0 w-full bg-gray-900 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="px-10 text-center ">
          <h3>Developed by <span className="text-purple-400">afadlane</span></h3>
        </div>
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3>Copyright © <span className="text-purple-400">{year}</span></h3>
        </div>
        <div className="flex justify-center md:justify-end">
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://github.com/Abdeladim-Fadlane"
                className="text-white hover:text-purple-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub size={30}/>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/abdeladim-fadlane/"
                className="text-white hover:text-purple-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={30}/>
              </a>
            </li>
            <li>
              <a
                href="mailto:abdofadlane128@gmail.com"
                className="text-white hover:text-purple-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiOutlineMail size={30}/>
              </a>
            </li>
            <li>
              <a
                href="https://leetcode.com/u/afadlane/"
                className="text-white hover:text-purple-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SiLeetcode size={30}/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
