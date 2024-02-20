// Notes.js

import React, { useState, useEffect } from 'react';
import './Notes.css'; // Importă stilurile specifice

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/note');
        const data = await response.json();
        setNotes(data.note);
      } catch (error) {
        console.error('Eroare la aducerea datelor de pe server:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Notes-container">
      <h2>Listă de Note</h2>
      <ul className="Notes-list">
        {notes.map((nota) => (
          <li key={nota.id} className="Notes-item">
            <p>Elev: {nota.id_elev}</p>
            <p>Profesor: {nota.id_profesor}</p>
            <p>Nota: {nota.valoare_nota}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
