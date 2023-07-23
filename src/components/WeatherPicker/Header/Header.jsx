import React from 'react';
import cl from './Header.module.scss'
const Header = () => {
    return (
        <div className={cl.header}>
            <p className={cl.tile}>weather picker</p>
            <input type="text" placeholder='Найти'/>
        </div>
    );
};

export default Header;