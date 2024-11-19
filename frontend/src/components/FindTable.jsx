import React, { useState } from 'react';
import axios from 'axios';
import './FindTable.css'

const FindTable = ({ setSelectedTable }) => {
    const [seats, setSeats] = useState('');
    const [date, setDate] = useState('');
    const [timeslot, setTimeslot] = useState('');
    const [tables, setTables] = useState([]); // Danh sách bàn trống
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFindTable = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/find_table/', {
                seats,
                date,
                timeslot,
            });

            setTables(response.data.available_tables);
        } catch (err) {
            setError(err.response?.data?.error || 'Error!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="find-table-container">
            <h2>Reservation</h2>
            <div className="form">
                <select
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    className="input"
                >
                    <option value="" disabled>
                        Select number of people
                    </option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="input"
                />
                <input
                    type="time"
                    value={timeslot}
                    onChange={(e) => setTimeslot(e.target.value)}
                    className="input"
                />
                <button onClick={handleFindTable} className="btn">
                    {loading ? 'Finding...' : 'Find a Table'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="table-list">
            {tables.map((table) => (
                <div key={table.tableid} className="table-card">
                {/* Thêm hình ảnh cho từng table */}
                    <img
                        src={(() => {
                            try {
                              return require(`../utils/img/${table.tableid}.jpg`);
                            } catch {
                              try {
                                return require(`../utils/img/${table.tableid}.png`);
                              } catch {
                                try {
                                  return require(`../utils/img/${table.tableid}.gif`);
                                } catch {
                                  return require(`../utils/img/default.jpg`); // Hình ảnh mặc định nếu không tìm thấy
                                }
                              }
                            }
                          })()} // Đường dẫn động tới ảnh
                        alt={`Table ${table.tableid}`}
                        className="table-image"
                    />
                    <h4>Table {table.tableid}</h4><br/>
                    <p>Seats: {table.seats}</p>
                    <button
                        onClick={() => setSelectedTable({ ...table, date, timeslot })}
                        className="btn select-btn"
                    >
                        Choose Table
                    </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FindTable;
