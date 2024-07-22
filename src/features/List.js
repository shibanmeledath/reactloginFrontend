import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const List = () => {
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
    <div className="list">
  <nav className='rolls-royce'>
    <h2>Hi {username} </h2>
    <ul>
        <li><a href="#/">{username} Cullinan</a></li>
        <li><a href="#/">{username} Ghost</a></li>
        <li><a href="#/">{username} Phantom</a></li>
        <li><a href="#/">{username} Wraith</a></li>
        <li><a href="#/">{username} Dawn</a></li>
    </ul>
  
  </nav>
  <p>Learn more about <a href="/">rolls royce </a></p>
</div>
  )
}

export default List
