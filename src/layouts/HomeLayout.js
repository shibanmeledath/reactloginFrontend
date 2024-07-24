import { Outlet, useNavigate  } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Header from "./Header"
import Footer from "./Footer"
import Navbar from "./Navbar"


const HomeLayout = () => {
  const navigate = useNavigate();
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
  return isAuthenticated? <>
  
  <Header />
  <Navbar />
  <Outlet />
  <Footer/>
  
  </>
  :navigate('/')
}

export default HomeLayout
