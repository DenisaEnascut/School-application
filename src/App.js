import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Students from './Students';
import Login from './Login';
import Register from './Register';
import Clase from './Clase';
import Notes from './Notes';
import Professors from './Professors';
 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="navigation-bar">
            <Link to="/login" className="Login-link">Login</Link>
          </div>
        </header>
        <h1>Administrația Scolară</h1>
        <div className="description-container">
          <p> Bine ați venit, locul în care povestea performanței devine o aventură captivantă! </p>
          <p> Aici, fiecare clic deschide uși magice către resurse și experiențe care vă transformă visurile în realizări uimitoare. </p>
          <p> Imaginați un tărâm digital unde informațiile învățate se contopesc cu povestea dvs. personală de creștere și succes. </p>
          <p> Înconjurați-vă de alți căutători de excelență și împărtășiți-vă triumfurile într-un univers în care fiecare pas este un punct de cotitură.</p>
          <p> Fiecare curs și ghid este o filă în cartea dvs. de aventură personală, oferindu-vă instrumente pentru a depăși provocările și a cuceri vârfurile.  </p>
          <p>  Suntem aici pentru a vă fi ghizi într-o călătorie a performanței, unde fiecare obstacol întâlnit devine un pas către victorie.</p>
          <p> Vă invităm să faceți parte din povestea noastră de excelență și să creați propriul vostru capitol de succes.</p>
          <p> Prindeți curaj, îndrăzniți să visați și alăturați-vă nouă în această călătorie captivantă spre vârfuri neatinse! </p>
        </div>
        <Routes>
          <Route path="/students" element={<Students />} />
          <Route path="/clase" element={<Clase />} />
          <Route path="/notes" element={<Notes />} /> 
          <Route path="/professors" element={<Professors />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <div className="entity-container">
        <div className="entity">
          <div className="entity-description">
            <h2><Link to="/students">Studenți</Link></h2>
            <p>Explorați lumea elevilor, un teritoriu vibrant al descoperirilor și al realizărilor tinerilor minți. De la excelența academică la activități pline de pasiune, descoperiți povestea lor unică și plină de potențial</p>
          </div>

          <div className="entity-image elevi"></div>
        </div>
        <div className="entity">
          <div className="entity-description">
            <h2><Link to="/clase">Clase</Link></h2>
            <p>Adânciți-vă în lumea claselor, locuri unde se conturează prietenii și se construiesc amintiri durabile. Descoperiți diversitatea, comunitatea și oportunitățile care definesc experiența școlară în cadrul entității noastre de clase. Aici, fiecare clasă este un capitol în povestea noastră educativă colectivă.</p>
          </div>
          <div className="entity-image clase"></div>
        </div>
        <div className="entity">
          <div className="entity-description">
            <h2><Link to="/notes">Note</Link></h2>
            <p>Explorați universul cunoașterii și al evaluărilor prin intermediul entității noastre de note. De la realizări remarcabile la provocări și creștere personală, fiecare notă este o amprentă a efortului și a învățăturilor dobândite. Descoperiți povestea progresului vostru în lumea fascinantă a evaluărilor școlare.</p>
          </div>
          <div className="entity-image note"></div>
        </div>
        <div className="entity">
          <div className="entity-description">
             <h2><Link to="/professors">Profesori</Link></h2>
     <p>Descoperiți fascinanta lume a educației prin ochii profesorilor noștri dedicați. Cu pasiune pentru învățare și ghidare, acești mentori sunt aici pentru a modela mințile tinere și a inspira excelența academică. Explorați universul didactic și influențați viitorul alături de echipa noastră de profesori devotați.</p>
     </div>
         <div className="entity-image profesori"></div> </div>
      </div>
    </Router>
  );
}

export default App;
