import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-content">
                <ul className="sidebar-menu">
                    <li onClick={closeSidebar}>
                        <Link to='/'>Shop</Link>
                    </li>
                    <li onClick={closeSidebar}>
                        <Link to='/dogs'>Dogs</Link>
                    </li>
                    <li onClick={closeSidebar}>
                        <Link to='/cats'>Cats</Link>
                    </li>
                    <li onClick={closeSidebar}>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li onClick={closeSidebar}>
                        <Link to='/cart'>Cart</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;


