import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Contact } from "./components/Contact";
import Timetable from "./components/Timetable";

import Presentation from "./components/Presentation";
import Services from "./components/Services";
import Stagiaire from "./components/Stagiaire";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Admin from "./components/Admin";
import ChangeN from "./components/ChangeN";
import Entreprise from "./components/Entreprise";

function App() {
  return (
    <div>
      <nav>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/services" element={<Services />} />
            <Route path="/entreprise" element={<Entreprise />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/stagiaire" element={<Stagiaire />} />
            <Route path="/stagiaire/:CEF" element={<ChangeN />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </nav>
    </div>
  );
}

export default App;
