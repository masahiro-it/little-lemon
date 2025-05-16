import React from 'react';
import heroImage from './images/restauranfood.jpg';

const Header = () => {
    return (
        <header className="hero" role="banner" aria-label="Little Lemon hero section">
            <div className="hero-container">
                <div className="hero-content">
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>
                        We are a family owned Mediterranean restaurant, focused on traditional 
                        recipes served with a modern twist.
                    </p>
                    <a href="/" className="cta-button" aria-label="Reserve a table at Little Lemon">
                        Reserve a Table
                    </a>
                </div>
                <img src={heroImage} alt="Delicious Mediterranean dish" className="hero-image" />
            </div>
        </header>
    );
};

export default Header;