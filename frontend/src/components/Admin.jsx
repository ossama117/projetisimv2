import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [stagiaireData, setStagiaireData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin", { withCredentials: true })
      .then((res) => {
        setStagiaireData(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <ol>
        <li>Stagiaire Data</li>
        {stagiaireData.map((stagiaire) => (
          <li>
            {stagiaire.Nom} {stagiaire.Prenom}
          </li>
        ))}
      </ol>
    </div>
  );
}
