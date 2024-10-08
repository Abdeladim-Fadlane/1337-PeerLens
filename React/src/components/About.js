import React from "react";
import Type from "./Type";
import { Si42 } from "react-icons/si";
const AboutSection = ({data}) => (
    <div className="flex flex-wrap">
        <div className="w-full md:w-2/3 p-4">
            <h1 className="text-4xl font-bold">
                I'M <strong className=" text-purple-100">Fadlane Abdeladim</strong>
            </h1>
            <br />
            <div className="text-2xl font-semibold text-purple-300">
                <Type />
              </div>
            <br />
            <p className="text-gray-300">
                I am a passionate software developer with over two years of experience specializing in
                <strong className=" text-purple-100"> software engineering & web development</strong>
                <br />
                <br />
                During my academic journey, I utilized languages such as 
                <i>
                    <strong className=" text-purple-100"> C++, JavaScript, and Python.</strong>
                </i>
                <br />
                <br />
                My fields of interest are building new &nbsp;
                <i>
                    <strong className=" text-purple-100">Web Technologies and Products</strong> and
                    also in areas related to <strong className=" text-purple-100">DevOps engineering.</strong>
                </i>
                <br />
                <br />
            </p>
        </div>
        <div className="w-full md:w-1/3 p-4 flex justify-center items-center">
            <img src="https://media.licdn.com/dms/image/v2/D4E03AQEvtvttLb59Sw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723573894948?e=1733961600&v=beta&t=FQ6q1S4T6bQChl0uhTcVxq6AITtwfPIDVtc3SfmKZ0U" className="w-40 h-40 rounded-full border-2 border-gray-600 object-cover" alt="afadlane" />
        </div>
    </div>
);

export default AboutSection;
