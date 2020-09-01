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

    const [emptyTextField,setEmptyTextField] = useState(false);
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [status,setStatus] = useState('todo');
    const [editId,setEditId] = useState(null);
    const [recievedData,setRecievedData] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('userId') !== null){
            axios.get('https://test-9515d.firebaseio.com/taskData.json')
                .then((res) => {
                    var filterDataUserId = Object.keys(res.data).filter((key) => res.data[key].userLoginId === localStorage.getItem('userId'))
                    const filtered = Object.keys(res.data)
                    .filter(key => filterDataUserId.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = res.data[key];
                        return obj;
                    }, {});
                    console.log(filtered);
                    setRecievedData(filtered);
                })
        }    
    },[dataSubmitted])

    const handleClose = () => {
        setShow(false);
        setEditButtonVisiblity(false)
        setReadOnly(true);
        setDisabled(true);
        setDataSubmitted(false);
    };

    const handleAddNew = () => {
        setShow(true);
        setTitle('');
        setDescription('');
        setDate('');
        setStatus('todo');
        setReadOnly(false);
    };

    const handleSubmit = (userLoginId) => {
        const myTaskData = {
            title,
            description,
            date,
            status,
            userLoginId:localStorage.getItem('userId'),
            bgColor:"#ede9e9"
        }
        if(title==""){
            setEmptyTextField(true);
        }
        else{
            axios.post('https://test-9515d.firebaseio.com/taskData.json',myTaskData)
            .then((res) => {
                setDataSubmitted(true);
                setTitle('');
                setDescription('');
                setDate('');
                setStatus('todo');
            })
        }
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

    const handleChangesSubmit = (id) => {
        var editedData = {
            title,
            description,
            date,
            status,
            userLoginId:localStorage.getItem('userId'),
            bgColor:"#ede9e9"
        }
        axios.put('https://test-9515d.firebaseio.com/taskData/'+id+'.json',editedData)
            .then(res => {
                setDataSubmitted(true);
            });
    }

    const handleSelect = (statusValue) => {
        setStatus(statusValue);
    }

    const handleEdit = (id) => {
        setShow(true);
        setTitle(recievedData[id].title);
        setDescription(recievedData[id].description);
        setDate(recievedData[id].date);
        setStatus(recievedData[id].status);
        setEditId(id);
        setEditButtonVisiblity(true);
        setReadOnly(true);
        setDataSubmitted(false);
    }

    const handleEditWrite = () => {
        setReadOnly(false);
        setDisabled(false)
    }

    return ( 
        <div>
            <ThemeContext.Provider value={{recievedData,show,readOnly,disabled,showEdit,editButtonVisiblity,detailsEdit,dataSubmitted,title,description,date,status,editId,emptyTextField,handleClose,handleAddNew,handleSubmit,handleDelete,handleChangesSubmit,handleSelect,handleEdit,handleEditWrite,setTitle,setDescription,setDate}}>
                {props.children}
            </ThemeContext.Provider>
        </div>
    );
}
 
export default FetchedData;