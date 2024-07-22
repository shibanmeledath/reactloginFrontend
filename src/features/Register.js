import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const REG_URL = '/register';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

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

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setPassword('');
            setConfirmPassword('');
            return;
        }

        setLoading(true);

        try {
            await axios.post(REG_URL, { username, password });
            setSuccessMessage('Registration successful');
            setTimeout(() => navigate('/login'), 1000);
        } catch (error) {
            console.error('Registration failed:', error);
            if (!error.response) {
                setErrorMessage('Network error: Please check your internet connection.');
            } else if (error.response.status === 409) {
                setErrorMessage('User name already registered');
            } else {
                setErrorMessage('Registration failed: Please try again.');
            }
        } finally {
            setLoading(false);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        }
    };

    return (
        <div className='register'>
            <h2>Register</h2>
            {(successMessage || errorMessage) && (
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
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <Link to='/login'>Login</Link>
            </form>
        </div>
    );
};

export default RegisterForm;
