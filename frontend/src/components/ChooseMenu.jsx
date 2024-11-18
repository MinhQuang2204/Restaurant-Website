import React, { useState, useEffect } from 'react';

const ChooseMenu = ({ setSelectedMenu, selectedTable }) => {
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        // Lấy danh sách món ăn từ API
        fetch('http://127.0.0.1:8000/monan/') // Cập nhật API endpoint cho phù hợp
            .then(res => res.json())
            .then(data => setMenu(data))
            .catch(err => console.error('Error fetching menu:', err));
    }, []);

    const handleSelectMenuItem = (item) => {
        const existingItem = order.find(o => o.mamon === item.mamon);
        if (existingItem) {
            existingItem.soluong += 1;
            setOrder([...order]);
        } else {
            setOrder([...order, { ...item, soluong: 1 }]);
        }
    };

    return (
        <div>
            <h2>Chọn Món Ăn</h2>
            <h3>Bàn {selectedTable.maban} - {selectedTable.soghe} ghế</h3>
            <ul>
                {menu.map(item => (
                    <li key={item.mamon}>
                        {item.tenmon} - {item.gia} VND
                        <button onClick={() => handleSelectMenuItem(item)}>Chọn</button>
                    </li>
                ))}
            </ul>
            <h3>Danh Sách Món Chọn</h3>
            <ul>
                {order.map(item => (
                    <li key={item.mamon}>
                        {item.tenmon} - {item.soluong} x {item.gia} VND
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChooseMenu;
