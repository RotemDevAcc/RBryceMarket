// Layout.js
import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { is_user_logged, user_logout } from './features/supermarket/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from './Darkmode';


const Layout = () => {
    const logged = useSelector(is_user_logged);
    const location = useLocation();
    const dispatch = useDispatch();

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
                        {!logged ? (
                            <li className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}>
                                <NavLink to="/login" className="nav-link">
                                    Login
                                </NavLink>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <span className="nav-link" onClick={() => { dispatch(user_logout()) }} style={{ cursor: "pointer", color: "#007bff" }} >Logout</span>
                            </li>
                        )}
                        <li className={`nav-item ${location.pathname === '/logout' ? 'active' : ''}`}>
                            <button onClick={()=>toggleDarkMode()} className="nav-link" style={{ color: "#007bff", border: 'none', background: 'none', cursor: 'pointer'}}>
                                Toggle Dark Mode
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
