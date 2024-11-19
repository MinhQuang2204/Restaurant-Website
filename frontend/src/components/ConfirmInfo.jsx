import React, { useState } from 'react';

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
            alert('Vui lòng điền đầy đủ thông tin!');
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
                    alert('Đặt bàn thành công!');
                    setOrder([]); // Xóa đơn hàng sau khi đặt bàn thành công
                } else {
                    alert('Có lỗi xảy ra, vui lòng thử lại!');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra, vui lòng thử lại!');
            });
    };

    return (
        <div>
            <h2>Xác Nhận Đặt Bàn</h2>

            {/* Form nhập thông tin khách hàng */}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email"
                />
            </div>
            <div>
                <label>Tên:</label>
                <input
                    type="text"
                    name="fullname"
                    value={customerInfo.fullname}
                    onChange={handleInputChange}
                    placeholder="Nhập tên"
                />
            </div>
            <div>
                <label>Số điện thoại:</label>
                <input
                    type="text"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                />
            </div>

            {/* Hiển thị thông tin bàn đã chọn */}
            <h3>Thông Tin Đặt Bàn</h3>
            <p>Bàn: {selectedTable.tableid} - {selectedTable.seats} ghế</p>
            <p>Date: {selectedTable.date} - Time: {selectedTable.timeslot} </p>

            {/* Hiển thị danh sách món ăn đã chọn */}
            <h3>Danh Sách Món Đã Chọn</h3>
            <ul>
                {order.map(item => (
                    <li key={item.dishid}>
                        {item.name} - {item.quantity} x {item.price} VND
                    </li>
                ))}
            </ul>

            {/* Nút xác nhận */}
            <button onClick={handleConfirm}>Xác Nhận</button>
        </div>
    );
};

export default ConfirmInfo;
