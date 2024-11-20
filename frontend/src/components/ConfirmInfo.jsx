import React, { useState } from 'react';
import './ConfirmInfo.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmInfo = ({ selectedTable, order }) => {
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        fullname: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirm = async () => {
        if (!customerInfo.email || !customerInfo.fullname || !customerInfo.phone) {
            toast.warning('Please Fill In All The Required Information!');
            return;
        }

        setLoading(true);

        const reservationData = {
            customer: customerInfo,
            reservation: {
                tableid: selectedTable.tableid,
                date: selectedTable.date,
                timeslot: selectedTable.timeslot
            },
            dishes: order.map(item => ({
                dishid: item.dishid,
                quantity: item.quantity,
            }))
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/create_reservation/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || 'Error, Please Try Again!');
            }

            const data = await response.json();

            toast.success(data.message);
            toast.info(`Your reservation ID is: ${data.reservationid}`);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="confirm-info-container">
            <h2>Reservation Details</h2>
            <div className="reservation-table">
                <p>Table ID: {selectedTable.tableid}</p>
                <p>Date: {selectedTable.date}</p>
                <p>Time Slot: {selectedTable.timeslot}</p>
                <h3>Selected Menu</h3>
                <ul>
                    {order.map((item) => (
                        <li key={item.dishid}>
                            {item.name} (x{item.quantity}) - ${item.price * item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="customer-info">
                <h3>Customer Information</h3>
                <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="input"
                />
                <input
                    type="text"
                    name="fullname"
                    value={customerInfo.fullname}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="input"
                />
                <input
                    type="text"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="input"
                />
            </div>
            <button onClick={handleConfirm} className="confirm-button">
                <span>
                    {loading ? 'Loading...' : 'Confirm'}</span>
            </button>
            <ToastContainer position='top-center' autoClose={3000} />
        </div>
    );
};

export default ConfirmInfo;
