import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ReservationDetails = () => {
    const { reservationid } = useParams(); // Lấy reservationid từ URL
    const [reservation, setReservation] = useState(null);
    const [dishes, setDishes] = useState([]); // Lưu danh sách món ăn
    const [error, setError] = useState('');
    const [totalBill, setTotalBill] = useState(0); // Lưu tổng bill

    useEffect(() => {
        const fetchReservationDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/reservation_details/${reservationid}/`);
                const data = await response.json();

                if (response.ok) {
                    setReservation(data.reservation);
                    setDishes(data.dishes);
                    calculateTotalBill(data.dishes); // Tính tổng bill
                } else {
                    setError(data.message || 'Error fetching reservation details');
                }
            } catch (err) {
                console.error('Error fetching reservation details:', err);
                setError('An error occurred while fetching reservation details');
            }
        };

        fetchReservationDetails();
    }, [reservationid]);

    // Hàm tính tổng bill
    const calculateTotalBill = (dishes) => {
        const total = dishes.reduce((sum, dish) => sum + dish.total_price, 0);
        setTotalBill(total);
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {reservation ? (
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
                                    {dish.name} (x{dish.quantity}) - ${dish.total_price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No dishes ordered for this reservation.</p>
                    )}

                    <h3>Total Bill</h3>
                    <p><strong>${totalBill.toFixed(2)}</strong></p>
                </div>
            ) : (
                <p>Loading reservation details...</p>
            )}
        </div>
    );
};

export default ReservationDetails;
