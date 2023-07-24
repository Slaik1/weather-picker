import React from 'react';
import cl from './Header.module.scss'
const Header = () => {
    return (
        <div className={cl.header}>
            <p className={cl.tile}>weather picker</p>
            <input className={cl.input} type="text" placeholder='Добавить...'/>
        </div>
    );
};

export default Header;