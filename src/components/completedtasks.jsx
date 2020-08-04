import React, { useContext } from 'react';

import styles from '../assets/styles/dashboard.module.scss';
import { ThemeContext } from './fetchedData';

const CompletedTasks = (props) => {
    const {name} = useContext(ThemeContext);
    return ( 
        <div>
            <div className={styles.heading_container}>
                <div className={styles.title}>
                    <p>{props.title} </p>
                </div>
                <div className={styles.others}>
                    
                </div>
            </div>
            <div className={styles.component_details_container}>
                <p>this is completed {name}</p>
            </div>
        </div>
    );
}
 
export default CompletedTasks;