import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ChangeN() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [newData, setNewData] = useState({
    Nom: "",
    Prenom: "",
    NTelelephone: "",
    Email: "",
    password: "",
  });
  const { CEF } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/stagiaire/${CEF}`)
      .then((res) => {
        setUserData(res.data);
        setNewData({
          Nom: res.data.Nom,
          Prenom: res.data.Prenom,
          NTelelephone: res.data.NTelelephone,
          Email: res.data.Email,
          password: res.data.password,
        });
      })
      .catch((err) => console.log(err));
  }, [CEF]);

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8081/updateUser/${CEF}`, newData)
      .then((res) => {
        console.log(res.data);
        navigate("/admin");
      })
      .catch((err) => console.log(err));
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Modifier User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="Nom"
            value={newData.Nom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Prenom:</label>
          <input
            type="text"
            name="Prenom"
            value={newData.Prenom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>NTelelephone:</label>
          <input
            type="text"
            name="NTelelephone"
            value={newData.NTelelephone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={newData.Email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={newData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
