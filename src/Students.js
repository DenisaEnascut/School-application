import React, { useState, useEffect } from 'react';
import './Students.css';

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/students');
        if (!response.ok) {
          throw new Error('Nu s-au putut obține datele elevilor.');
        }
        const data = await response.json();
        console.log('Data primtă de la server:', data); // Adaugă acest console log
        setStudents(data.students); 
      } catch (error) {
        console.error('Eroare la preluarea datelor elevilor:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="Students-container">
      <h2 className="Students-title">Listă de Studenți</h2>
      <ul className="Students-list">
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student.id} className="Students-item"> 
              {student.name} - Clasa: {student.class_id} 
            </li>
          ))
        ) : (
          <li className="Students-item">Nu există elevi în baza de date.</li>
        )}
      </ul>
    </div>
  );
}

export default Students;
