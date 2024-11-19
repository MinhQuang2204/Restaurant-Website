import React, { useState, useEffect } from 'react';
import './ChooseMenu.css'

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
        // Truyền danh sách order lên component cha, bao gồm thông tin quantity
        const orderWithquantity = order.map(item => ({
            name: item.name,
            dishid: item.dishid,
            quantity: item.soluong,
            price: item.price,  // Bạn có thể gửi thêm giá nếu cần thiết
        }));

        setOrder(orderWithquantity);  // Truyền danh sách món đã chọn với thông tin quantity
    };

    return (
        <div className="menu-container">
            <h2>Menu Selection</h2>
            <h4>Table {selectedTable.tableid}</h4>
            <ul className="menu-list">
                {menu.map((item) => (
                    <li key={item.dishid} className="menu-item">
                        {item.name} - ${item.price}
                        <button
                            onClick={() => handleSelectMenuItem(item)}
                            className="btn choose-btn"
                        >
                            Choose
                        </button>
                    </li>
                ))}
            </ul>
            <div className="selected-menu">
                <h3>Selected Menu</h3>
                <ul>
                    {order.map((item) => (
                        <li key={item.dishid}>
                            {item.name} (x{item.soluong}) - ${item.price * item.soluong}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={handleConfirmOrder} className="button">
                <span>Confirm Selection</span>
            </button>
        </div>
    );
};

export default ChooseMenu;
