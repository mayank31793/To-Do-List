import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiDashboardLine } from 'react-icons/ri';
import { BsListTask } from 'react-icons/bs';
import { FaCheckDouble } from 'react-icons/fa';
import { RiCalendarLine } from 'react-icons/ri';

import styles from '../assets/styles/sidebar.module.scss';

const Sidebar = () => {
    return ( 
        <>
            <ul>
                <li>
                    <NavLink to="/dashboard" activeClassName="active">
                        <div className={styles.link_icon}>
                            <RiDashboardLine />
                        </div>
                        <div className={styles.link_icon}>
                            <span>Dashboard</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/all" activeClassName="active">
                        <div className={styles.link_icon}>
                            <BsListTask />
                        </div>
                        <div className={styles.link_icon}>
                            <span>All Tasks</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/completed" activeClassName="active">
                        <div className={styles.link_icon}>
                            <FaCheckDouble />
                        </div>
                        <div className={styles.link_icon}>
                            <span>Completed</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pending" activeClassName="active">
                        <div className={styles.link_icon}>
                            <RiCalendarLine />
                        </div>
                        <div className={styles.link_icon}>
                            <span>pending</span>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </>
    );
}
 
export default Sidebar;