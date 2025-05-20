import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.svg';

const Footer = () => {
    return(
        <footer className="footer" role="contentinfo" aria-label="Footer navigation and contact">
            <div className="footer-logo">
                <img src={logo} alt="Little Lemon Logo" />
            </div>
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Doormat Navigation</h3>
                    <ul className="footer-nav-list">
                        <li><Link to="/" aria-label="Go to home page">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" aria-label="Go to about page">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/menu" aria-label="Go to menu page">
                                Menu
                            </Link>

                        </li>
                        <li>
                            <Link to="/booking" aria-label="Go to reservation page">
                                Reservations
                            </Link>
                        </li>
                        <li>
                            <Link to="/order-online" aria-label="Go to order online pgae">
                                Order Online
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" aria-label="Go to login page">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Contact</h3>
                    <ul className="footer-contact-list">
                        <li>123 Lemon St, Chicago, IL 60601</li>
                        <li>(123) 456-7890</li>
                        <li>info@littlelemon.com</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Social Media Links</h3>
                    <ul className="footer-social-list">
                        <li><a href="https://www.facebook.com" aria-label="Visit our Meta page">Meta</a></li>
                        <li><a href="https://www.linkedin.com" aria-label="Visit our LinkedIn page">LinkedIn</a></li>
                        <li><a href="https://www.x.com" aria-label="Visit our X page">X</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;