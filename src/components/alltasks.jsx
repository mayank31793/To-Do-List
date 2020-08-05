import React, { useContext } from 'react';

import styles from '../assets/styles/dashboard.module.scss';
import { ThemeContext } from './fetchedData';

const AllTasks = (props) => {
    const {recievedData} = useContext(ThemeContext);
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
                <ul>
                    {Object.keys(recievedData).map((id) => <li key={id}>{recievedData[id].title}</li>)}
                </ul>
            </div>
        </div>
    );
}
 
export default AllTasks;