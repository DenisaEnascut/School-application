// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importați Link din React Router
import './Login.css'; // Importați fișierul CSS pentru stilizare

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const isStudentEmail = email.endsWith('@student');
    const isProfessorEmail = email.endsWith('@profesor');

    if (!isStudentEmail && !isProfessorEmail) {
      setError('Email-ul trebuie să se termine cu "@student" sau "@profesor"');
      return;
    }

    if (!isStudentEmail && !isProfessorEmail) {
      setError('Email-ul trebuie să se termine cu "@student" sau "@profesor"');
      return;
    } 
   if (password !== 'password') {
      setError('Parola este incorectă');
      return;
    }

  
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Autentificare</h2>
      <form className="login-form" onSubmit={handleLogin}>
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
        <button type="submit">Autentificare</button>
      </form>
      {error && <p className="login-error">{error}</p>}
      {/* Adăugați un link către pagina de autentificare */}
      <p>Nu aveți un cont? <Link to="/register">Înregistrați-vă aici</Link></p>
    </div>
  );
}

export default Login;
