import React from "react";
import "./About.css";
import { MDBIcon } from "mdb-react-ui-kit";
import profilePic from "../../images/profilePic.jpeg";
import resume from "../../images/resume.pdf";

const About = () => {
  return (
    <div className="about-section">
        <div className="title">
            <h1>About Me</h1>
          </div>
      <div className="about-container">

      <div className="image-section">
          <img src={profilePic} alt="Profile" />
        </div>
        <div className="content-section">
          
          <div className="content">
            <p>
              Hello, Welcome to my E-commerce website. So glad you are here.
              <br />
              <br />
              React.js developer having experience in architecting scalable and performant web applications. I bring expertise in React, Redux, TypeScript, and modern front-end ecosystems to create intuitive interfaces and robust client-side solutions.
              <br />
              Throughout my career, I've led diverse teams, implemented complex business logic, and optimized workflows to elevate user satisfaction. My passion lies in blending creativity and technology to build applications that make a difference. I'm open to collaborating with forward-thinking teams focused on innovation and growth.
             
              <br />
              <br />
              <b>Skills:</b>
              <br />
              #ReactJS #NextJS #TypeScript #JavaScript #Mongodb #ExpressJS #Nodejs #HTML #CSS #SCSS #git


            </p>

            <div className="contact-btn">
              <div>
                <a href={resume} download>
                  Download CV
                </a>
                <a href="/contact">Let's Talk</a>
              </div>

              <div className="social">
                <a href="https://www.linkedin.com/in/shivam-singh-539722175/" target="_blank" rel="noreferrer">
                  <MDBIcon
                    fab
                    className="fa-linkedin"
                    size="2x"
                    style={{ padding: "30px" }}
                  />
                </a>
                <a href="https://github.com/shivam22779" target="_blank" rel="noreferrer">
                  <MDBIcon
                    fab
                    className="fa-github"
                    size="2x"
                    style={{ padding: "30px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default About;
