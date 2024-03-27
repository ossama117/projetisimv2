import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "../style/Entreprise.css";

export default function Entreprise() {
  const form = useRef();

  const sendB = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_7pana0f", "template_050gk54", form.current, {
        publicKey: "1TQ1BZ2nLvbuBdmcH",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="p_form">
      <form ref={form} onSubmit={sendB}>
        <label>Intitulé:</label>
        <br />
        <input
          type="text"
          name="from_name"
          className="inputtext"
          placeholder="Intitulé de l'entreprise..."
        />
        <br />
        <label>Register de commerce:</label>
        <br />
        <input
          type="text"
          name="form_register"
          className="inputnumber"
          placeholder="Exemple : 123 456 ..."
          required
        />
        <br />
        <label>Numero de Telephone:</label>
        <br />
        <input
          type="text"
          name="form_number"
          className="inputnumber"
          placeholder="Exemple : 05 33 ..."
        />
        <br />
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="form_email"
          className="inputemail"
          placeholder="Email de l'entreprise isim@gmail.ma..."
          required
        />
        <br />
        <label>Message:</label>
        <br />
        <textarea
          name="message"
          placeholder="Les besion de l'entreprise 
          ..."
        />
        <br />
        <input type="submit" value="envoyer" className="inputsubmi" />
      </form>
    </div>
  );
}
 