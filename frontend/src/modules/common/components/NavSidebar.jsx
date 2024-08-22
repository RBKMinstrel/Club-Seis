import React from 'react';
import {Link, useLocation} from "react-router-dom";
import './NavSidebar.css';

const NavSidebar = ({items}) => {
    const location = useLocation();

    return (
        <div className="nav-sidebar">
            {items.map((item) => {
                const isActive = location.pathname.startsWith(item.url);
                return (
                    <div key={item.url}>
                        <Link to={item.url} className={isActive ? 'active' : ''}>
                            {item.name}
                        </Link>
                        {item.subItems && item.subItems.length > 0 && isActive && (
                            <ul>
                                {item.subItems.map((subItem) => {
                                    const isSubActive = location.pathname.startsWith(subItem.url);
                                    return (
                                        <li key={subItem.url}>
                                            <Link to={subItem.url} className={isSubActive ? 'active' : ''}>
                                                {subItem.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default NavSidebar;
