import React from 'react';
import { Link } from 'react-router-dom';
import greekSalad from './images/greek salad.jpg';
import bruschetta from './images/bruchetta.svg';
import lemonDessert from './images/lemon dessert.jpg';

const menuItems = [
    {
        id: 1,
        image: greekSalad,
        name: 'Greek Salad',
        price: '$12.99',
        description:
        'The famous greek salad of cripsy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
        alt: 'Greek salad with lettuce, peppers, olives, and feta cheese',
    },
    {
        id: 2,
        image: bruschetta,
        name: 'Bruschetta',
        price: '$5.99',
        description:
        'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
        alt: 'Bruschetta with grilled bread, garlic, and olive oil',
    },
    {
        id: 3,
        image: lemonDessert, 
        name: 'Lemon Dessert',
        price: '$5.00',
        description:
        'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
        alt: 'Authentic lemon dessert from traditional recipe',
    },
];

const Main = () => {
    return (
        <main className="main" role="main" aria-label="Little Lemon specials section">
            <div className="main-header">
                <h2>This Week's Specials!</h2>
                <Link
                    to="/menu" 
                    className="cta-button" 
                    aria-label="View Little Lemon online menu"
                >
                    Online Menu
                </Link>
            </div>
            <div className="menu-cards">
                {menuItems.map((item) => (
                    <div key={item.id} className="menu-card">
                        <img src={item.image} alt={item.alt} className="menu-image" />
                        <div className="menu-content">
                            <div className="menu-title">
                                <h3>{item.name}</h3>
                                <span className="menu-price">{item.price}</span>
                            </div>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Main;