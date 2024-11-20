import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchReservation.css'

const SearchReservation = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fullname, setFullname] = useState('');
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/search_reservation/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, phone, fullname })
        });

        if (response.ok) {
            const data = await response.json();
            setReservations(data.reservations);
            setError('');
        } else {
            const data = await response.json();
            setError(data.message || 'No reservations found');
            setReservations([]);
        }
    };

    return (
        <div className='search-container'>
            <h2>Search Reservations</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
            />
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.reservationid}>
                        <Link to={`/reservationdetails/${reservation.reservationid}`}>
                            Reservation ID: {reservation.reservationid} - {reservation.date} at {reservation.timeslot}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchReservation;
