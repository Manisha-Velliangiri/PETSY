import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.jpg'
const Navbar = () => {
  return (
    <div className="navbar">
        <img src={navlogo} alt="" className="nav" />
        <h1>PETSY</h1><br /><h2>Admin  Panel</h2>
        <img src={navProfile}  className="nav-profile" alt="" />
    </div>
  )
}

export default Navbar