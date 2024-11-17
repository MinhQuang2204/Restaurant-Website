import React from "react";
import './Reservation.css';

const Reservation = () => {
    return (
        <div className="reservation-container">
            <h1 className="reservation-title">Reservation</h1>

            <div className="reservation-steps">
                <span className="step active">1. Find a Table</span>
                <span className="step">2. Choose your menus</span>
                <span className="step">3. Your Details</span>
            </div>

            <div className="find-table-form">
                <select className="dropdown">
                    <option>2 people</option>
                    <option>3 people</option>
                    <option>4 people</option>
                </select>
                <input type="date" className="dropdown" />
                <input type="time" className="dropdown" />
                <button className="find-table-btn">Find a Table</button>
            </div>

            <div className="table-list">
                <div className="table-item">
                    <img src="https://via.placeholder.com/150" alt="Table 1" className="table-image" />
                    <div className="table-info">
                        <p>Table 1</p>
                        <p>Price 1</p>
                    </div>
                    <div className="table-time">
                        <p>Time: 6:00</p>
                        <button className="dropdown">▼</button>
                    </div>
                </div>

                <div className="table-item">
                    <img src="https://via.placeholder.com/150" alt="Table 2" className="table-image" />
                    <div className="table-info">
                        <p>Table 2</p>
                        <p>Price 2</p>
                    </div>
                    <div className="table-time">
                        <p>Time: 6:00</p>
                        <button className="dropdown">▼</button>
                    </div>
                </div>

                <div className="table-item">
                    <img src="https://via.placeholder.com/150" alt="Table 3" className="table-image" />
                    <div className="table-info">
                        <p>Table 3</p>
                        <p>Price 3</p>
                    </div>
                    <div className="table-time">
                        <p>Time: 6:00</p>
                        <button className="dropdown">▼</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reservation;
