import React from 'react';
import './navbar.scss'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const Navbar = () => {
    const { user } = useSelector(state => state.auth.value)

    return (
        <div className='navbar'>
            <div className="navContainer">
                <Link to='/'>
                    <span className="logo">Maxbooking</span>
                </Link>
                {
                    user?
                    <div>Welcome, {user.username}</div>
                    :
                    <div className="navItems">
                        <button className="navButton">Register</button>
                        <Link to='/login'>
                            <button className="navButton">Login</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
};

export default Navbar;
