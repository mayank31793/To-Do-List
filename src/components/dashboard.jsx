import React,{ useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FcApproval } from 'react-icons/fc';

import styles from '../assets/styles/dashboard.module.scss';

const Dashboard = (props) => {
    const [show, setShow] = useState(false);
    const [dataSubmitted,setDataSubmitted] = useState(false);
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [recievedData,setRecievedData] = useState([]);

    const handleClose = () => {
        setShow(false);
        setDataSubmitted(!dataSubmitted);
    };
    const handleShow = () => {
        setShow(true);
    };

    const handleSubmit = () => {
        const myTaskData = {
            title,
            description,
            date
        }
        axios.post('https://test-9515d.firebaseio.com/taskData.json',myTaskData)
            .then((res) => {
                setDataSubmitted(!dataSubmitted);
            })
    }

    useEffect (() => {
        axios.get('https://test-9515d.firebaseio.com/taskData.json')
            .then((res) => {
                var arr = [];
                for(var key in res.data){
                    console.log(res.data[key]);
                    arr.push(res.data[key]);
                }
                setRecievedData(arr);
            })
    },[dataSubmitted])

    return ( 
        <div>
            <div className={styles.heading_container}>
                <div className={styles.title}>
                    <p>{props.title}</p>
                </div>
                <div className={styles.others}>
                    <button onClick={handleShow}>
                        <span>+ Add New</span>
                    </button>
                </div>
            </div>
            <div className={styles.component_details_container}>
                <ul>
                    {recievedData.map((res) => <li>{res.title}</li>)}
                </ul>
                {/* modal data */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {dataSubmitted 
                        ?
                            <div>
                                <FcApproval />
                                <p>Success</p>
                            </div>
                                
                        :
                            <div>
                                <label for="title">Task Title</label>
                                <input type="text" 
                                    value={title} 
                                    placeholder="Add Task Title" 
                                    id="task_title" 
                                    onChange={(e) => setTitle(e.target.value)} />
                                <label for="task_description">Description</label>
                                <textarea id="task_description"
                                    onChange={(e) => setDescription(e.target.value)}>
                                </textarea>
                                <label for="assign_date">Date</label>
                                <input type="date" 
                                    id="assign_date"
                                    onChange={(e) => setDate(e.target.value)} />
                            </div>
                        }    
                    </Modal.Body>
                    <Modal.Footer>
                        <button variant="primary" onClick={handleSubmit}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>
                {/* modal data ends */}
            </div>
        </div>
    );
}
 
export default Dashboard;