import React, { useState } from 'react';
import axios from 'axios';

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
        <div style={{ padding: '20px' }}>
            <h2>Find Your Table</h2>

            <div style={{ marginBottom: '20px' }}>
                <label>
                    Number of people:
                    <input
                        type="number"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Time:
                    <input
                        type="time"
                        value={timeslot}
                        onChange={(e) => setTimeslot(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>

            {/* Nút tìm bàn */}
            <button onClick={handleFindTable} disabled={loading}>
                {loading ? 'Finding...' : 'Find'}
            </button>

            {/* Hiển thị lỗi */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Hiển thị danh sách bàn */}
            {tables.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Available Tables:</h3>
                    <ul>
                        {tables.map((table) => (
                            <li key={table.tableid}>
                                Table No. {table.tableid} - Seats: {table.seats} - Status: {table.status}
                                <button onClick={() => setSelectedTable({
                                    ...table, date, timeslot
                                })}>Choose</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FindTable;
