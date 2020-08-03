import React,{ useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { FcApproval } from 'react-icons/fc';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';

import styles from '../assets/styles/dashboard.module.scss';

const Dashboard = (props) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [detailsEdit, setDetailsEdit] = useState(false);
    const [dataSubmitted,setDataSubmitted] = useState(false);

    // edit popup details
    const [editTitle, setEditTitle] = useState(null);
    const [editDescription, setEditDescription] = useState(null);
    const [editDate, setEditDate] = useState(null);
    const [readOnly, setReadOnly] = useState(true);
    const [idEdit,setIdEdit] = useState(null);

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [recievedData,setRecievedData] = useState([]);

    const handleClose = () => {
        setShow(false);
        setDataSubmitted(!dataSubmitted);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
        setDataSubmitted(!dataSubmitted);
    };

    const handleAddNew = () => {
        setShow(true);
    };

    // on clicking edit icon on tasks
    const handleShowEdit = (id) => {
        setShowEdit(true);
        var editedData = recievedData[id]
        setEditTitle(editedData.title)
        setEditDescription(editedData.description)
        setIdEdit(id);
    };

    const handleSubmit = () => {
        const myTaskData = {
            title,
            description,
            date,
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

    const handleUpdateEdit = () => {
        const editedData = {
            editTitle,
            editDescription,
            editDate,
            bgColor:"#ede9e9"
        }
        axios.put('https://test-9515d.firebaseio.com/taskData/'+idEdit+'.json',editedData)
            .then((res) => {
                setDataSubmitted(!dataSubmitted);
            })
    }

    const handleColorChange = (current,color) => {
        console.log('this is color');
        console.log('current,color ',current.closest('li'),color);
        current.closest('li').style.backgroundColor = color;
    }

    const handleShowColor = (a) => {
        console.log(a)
    }

    const handleEditPopup = () => {
        console.log('pop up efir');
        setReadOnly(false)
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
                                <div className={styles.edit} onClick={() => handleShowEdit(id)}>
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
                                <label for="assign_date">Date</label>
                                <input type="date" 
                                    id="assign_date"
                                    className={styles.task_title} 
                                    onChange={(e) => setDate(e.target.value)} 
                                    required />
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


                {/* edit modal data */}
                <Modal show={showEdit} onHide={handleCloseEdit} className={styles.custom_modal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label for="title">Task Title</label>
                            <input type="text" 
                                value={editTitle} 
                                id="task_title"
                                className={styles.task_title} 
                                onChange={(e) => setEditTitle(e.target.value)}
                                readOnly={readOnly} />
                            <label for="task_description">Description</label>
                            <textarea id="task_description" className={styles.task_title} 
                                onChange={(e) => setEditDescription(e.target.value)}
                                value={editDescription}
                                readOnly={readOnly} />
                            <label for="assign_date">Date</label>
                            <input type="date" 
                                id="assign_date"
                                className={styles.task_title} 
                                onChange={(e) => setDate(e.target.value)} 
                                readOnly={readOnly} />
                        </div> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-primary" onClick={handleEditPopup}>
                            Edit
                        </Button>
                        <Button variant="primary" onClick={() => handleUpdateEdit()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* edit modal data ends */}

            </div>
        </div>
    );
}
 
export default Dashboard;