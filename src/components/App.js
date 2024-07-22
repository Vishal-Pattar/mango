import React, { useState } from 'react';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const register = async () => {
        const response = await fetch('/.netlify/functions/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data);
    };

    const login = async () => {
        const response = await fetch('/.netlify/functions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.token) {
            setToken(data.token);
        }
        console.log(data);
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <div>
            <h1>Authentication</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default App;