import React from 'react';
import './Contact.css';
import  { useRef } from 'react';
import emailjs from 'emailjs-com';
import { MDBIcon } from 'mdb-react-ui-kit';
import {useAlert} from "react-alert"




const Contact = () => {
  const form = useRef(null);
  const alert = useAlert();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_d0wm59s', 'template_tz6rdcl', form.current, 'Vk5_aN4Af0fsjtmtW')
      .then((result) => {
         alert.success("Form submitted successfully");
      }, (error) => {
         alert.error(error.text);
      });
      e.target.reset();
  };

  return (
    <section id="contact">
      <h5>Get in touch</h5>
      <h2>Contact Me</h2>

      <div className="contact_container">
        <div className="contact_options">
          <article className="contact_option">
            {/* <AiOutlineMail className="contact_option-icon"/> */}
            <MDBIcon far icon="envelope" className="contact_option-icon" />
            
            <h4>Email</h4>
            <h6>shivamsingh201516@gamil.com</h6>
            <a href="mailto:shivamsingh201516@gmail.com" target="_blank" rel="noreferrer">Send a message</a>
          </article>
          <article className="contact_option">
            {/* <FaWhatsappSquare className="contact_option-icon"/> */}
            <MDBIcon fab icon="whatsapp" className="contact_option-icon"/>
            <h4>Whatsapp</h4>
            <h6>+918090642035</h6>
            <a href="https://api.whatsapp.com/send?phone=8090642035" target="_blank" rel="noreferrer">Send a message</a>
          </article>

        </div>
        {/* End of contact option */}
        <form ref={form} onSubmit={sendEmail} className="contactForm">
          <input type="text" name="name" placeholder='Your Full Name' required />
          <input type="email" name="email" placeholder='Your Email' required />
          <textarea rows="7" name="message" placeholder='Your Message' required ></textarea>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
    </section>
  )
}

export default Contact;
