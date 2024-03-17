import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Stagiaire() {
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081/stagiaire")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.user);
          console.log(name);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then(() => {
        setName([]);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {name.map((value, index) => (
        <div key={index}>
          <p>CEF:{value.CEF}</p>
          <p>Nom:{value.Nom}</p>
          <p>Prenom:{value.Nom_Arabe}</p>
        </div>
      ))}
    </div>
  );
}
