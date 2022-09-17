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
              I am looking for an opportunity in MERN stack development field. Currently I have total 1.8 years of experience in mainframe and would love to switch my carrer in web development field. Dear recruiters if you have any vacancy in your company which suits my profile kindly contact me. My recent project is this website itself and many other projects are in my github profile.
              <br />
              <br />
              This website is created using redux toolkit for state management with React for frontend and express for backend with mongodb as it's database.
              <br />
              <br />
              <b>Skills:</b>
              <br />
              #React #Mongodb #ExpressJS #Nodejs #Bootstrap #HTML #CSS #SQL #git #API integration #Basic python


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
