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
            setError(err.response?.data?.error || 'Có lỗi xảy ra!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Tìm bàn trống</h2>

            <div style={{ marginBottom: '20px' }}>
                <label>
                    Số ghế:
                    <input
                        type="number"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Ngày:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Khung giờ:
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
                {loading ? 'Đang tìm...' : 'Tìm bàn'}
            </button>

            {/* Hiển thị lỗi */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Hiển thị danh sách bàn */}
            {tables.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Danh sách bàn trống:</h3>
                    <ul>
                        {tables.map((table) => (
                            <li key={table.tableid}>
                                Bàn số {table.tableid} - Số ghế: {table.seats} - Tình trạng: {table.status}
                                <button onClick={() => setSelectedTable({
                                    ...table, date, timeslot
                                })}>Chọn</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FindTable;
