import React, { useState, useEffect } from 'react';

const ChooseMenu = ({ setOrder, selectedTable }) => {
    const [menu, setMenu] = useState([]);
    const [order, setLocalOrder] = useState([]); // Sử dụng state nội bộ để lưu danh sách món

    // Lấy danh sách menu từ API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/dish/')
            .then(res => res.json())
            .then(data => setMenu(data))
            .catch(err => console.error('Error fetching menu:', err));
    }, []);

    // Hàm thêm món vào order
    const handleSelectMenuItem = (item) => {
        const existingItem = order.find(o => o.dishid === item.dishid);
        if (existingItem) {
            // Nếu món đã có trong danh sách, tăng số lượng
            setLocalOrder(order.map(o =>
                o.dishid === item.dishid ? { ...o, soluong: o.soluong + 1 } : o
            ));
        } else {
            // Nếu món chưa có, thêm mới vào danh sách
            setLocalOrder([...order, { ...item, soluong: 1 }]);
        }
    };

    // Hàm xác nhận danh sách món ăn đã chọn
    const handleConfirmOrder = () => {
        if (order.length === 0) {
            alert("You Haven't Choose Any Meals!");
            return;
        }
        // Truyền danh sách order lên component cha
        setOrder(order);
    };

    return (
        <div>
            <h2>Choose Your Menu</h2>
            <h3>Table {selectedTable.tableid} - {selectedTable.seats} Seats</h3>
            {/* Hiển thị danh sách menu */}
            <ul>
                {menu.map(item => (
                    <li key={item.dishid}>
                        {item.name} - {item.price} USD
                        <button onClick={() => handleSelectMenuItem(item)}>Choose</button>
                    </li>
                ))}
            </ul>
            <h3>Meals List</h3>
            {/* Hiển thị danh sách món đã chọn */}
            <ul>
                {order.map(item => (
                    <li key={item.dishid}>
                        {item.name} - {item.soluong} x {item.price} USD
                    </li>
                ))}
            </ul>
            <button onClick={handleConfirmOrder}>Confirm</button>
        </div>
    );
};

export default ChooseMenu;
