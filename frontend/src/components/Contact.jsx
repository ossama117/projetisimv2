import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Iframe from 'react-iframe'
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import "../style/Contact.css"
export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
 

    emailjs
      .sendForm('service_7pana0f', 'template_zmiux85', form.current, {
        publicKey: '1TQ1BZ2nLvbuBdmcH',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div>
      <main>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="from_name"
            className="inputtext"
            placeholder="Your Name..."
          />
          <br />
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="form_email"
            className="inputemail"
            placeholder="Your Email like isim@ofppt-edu.ma..."
          />
          <br />
          <label>Message:</label>
          <br />
          <textarea name="message" placeholder="Your Message..." />
          <br />
          <input type="submit" value="Send" className="inputsubmit" />
        </form>
        <div>
          <div class="outer">
            <div class="inner">
              <p className="sinner">Courriel</p>{" "}
              <p className="svinner">
                <MdOutlineEmail className="b-Email" />
                isim@ofppt.ma
              </p>
            </div>
            <div className="Ncontact">
              <p className="sNcontact">Numero de contact</p>
              <p className="svNcontact">
                <BsTelephone className="tele" />
                +212 (05) 24 34 40 93
              </p>
            </div>
          </div>
          <Iframe
            url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.4189730489384!2d-8.053581623870048!3d31.622377042094282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafe97154fb17e3%3A0x6c6b237e6c7034b9!2sIsi%20Marrakesh!5e0!3m2!1sen!2sma!4v1709636322675!5m2!1sen!2sma"
            width="606px"
            height="300px"
            id=""
            className=""
            display="block"
            position="relative"
          />
        </div>
      </main>
    </div>
  );
};