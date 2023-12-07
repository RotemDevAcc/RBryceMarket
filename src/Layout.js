// Layout.js
import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { is_user_logged } from './features/supermarket/loginSlice';
import { useSelector } from 'react-redux';

const Layout = () => {
    const logged = useSelector(is_user_logged);
    const location = useLocation();

    return (
        <div>
            <header className="bg-dark text-white">
                <nav>
                    <ul className="nav">
                        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                        </li>
                        <li className={`nav-item ${location.pathname === '/super' ? 'active' : ''}`}>
                            <NavLink to="/super" className="nav-link">
                                Products
                            </NavLink>
                        </li>
                        <li className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
                            <NavLink to="/contact" className="nav-link">
                                Contact
                            </NavLink>
                        </li>
                        {!logged && (
                            <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
