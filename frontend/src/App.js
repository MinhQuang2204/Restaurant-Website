import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reserve from './pages/Reserve';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import SearchReservation from './components/SearchReservation';
import ReservationDetails from './components/ReservationDetails';

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/search" element={<SearchReservation />} />
        <Route path="/reservationdetails/:reservationid" element={<ReservationDetails />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
