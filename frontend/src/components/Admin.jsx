import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/Admin.css";

export default function Admin() {
  const [stagiaireData, setStagiaireData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [CEF, setCEF] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin")
      .then((res) => {
        if (res.data.valid) {
          console.log(res.data);
          setStagiaireData(res.data.user);
          setFilterData(res.data.user);
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
        setStagiaireData([]);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  const handleCheckboxChange = (index) => {
    const newData = [...filterdata]; // Operate on filterdata instead of stagiaireData
    newData[index].EtudiantActif = !newData[index].EtudiantActif;
    setFilterData(newData);

    axios
      .post("http://localhost:8081/updateEtudiantActif", {
        CEF: newData[index].CEF,
        EtudiantActif: newData[index].EtudiantActif,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchByCef = (e) => {
    setCEF(parseInt(e.target.value));
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (CEF === "" || isNaN(CEF)) {
      setFilterData(stagiaireData);
    } else {
      const data = stagiaireData.filter((value) => {
        const userCEF = value.CEF.toString();
        return userCEF.includes(CEF.toString());
      });
      setFilterData(data);
    }
  };

  return (
    <div>
      <div className="logout">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <input type="text" onChange={searchByCef} />
      <button onClick={handlesubmit}>search</button>

      <table id="customers">
        <thead>
          <tr>
            <th>CEF</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Groupe</th>
            <th>Password</th>
            <th>Etudiant actif</th>
            <th>Numero de telephone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterdata.map((user, index) => (
            <tr key={user.CEF}>
              <td>{user.CEF}</td>
              <td>{user.Nom}</td>
              <td>{user.Prenom}</td>
              <td>{user.Groupe}</td>
              <td>{user.password}</td>
              <td>
                <div className="toggle-switch">
                  <input
                    className="toggle-input"
                    id={`toggle-${index}`}
                    type="checkbox"
                    checked={user.EtudiantActif}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label
                    className="toggle-label"
                    htmlFor={`toggle-${index}`}
                  ></label>
                </div>
              </td>
              <td>{user.NTelelephone}</td>
              <td>{user.Email}</td>
              <td>
                <Link to={`/stagiaire/${user.CEF}`}>Modifier</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
