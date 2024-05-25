import "./Login.css";
import React, { useState } from 'react';
import { useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Perform authentication (replace this with your authentication logic)
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            // Check if authentication was successful
            if (response.ok) {
                console.log("response OK")
                // Save user session/token (e.g., using localStorage)
                localStorage.setItem('token', data.token);

                // Update user state in parent component
                // onLogin(data.user);
                navigate('/');
            } else {
                setError(data.message); // Display error message
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login.');
        }
    };

    return (
        <div className={"container"}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
