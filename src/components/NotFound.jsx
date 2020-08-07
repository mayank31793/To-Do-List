import React from 'react';
import { Link } from 'react-router-dom';

import img from '../assets/images/404.svg';
import styles from '../assets/styles/NotFound.module.scss';

const NotFOund = () => {
    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.image_container}>
                    <img src={img} alt="Page Not Found" />
                </div>
                <h1>Page Not Found</h1>
                <p>Go Back to <Link to="/dashboard">DashBoard</Link></p>
            </div>
        </>
    );
}
 
export default NotFOund;