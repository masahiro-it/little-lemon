import React from "react";
import { Link } from 'react-router-dom';
import logo from '../images/Logo.svg';

const Nav = () => {
    return (
        <nav className="nav App" role="navigation" aria-label="Main navigation">
            <Link to='/' className="logo">
                <img src={logo} alt='Little Lemon Logo'/>
            </ Link>
            <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/booking" >Reservations</Link></li>
                <li><Link to="/order-online">Order Online</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;