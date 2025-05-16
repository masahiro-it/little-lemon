import React from 'react';
import logo from './images/Logo.svg';

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
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Menu</a></li>
                        <li><a href="/">Reservations</a></li>
                        <li><a href="/">Order Online</a></li>
                        <li><a href="/">Login</a></li>
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