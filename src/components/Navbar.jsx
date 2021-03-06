import React from 'react';
import {NavLink} from 'react-router-dom';
import { FaPaperPlane } from 'react-icons/fa';
import { GiHamburgerMenu } from "react-icons/gi";

import styles from '../assets/styles/Navbar.module.scss';

const Navbar = (props) => {
    return ( 
        <div className={styles.container}>
            <div className={styles.main_container}>
                <div className={styles.left_container}>
                    <div className={styles.expand_container} onClick={props.handleExpand}>
                        <GiHamburgerMenu />
                    </div>
                    <div className={styles.logo_container}>
                        <div className={styles.logo_icon_container}>
                            <FaPaperPlane />
                        </div>
                        <div className={styles.logo_text_container}>
                            <span>To Do List</span>
                        </div>
                    </div>
                </div>
                <div className={styles.right_container}>
                    {
                        props.loginStatus
                        ?
                        <div className={styles.login_details}>
                            <div className={styles.profile_pic}>
                                <img src={localStorage.getItem('userImage')} alt="Pic" />
                            </div>
                            <span>{localStorage.getItem('userName')}</span>
                        </div>
                        :
                        <div>
                            {/* <NavLink to="/login">Login</NavLink> */}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;