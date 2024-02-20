// Professors.js

import React, { useState, useEffect } from 'react';
import './Professors.css'; // Importă stilurile specifice

function Professors() {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profesori');
        const data = await response.json();
        setProfessors(data.profesori);
      } catch (error) {
        console.error('Eroare la aducerea datelor de pe server:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Professors-container">
      <h2>Listă de Profesori</h2>
      <ul className="Professors-list">
        {professors.map((profesor) => (
          <li key={profesor.id} className="Professors-item">
            Nume Profesor: {profesor.nume}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Professors;
