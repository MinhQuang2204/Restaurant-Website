import React, { useState } from 'react';
import './ConfirmInfo.css'

const ConfirmInfo = ({ selectedTable, order, setOrder }) => {
    // State để lưu thông tin khách hàng
    const [customerInfo, setCustomerInfo] = useState({
        email: '',
        fullname: '',
        phone: ''
    });

    // Hàm để cập nhật thông tin khách hàng
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Hàm xác nhận và gửi thông tin đặt bàn và món ăn
    const handleConfirm = () => {
        // Kiểm tra xem thông tin khách hàng đã đầy đủ chưa
        if (!customerInfo.email || !customerInfo.fullname || !customerInfo.phone) {
            alert('Please Fill In All The Required Information!');
            return;
        }

        // Gửi thông tin đến API để tạo đặt bàn và món ăn (bạn cần tạo một API trên backend Django)
        const reservationData = {
            email: customerInfo.email,
            fullname: customerInfo.fullname,
            phone: customerInfo.phone,
            tableid: selectedTable.tableid,
            date: selectedTable.date,
            timeslot: selectedTable.timeslot,
            order: order
        };

        // Gửi dữ liệu lên server (API tạo đặt bàn và lưu món ăn)
        fetch('http://127.0.0.1:8000/api/reservation/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Reservation Accepted!');
                    setOrder([]); // Xóa đơn hàng sau khi đặt bàn thành công
                } else {
                    alert('Error, Please Try Again!');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Unidentified Problems Occured!');
            });
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
                            {item.name} (x{item.soluong}) - ${item.price * item.soluong}
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
