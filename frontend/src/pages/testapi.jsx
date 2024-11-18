import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BanList = () => {
    const [ban, setBan] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/ban/')
            .then(response => setBan(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Danh sách bàn</h1>
            <ul>
                {ban.map(item => (
                    item.tinhtrang === 'Available' && (
                        <li key={item.maban}>
                            Bàn {item.maban} - {item.soghe} ghế
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
};

export default BanList;
