import React from 'react';

import styles from '../assets/styles/dashboard.module.scss';

const AllTasks = (props) => {
    return ( 
        <div>
            <div className={styles.heading_container}>
                <div className={styles.title}>
                    <p>{props.title} </p>
                </div>
                <div className={styles.others}>
                    
                </div>
            </div>
        </div>
    );
}
 
export default AllTasks;