import React from 'react';
import DemandeFormation from './demandeFormation/DemandeFormation';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './App.css';

function App() {
  return (
    <>
    <div className="Header">
      <Navbar variant="dark" bg ="custom-background" classname="Navbar">
        <Container>
          <Navbar.Brand href="#home">Miage Connection - Formation</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home"></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
    <div className="App">
        <DemandeFormation />
    </div>
    <div className="Footer">

    </div>
    </>
  );
}

export default App;
