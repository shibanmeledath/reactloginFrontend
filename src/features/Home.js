import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import List from './List';
const Home = () => {
    const location = useLocation();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (location.state && location.state.username) {
            setUsername(location.state.username);
        } else if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [location]);

    return (
        <>
        <div className='home'>
            <h2>Welcome, {username}!</h2>
        </div>
        <List/>
        </>
   
    );
};

export default Home;
