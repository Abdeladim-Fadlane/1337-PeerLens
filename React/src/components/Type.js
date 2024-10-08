import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Software Developer",
          "Web Developer",
            "DevOps Engineer",
            "MERN Stack Developer",
            "Machine Learning Engineer",
            "Competitive Programmer",
            "Open Source Contributor",
            "Tech Enthusiast",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;