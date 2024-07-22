import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return<nav className="homenav">
    <Link to='/home'>Home</Link>
    <Link to='/'>Register</Link>
    <Link to='/home/logout'>Logout</Link>

  </nav>
}

export default Navbar
