
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const ContactSection = ({ data }) => (
    <section id="contact" className="mb-20 h-full ">
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


export default ContactSection;