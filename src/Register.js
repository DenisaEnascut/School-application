import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importați Link din React Router
import './Login.css'; // Importați fișierul CSS pentru stilizare

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    // Verificați dacă câmpurile sunt completate
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Toate câmpurile sunt obligatorii');
      return;
    }

    // Verificați dacă parolele coincid
    if (password !== confirmPassword) {
      setError('Parola și confirmarea parolei nu coincid');
      return;
    }

    // Implementați logica de înregistrare aici
    // Poți verifica aici dacă datele introduse sunt valide
    // Dacă nu sunt valide, setați mesajul de eroare utilizând setError
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Înregistrare</h2>
      <form className="login-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nume"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Prenume"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Adresa de email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Parola"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmă parola"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Înregistrare</button>
      </form>
      {error && <p className="login-error">{error}</p>}
      {/* Adăugați un link către pagina de autentificare */}
      <p>Ai deja un cont? <Link to="/login">Autentificați-vă aici</Link></p>
    </div>
  );
}

export default Register;
