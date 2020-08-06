import React, { useContext } from 'react';

import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

import styles from '../assets/styles/dashboard.module.scss';
import { ThemeContext } from './fetchedData';

const PendingTasks = (props) => {
    const {recievedData,show,showEdit,detailsEdit,dataSubmitted,title,description,date,status,handleClose,handleAddNew,handleSubmit,handleDelete,handleEdit,handleSelect,setTitle,setDescription,setDate} = useContext(ThemeContext);
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
            {recievedData?
                <ul className={styles.data_layout}>
                    {Object.keys(recievedData).filter((id) => recievedData[id].status == 'todo')
                        .map((id) => (
                        <li key={id} >
                            <div className={styles.task_heading_container}>
                                <div className={styles.task_heading}>
                                    <h4>{recievedData[id].title}</h4>
                                </div>
                                <div className={styles.task_progress}>
                                    <span style={{backgroundColor:recievedData[id].status == "todo" ? 'red':recievedData[id].status == "completed"?'green':'blue'}}>{recievedData[id].status}</span>
                                </div>
                            </div>
                            <div className={styles.edit_delete}>
                                <div className={styles.edit}>
                                    <FiEdit />
                                </div>
                                <div className={styles.delete} onClick={() => handleDelete(id,recievedData[id].title)}>
                                    <AiOutlineDelete />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>:null}
            </div>
        </div>
    );
}
 
export default PendingTasks;