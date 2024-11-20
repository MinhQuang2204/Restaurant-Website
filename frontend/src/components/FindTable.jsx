import React, { useState } from 'react';
import axios from 'axios';
import './FindTable.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // 

const FindTable = ({ setSelectedTable }) => {
    const [seats, setSeats] = useState('');
    const [date, setDate] = useState('');
    const [timeslot, setTimeslot] = useState('');
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFindTable = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/find_table/', {
                seats,
                date,
                timeslot,
            });

            setTables(response.data.available_tables);
            toast("Please choose a table! ^_^");

        } catch (err) {
            toast.warning(err.response?.data?.error || 'Error!');
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
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
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
                <button onClick={handleFindTable} className="confirm-button">
                    {loading ? 'Finding...' : 'Find a Table'}
                </button>
            </div>
            <div className="table-list">
                {tables.map((table) => (
                    <div key={table.tableid} className="table-card">
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
                                            return require(`../utils/img/default.jpg`);
                                        }
                                    }
                                }
                            })()}
                            alt={`Table ${table.tableid}`}
                            className="table-image"
                        />
                        <h4>Table {table.tableid}</h4><br />
                        <p>Seats: {table.seats}</p>

                        <button class="btn-53" onClick={() => setSelectedTable({ ...table, date, timeslot })}
                        >
                            <div class="original">Choose Table</div>
                            <div class="letters">
                                <span>N</span>
                                <span>E</span>
                                <span>X </span>
                                <span>T</span>
                            </div>
                        </button>

                    </div>
                ))}
            </div>
            <ToastContainer position='top-center' autoClose={1000} closeOnClick={true} />
        </div>
    );
};

export default FindTable;
