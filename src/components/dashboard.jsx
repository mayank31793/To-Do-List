import React,{ useState, useEffect, createContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { FcApproval } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

import styles from '../assets/styles/dashboard.module.scss';

export const ThemeContext = createContext();

const Dashboard = (props) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [detailsEdit, setDetailsEdit] = useState(false);
    const [dataSubmitted,setDataSubmitted] = useState(false);

    const [name, setName] = useState("Mayank");

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [status,setStatus] = useState('');
    const [recievedData,setRecievedData] = useState([]);

    const handleClose = () => {
        setShow(false);
        setDataSubmitted(!dataSubmitted);
    };

    const handleAddNew = () => {
        setShow(true);
    };

    const handleSubmit = () => {
        const myTaskData = {
            title,
            description,
            date,
            status,
            bgColor:"#ede9e9"
        }
        axios.post('https://test-9515d.firebaseio.com/taskData.json',myTaskData)
            .then((res) => {
                setDataSubmitted(!dataSubmitted);
            })
    }

    const handleDelete = (id,title) => {
        var result = window.confirm('Are you sure you want to delte " '+title+' "');
        if (result) {
            axios.delete('https://test-9515d.firebaseio.com/taskData/'+id+'.json')
            .then((res) => {
                setDataSubmitted(!dataSubmitted);
            })
            .catch((err) => console.log("not gonna happen",err))
        }
    }

    const handleColorChange = (current,color) => {
        console.log('this is color');
        console.log('current,color ',current.closest('li'),color);
        current.closest('li').style.backgroundColor = color;
    }

    const handleShowColor = (a) => {
        console.log(a)
    }

    const handleSelect = (statusValue) => {
        setStatus(statusValue);
    }

    useEffect(() => {
        axios.get('https://test-9515d.firebaseio.com/taskData.json')
            .then((res) => setRecievedData(res.data))
    },[dataSubmitted])

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
                            <div>
                                {recievedData[id].title}
                            </div>
                            <div className={styles.color_picker}>
                                <div className={styles.color_picker_icon} onClick={(event) => handleShowColor(recievedData[id])}>
                                    <BsThreeDotsVertical />
                                </div>
                                <div className={styles.color_picker_container}>
                                    <div className={styles.color_red} onClick={(e) => handleColorChange(e.currentTarget,'#f65858')}></div>
                                    <div className={styles.color_green}  onClick={(e) => handleColorChange(e.currentTarget,'#7ae57a')}></div>
                                    <div className={styles.color_blue}  onClick={(e) => handleColorChange(e.currentTarget,'#7171e2')}></div>
                                    <div className={styles.color_yellow}  onClick={(e) => handleColorChange(e.currentTarget,'#e1ca71')}></div>
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