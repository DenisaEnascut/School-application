// Clase.js

import React, { useState, useEffect } from 'react';
import './Clase.css'; // Importă stilurile specifice

function Clase() {
  const [clase, setClase] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/clase'); // Modifică portul în funcție de portul pe care rulează serverul tău Flask
        const data = await response.json();
        setClase(data.clase);
      } catch (error) {
        console.error('Eroare la aducerea datelor de pe server:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Clase-container">
      <h2>Listă de Clase</h2>
      <ul className="Clase-list">
        {clase.map((clasa) => (
          <li key={clasa.id} className="Clase-item">
            {clasa.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clase;
