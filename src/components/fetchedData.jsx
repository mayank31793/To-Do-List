import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const ThemeContext = createContext();

const FetchedData = (props) => {
    const [recievedData, setRecievedData] = useState([]);

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [detailsEdit, setDetailsEdit] = useState(false);
    const [dataSubmitted,setDataSubmitted] = useState(false);

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [status,setStatus] = useState('todo');
    // const [recievedData,setRecievedData] = useState([]);



    useEffect(() => {
        axios.get('https://test-9515d.firebaseio.com/taskData.json')
            .then((res) => setRecievedData(res.data))
    },[dataSubmitted])

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

    const handleSelect = (statusValue) => {
        setStatus(statusValue);
    }

    return ( 
        <div>
            <ThemeContext.Provider value={{recievedData,show,showEdit,detailsEdit,dataSubmitted,title,description,date,status,handleClose,handleAddNew,handleSubmit,handleDelete,handleSelect,setTitle,setDescription,setDate}}>
                {props.children}
            </ThemeContext.Provider>
        </div>
    );
}
 
export default FetchedData;