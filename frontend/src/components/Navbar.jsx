import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";
import logo from "../assets/logo.png";
import { FaTimes, FaBars } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="respo">
        <Link to="/" className="logo">
          <img src={logo} alt="" width="70px" />
          <h1 className="isim">ISIM Marrakech</h1>
        </Link>
        <div className="toggle-btn" onClick={handleToggle}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
      <div className={`nav-item ${isOpen ? "open" : ""}`}>
        <Link to="/" className="a">
          Accueil
        </Link>
        <Link to="/presentation" className="a">
          Présentation
        </Link>
        <Link to="/timetable" className="a">
          Emploi du temps
        </Link>
        <Link to="/login" className="a">
          Stagiaire
        </Link>
        <Link to="/entreprise" className="a">
          Espace des Entreprises
        </Link>
        <Link to="/contact" className="a">
          Contact
        </Link>
      </div>
    </div>
  );
}
