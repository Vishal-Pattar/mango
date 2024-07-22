import React, { useState, useEffect } from 'react';

const App = () => {
    const [records, setRecords] = useState([]);
    const [newRecord, setNewRecord] = useState('');

    useEffect(() => {
        fetch('/.netlify/functions/getRecords')
            .then(response => response.json())
            .then(data => setRecords(data));
    }, []);

    const addRecord = () => {
        fetch('/.netlify/functions/createRecord', {
            method: 'POST',
            body: JSON.stringify({ name: newRecord }),
        })
        .then(response => response.json())
        .then(data => {
            setRecords([...records, { _id: data.id, name: newRecord }]);
            setNewRecord('');
        });
    };

    const deleteRecord = (id) => {
        fetch('/.netlify/functions/deleteRecord', {
            method: 'POST',
            body: JSON.stringify({ id }),
        })
        .then(() => setRecords(records.filter(record => record._id !== id)));
    };

    return (
        <div>
            <h1>Records</h1>
            <ul>
                {records.map(record => (
                    <li key={record._id}>
                        {record.name} <button onClick={() => deleteRecord(record._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newRecord}
                onChange={e => setNewRecord(e.target.value)}
            />
            <button onClick={addRecord}>Add</button>
        </div>
    );
};

export default App;