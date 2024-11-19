import React, { useState } from 'react';
import ChooseMenu from '../components/ChooseMenu';
import Confirm from '../components/ConfirmInfo';
import FindTable from '../components/FindTable';

const Reservation = () => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [order, setOrder] = useState([]);

    return (
        <div>
            {!selectedTable ? (
                <FindTable setSelectedTable={setSelectedTable} />
            ) : !order.length ? (
                <ChooseMenu setOrder={setOrder} selectedTable={selectedTable} />
            ) : (
                <Confirm selectedTable={selectedTable} order={order} />
            )}
        </div>
    );
};

export default Reservation;
