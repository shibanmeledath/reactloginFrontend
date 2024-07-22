import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterLayout from './layouts/RegisterLayout';
import HomeLayout from './layouts/HomeLayout';
import NotFound from './features/NotFound';
import Home from './features/Home';
import RegisterForm from './features/Register';
import LoginForm from './features/Login';
import Logout from './features/Logout';
import List from './features/List';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(localStorage.getItem('token') !== null);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div id="root">
            <div className="content">
                <Routes>
                    <Route path='/' element={<RegisterLayout />}>
                        <Route index element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="/home" element={isAuthenticated ? <HomeLayout /> : <Navigate to="/" />}>
                        <Route index element={
                            <><Home /><List /></> } />
                        <Route path='/home/logout' element={<Logout />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
