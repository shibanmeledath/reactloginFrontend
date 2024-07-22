import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const LOG_URL = '/login';

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home'); // Redirect to home if token exists
        }
    }, [navigate]);
    
   useEffect(()=>{
    if(successMessage||errorMessage){
        const timer=setTimeout(()=>{
            setSuccessMessage('')
            setErrorMessage('')
        },1000)
    return ()=>clearTimeout(timer)
    }
   }, [successMessage, errorMessage])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOG_URL, {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username); 
            setSuccessMessage('Login successful');
            setShowMessage(true);
            setTimeout(() => {
              
                navigate('/home', { state: { username } });
            }, 1000);
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid login credentials');
            setShowMessage(true);

            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className='login'>
            <h2>Login</h2>
            {showMessage && (
                <div className={`message ${successMessage ? 'success' : 'error'}`}>
                    {successMessage ? (
                        <>
                            <span className="icon">&#10004;</span>
                            {successMessage}
                        </>
                    ) : (
                        <>
                            <span className="icon">&#10008;</span>
                            {errorMessage}
                        </>
                    )}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <Link to='/'>Create new</Link>
            </form>
        </div>
    );
};

export default LoginForm;
