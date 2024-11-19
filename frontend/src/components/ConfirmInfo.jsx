import React, { useState } from 'react';
import './ConfirmInfo.css'

const ConfirmInfo = ({ selectedTable, order }) => {
    // State để lưu thông tin khách hàng
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        fullname: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);  // Để xử lý trạng thái đang gửi dữ liệu
    const [error, setError] = useState(''); // Để hiển thị lỗi nếu có

    // Hàm để cập nhật thông tin khách hàng
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Hàm xác nhận và gửi thông tin đặt bàn và món ăn
    const handleConfirm = async () => {
        if (!customerInfo.email || !customerInfo.fullname || !customerInfo.phone) {
            alert('Please Fill In All The Required Information!');
            return;
        }

        setLoading(true);
        setError('');

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

            // Kiểm tra trạng thái HTTP
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || 'Error, Please Try Again!');
            }

            const data = await response.json();

            // Xử lý thành công
            alert(data.message);
            alert(`Your reservation ID is: ${data.reservationid}`);  // Thông báo chứa ID của reservation
        } catch (error) {
            // Hiển thị lỗi
            console.error('Error:', error);
            setError(error.message);
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
            <button onClick={handleConfirm} className="btn">
                Confirm
            </button>
        </div>
    );
};

export default ConfirmInfo;
