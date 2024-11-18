import React, { useState } from 'react';
import axios from 'axios';

const FindTable = ({ setSelectedTable }) => {
    const [soghe, setSoghe] = useState('');
    const [ngay, setNgay] = useState('');
    const [khunggio, setKhunggio] = useState('');
    const [tables, setTables] = useState([]); // Danh sách bàn trống
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFindTable = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/find_table/', {
                soghe,
                ngay,
                khunggio,
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
                        value={soghe}
                        onChange={(e) => setSoghe(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Ngày:
                    <input
                        type="date"
                        value={ngay}
                        onChange={(e) => setNgay(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <br />
                <label>
                    Khung giờ:
                    <input
                        type="time"
                        value={khunggio}
                        onChange={(e) => setKhunggio(e.target.value)}
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
                            <li key={table.maban}>
                                Bàn số {table.maban} - Số ghế: {table.soghe} - Tình trạng: {table.tinhtrang}
                                <button onClick={() => setSelectedTable(table)}>Chọn</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FindTable;
