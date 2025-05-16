import React from "react"
import logo from './images/Logo.svg'

const Nav = () => {
    return (
        <nav className="nav App" role="navigation" aria-label="Main navigation">
            <a href='/' className="logo">
                <img src={logo} alt='Little Lemon Logo'/>
            </a>
            <ul className="nav-list">
                <li><a href="/">Home</a></li>
                <li><a href="/">About</a></li>
                <li><a href="/">Menu</a></li>
                <li><a href="/" className="reservations">Reservations</a></li>
                <li><a href="/">Order Online</a></li>
                <li><a href="/">Login</a></li>
            </ul>
        </nav>
    );
};

export default Nav;