import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import Sidebar from './Sidebar';

const Navbar = () => {
    const [menu, setMenu] = useState('shop');
    const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle
    const { getTotalCartItems } = useContext(ShopContext);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen); // Toggle sidebar state
    };

    const closeSidebar = () => {
        setSidebarOpen(false); // Close sidebar
    };

    return (
        <div className={`navbar ${sidebarOpen ? 'active' : ''}`}>
            <div className='nav-logo'>
                <img src={logo} alt='Logo' />
                <p>PETSY</p>
            </div>
            <ul className={`nav-menu ${sidebarOpen ? 'active' : ''}`}>
                <li onClick={() => { setMenu('shop'); closeSidebar(); }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>
                        Shop
                    </Link>
                    {menu === 'shop' ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu('dogs'); closeSidebar(); }}>
                    <Link style={{ textDecoration: 'none' }} to='/dogs'>
                        Dogs
                    </Link>
                    {menu === 'dogs' ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu('cats'); closeSidebar(); }}>
                    <Link style={{ textDecoration: 'none' }} to='/cats'>
                        Cats
                    </Link>
                    {menu === 'cats' ? <hr /> : <></>}
                </li>
            </ul>
            <div className='nav-login-cart'>
                
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            : <Link to='/login'><button>Login</button></Link>}
               
                <Link to='/cart'>
                    <img src={cart_icon} alt='Cart' />
                </Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
            <div className='nav-toggle' onClick={toggleSidebar}>
                <div className='nav-toggle-bar'></div>
                <div className='nav-toggle-bar'></div>
                <div className='nav-toggle-bar'></div>
            </div>

            {/* Persistent button to open sidebar */}
            <div className={`nav-access-button ${sidebarOpen ? 'hidden' : ''}`} onClick={toggleSidebar}>
                <button>Petsy</button>
            </div>

            {/* Sidebar Component */}
            <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>
    );
};

export default Navbar;












