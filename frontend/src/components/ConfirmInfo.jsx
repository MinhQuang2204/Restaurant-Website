import React, { useState } from 'react';

const Confirm = ({ selectedTable, order }) => {
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Gửi thông tin xác nhận đặt bàn lên server
        const bookingDetails = {
            customer: customerInfo,
            table: selectedTable,
            order: order,
        };

        fetch('/api/confirm-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        })
            .then(res => res.json())
            .then(data => {
                alert('Đặt bàn thành công!');
            })
            .catch(err => console.error('Error confirming booking:', err));
    };

    return (
        <div>
            <h2>Xác Nhận Thông Tin Đặt Bàn</h2>
            <h3>Bàn {selectedTable.maban} - {selectedTable.soghe} ghế</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Họ tên:</label>
                    <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button type="submit">Xác Nhận Đặt Bàn</button>
                </div>
            </form>
        </div>
    );
};

export default Confirm;
