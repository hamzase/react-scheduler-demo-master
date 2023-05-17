import React from 'react';
import './Navbar.style.css';

const Navbar = ({ tipoMenu, handleMenu }) => {

    return (
        <div className="navbar">
            <button className="btn-menu" onClick={() => handleMenu()}>
                <i className="fas fa-bars "></i>
            </button>

            <h2>HEALTH HUB</h2>

            <img src="/images/user.png" className="user-ciclo" alt="user" />
        </div>
    );
};

export default Navbar;