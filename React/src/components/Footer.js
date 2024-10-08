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
    <div className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3>Designed and Developed by afadlane</h3>
        </div>
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3>Copyright © {year}</h3>
        </div>
        <div className="flex justify-center md:justify-end">
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://github.com/Abdeladim-Fadlane"
                className="text-white hover:text-gray-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub size={40}/>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/abdeladim-fadlane/"
                className="text-white hover:text-gray-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={40}/>
              </a>
            </li>
            <li>
              <a
                href="mailto:abdofadlane128@gmail.com"
                className="text-white hover:text-gray-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiOutlineMail size={40}/>
              </a>
            </li>
            <li>
              <a
                href="https://leetcode.com/u/afadlane/"
                className="text-white hover:text-gray-400"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SiLeetcode size={40}/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
