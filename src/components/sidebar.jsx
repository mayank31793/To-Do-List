import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiDashboardLine } from 'react-icons/ri';
import { BsListTask } from 'react-icons/bs';
import { FaCheckDouble } from 'react-icons/fa';
import { RiCalendarLine } from 'react-icons/ri';
import { GoSignOut } from 'react-icons/go';

import styles from '../assets/styles/sidebar.module.scss';

const Sidebar = (props) => {
    return ( 
        <>
            <ul>
                <li>
                    <NavLink to="/dashboard" activeClassName={styles.activeLink}>
                        <div className={styles.link_icon}>
                            <RiDashboardLine />
                        </div>
                        <div className={styles.link_icon} style={{display: props.expand === true ? "block": "none"}}>
                            <span>Dashboard</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/progress" activeClassName={styles.activeLink}>
                        <div className={styles.link_icon}>
                            <BsListTask />
                        </div>
                        <div className={styles.link_icon} style={{display: props.expand === true ? "block": "none"}}>
                            <span>In Progress</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/completed" activeClassName={styles.activeLink}>
                        <div className={styles.link_icon}>
                            <FaCheckDouble />
                        </div>
                        <div className={styles.link_icon} style={{display: props.expand === true ? "block": "none"}}>
                            <span>Completed</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pending" activeClassName={styles.activeLink}>
                        <div className={styles.link_icon}>
                            <RiCalendarLine />
                        </div>
                        <div className={styles.link_icon} style={{display: props.expand === true ? "block": "none"}}>
                            <span>pending</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <div className={styles.logout_container} onClick={props.handleLogout}>
                        <div className={styles.link_icon}>
                            <GoSignOut />
                        </div>
                        <div className={styles.link_icon} style={{display: props.expand === true ? "block": "none"}}>
                            <span>Logout</span>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    );
}
 
export default Sidebar;