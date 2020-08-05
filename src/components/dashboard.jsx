import React,{ useState, useEffect, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { FcApproval } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';

import styles from '../assets/styles/dashboard.module.scss';
import { ThemeContext } from './fetchedData';

const Dashboard = (props) => {

    const {recievedData,show,showEdit,detailsEdit,dataSubmitted,title,description,date,status,handleClose,handleAddNew,handleSubmit,handleDelete,handleSelect,setTitle,setDescription,setDate} = useContext(ThemeContext);

    // useEffect(() => {
    //     axios.get('https://test-9515d.firebaseio.com/taskData.json')
    //         .then((res) => setRecievedData(res.data))
    // },[dataSubmitted])

    return ( 
        <div>
            <div className={styles.heading_container}>
                <div className={styles.title}>
                    <p>{props.title}</p>
                </div>
                <div className={styles.others}>
                    <Button variant="primary" onClick={handleAddNew}>
                        <span>+ Add New</span>
                    </Button>
                </div>
            </div>
            <div className={styles.component_details_container}>
                {recievedData?
                <ul className={styles.data_layout}>
                    {Object.keys(recievedData).map((id) => (
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
                        
                {/* modal data */}
                <Modal show={show} onHide={handleClose} className={styles.custom_modal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {dataSubmitted 
                        ?
                            <div className={styles.success}>
                                <div className="text-center">
                                    <FcApproval />
                                </div>
                                <p className="text-center">Success</p>
                            </div>
                                
                        :
                            <div>
                                <label for="title">Task Title</label>
                                <input type="text" 
                                    value={title} 
                                    id="task_title"
                                    className={styles.task_title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                    required />
                                <label for="task_description">Description</label>
                                <textarea id="task_description" className={styles.task_title} 
                                    onChange={(e) => setDescription(e.target.value)}
                                    required >
                                </textarea>
                                <div className={styles.date_status_container}>
                                    <div className={styles.date_status}>
                                        <label for="assign_date">Date</label>
                                        <input type="date" 
                                            id="assign_date"
                                            className={styles.task_title} 
                                            onChange={(e) => setDate(e.target.value)} 
                                            required />
                                    </div>
                                    <div className={styles.date_status}>
                                        <label for="assign_status">Status</label>
                                        <select value={status} onChange={(e) => handleSelect(e.target.value)}>
                                            <option value="todo">To Do</option>
                                            <option value="inprogress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }    
                    </Modal.Body>
                    {dataSubmitted ? 
                        null :
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleSubmit}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    }
                </Modal>
                {/* modal data ends */}

            </div>
        </div>
    );
}
 
export default Dashboard;