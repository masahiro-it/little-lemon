import React from 'react';
import Menu from './Menu';

const MenuPage = () => {
    return (
        <section className="menu-page container"  aria-label="Full menu page">
            <Menu isSpecials={false} />
        </section>
    );
};

export default  MenuPage;