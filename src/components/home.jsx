import React, { useState, useEffect } from 'react';

import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import Navbar from './Navbar';

const Home = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [expand, setExpand] = useState(true);
    const [loginData,setLoginData] = useState({name:'',image:'',userId:''});

    const handleLoginData = (responseLoginStatus,responseLoginDataName,responseLoginDataImage,responseLoginUserId) => {
        setLoginData({name:responseLoginDataName,image:responseLoginDataImage,userId:responseLoginUserId})

    }

    const handleExpand = () => {
        setExpand(!expand)
    }

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userImage');
        setLoginStatus(false);
    }

    useEffect(() => {
        if( localStorage.getItem('userId') == null ){
            setLoginStatus(false);
            console.log('this is false loginstate');
        }
        else{
            setLoginStatus(true);
            console.log('this is false loginstate');
        }
    },[loginData])

    return ( 
        <div>
            <Navbar loginStatus={loginStatus} loginData={loginData} handleExpand={handleExpand} />
            {loginStatus
            ?
                <LoggedIn loginData={loginData} expand={expand} handleLogout={handleLogout} />
            :
                <LoggedOut loginStatus={loginStatus} handleLoginData={handleLoginData} />
            }
        </div>
    );
}
 
export default Home;