import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import './ReservationDetails.css'

const ReservationDetails = () => {
    const { reservationid } = useParams();
    const [reservation, setReservation] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState('');
    const [totalBill, setTotalBill] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReservationDetails = async () => {
            try {
                setTimeout(async () => {
                    const response = await fetch(`http://127.0.0.1:8000/api/reservation_details/${reservationid}/`);
                    const data = await response.json();

                    if (response.ok) {
                        setReservation(data.reservation);
                        setDishes(data.dishes);
                        calculateTotalBill(data.dishes);
                    } else {
                        setError(data.message || 'Error fetching reservation details');
                    }
                    setIsLoading(false);
                }, 2000);
            } catch (err) {
                console.error('Error fetching reservation details:', err);
                setError('An error occurred while fetching reservation details');
                setIsLoading(false);
            }
        };

        fetchReservationDetails();
    }, [reservationid]);

    const calculateTotalBill = (dishes) => {
        const total = dishes.reduce((sum, dish) => sum + dish.total_price, 0);
        setTotalBill(total);
    };

    return (
        <div className='detail-container'>
            {isLoading ? (
                <Loading />
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div>
                    <h2>Reservation Details</h2>
                    <p><strong>Reservation ID:</strong> {reservation.reservationid}</p>
                    <p><strong>Table:</strong> {reservation.tableid}</p>
                    <p><strong>Date:</strong> {reservation.date}</p>
                    <p><strong>Time Slot:</strong> {reservation.timeslot}</p>
                    <p><strong>Status:</strong> {reservation.status}</p>

                    <h3>Ordered Dishes</h3>
                    {dishes.length > 0 ? (
                        <ul>
                            {dishes.map(dish => (
                                <li key={dish.dishid}>
                                    {dish.name} ({dish.pric}) (x{dish.quantity}) - ${dish.total_price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No dishes ordered for this reservation.</p>
                    )}

                    <h3>Total Bill</h3>
                    <p><strong>${totalBill.toFixed(2)}</strong></p>
                </div>
            )}
        </div>
    );
};

export default ReservationDetails;
