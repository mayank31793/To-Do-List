import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const ThemeContext = createContext();

const FetchedData = (props) => {

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [detailsEdit, setDetailsEdit] = useState(false);
    const [dataSubmitted,setDataSubmitted] = useState(false);
    const [readOnly,setReadOnly] = useState(false);
    const [editButtonVisiblity,setEditButtonVisiblity] = useState(false);
    const [disabled,setDisabled] = useState(true);

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [status,setStatus] = useState('todo');
    const [recievedData,setRecievedData] = useState([]);

    useEffect(() => {
        axios.get('https://test-9515d.firebaseio.com/taskData.json')
            .then((res) => setRecievedData(res.data))
    },[dataSubmitted])

    const handleClose = () => {
        setShow(false);
        setEditButtonVisiblity(false)
        setReadOnly(true);
        // setDataSubmitted(!dataSubmitted);
    };

    const handleAddNew = () => {
        setShow(true);
        setTitle('');
        setDescription('');
        setDate('');
        setStatus('todo');
        setReadOnly(false);
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
                setTitle('');
                setDescription('');
                setDate('');
                setStatus('todo');
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

    const handleChangesSubmit = () => {
        console.log('this is changes submit')
    }

    const handleSelect = (statusValue) => {
        setStatus(statusValue);
    }

    const handleEdit = (id) => {
        console.log('this is '+id);
        setShow(true);
        console.log(recievedData[id]);
        setTitle(recievedData[id].title);
        setDescription(recievedData[id].description);
        setDate(recievedData[id].date);
        setStatus(recievedData[id].status);
        setEditButtonVisiblity(true);
        setReadOnly(true);
    }

    const handleEditWrite = () => {
        setReadOnly(false);
        setDisabled(!disabled)
    }

    return ( 
        <div>
            <ThemeContext.Provider value={{recievedData,show,readOnly,disabled,showEdit,editButtonVisiblity,detailsEdit,dataSubmitted,title,description,date,status,handleClose,handleAddNew,handleSubmit,handleDelete,handleChangesSubmit,handleSelect,handleEdit,handleEditWrite,setTitle,setDescription,setDate}}>
                {props.children}
            </ThemeContext.Provider>
        </div>
    );
}
 
export default FetchedData;