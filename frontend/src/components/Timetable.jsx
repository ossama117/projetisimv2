import React, { useState } from "react";
import "../style/Timtable.css";
import { emplois } from "../data";

function Timetable() {
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [namegroupe, setNamegroupe] = useState("");

  const handleFiliereChange = (event) => {
    setSelectedFiliere(event.target.value);
  };

  const handleGroupChange = (event) => {

    setNamegroupe(event.target.value.toUpperCase());
  };

  const filteredEmplois = emplois.filter((emploi) => {
    if (selectedFiliere && emploi.filiere !== selectedFiliere) {
      return false;
    }
    if (namegroupe && emploi.groupe.indexOf(namegroupe) === -1) {
      return false;
    }
    return true;
  });

  const FiliereValues = [...new Set(emplois.map((item) => item.filiere))];

  return (
    <div>
      <select onChange={handleFiliereChange} value={selectedFiliere}>
        <option value="">Toutes les Filieres</option>
        {FiliereValues.map((filiere) => (
          <option key={filiere} value={filiere}>
            {filiere}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Recherche par groupe"
        className="input-search"
        value={namegroupe}
        onChange={handleGroupChange}
      />
      <table id="customers">
        <thead>
          <tr>
            <th>Filiere</th>
            <th>Groupe</th>
            <th>Emploi URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmplois.map((emploi) => (
            <tr key={emploi.groupe}>
              <td>{emploi.filiere}</td>
              <td>{emploi.groupe}</td>
              <td>
                <a
                  href={emploi.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cliquez ici pour voir les horaires
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
