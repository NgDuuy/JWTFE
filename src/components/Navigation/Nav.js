import React, { useEffect, useState } from 'react';
import './Nav.scss'
import { NavLink, useLocation, useHistory } from "react-router-dom";

const Nav = (props) => {
    let history = useHistory();
    let location = useLocation();
    const [isShow, setIsShow] = useState(true)
    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false)
        }
    }, [])
    return (

        <>
            {isShow === true &&
                <div className='topnav'>
                    <NavLink to='/' exact>Home</NavLink>
                    <NavLink to='/users'>Users</NavLink>
                    <NavLink to='/project'>Projects</NavLink>
                    <NavLink to='/about'>About</NavLink>
                </div>
            }
        </>
    );
}

export default Nav;