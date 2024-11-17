import React from 'react';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Small_Logo from './utils/img/Logo.png';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reserve from './pages/Reserve';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div>
      <Navbar style={{ backgroundColor: '#F3E1C5' }} expand={false} variant="light" className="p-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={Small_Logo}
              alt="Restaurant Logo"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <h1 className='title'>Welcome to our Restaurant</h1>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/about" className="text-uppercase">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/menu" className="text-uppercase">
                Menus
              </Nav.Link>
              <Nav.Link as={Link} to="/reserve" className="text-uppercase">
                Reserve
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-uppercase">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <header className="header_tab_button">
          <nav className="nav">
              <a href="/about">ABOUT US</a>
              <a href="/menu">MENUS</a>
              <a href="/reserve">RESERVE</a>
              <a href="/contact">CONTACT</a>
          </nav>
      </header>
      </Navbar>

      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer className="bg-body-tertiary">
        <p className="pt-2 m-0 text-center">©2024 University of Technology and Engineering</p>
        <p className="p-2 m-0 text-center">Created by Tran Minh Quang & Nguyen Duc Tin</p>
      </footer>
    </div>
  );
}

export default App;
