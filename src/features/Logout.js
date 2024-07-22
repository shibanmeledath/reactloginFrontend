import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear token from localStorage
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    return null;
};

export default Logout;
