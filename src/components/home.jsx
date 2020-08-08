import React, { useState, useEffect } from 'react';

import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import Navbar from './Navbar';

const Home = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [expand, setExpand] = useState(true);
    const [loginData,setLoginData] = useState({name:'',image:'',userId:''});

    const handleLoginData = (responseLoginStatus,responseLoginDataName,responseLoginDataImage) => {
        setLoginData({name:responseLoginDataName,image:responseLoginDataImage,userId:localStorage.getItem('userId')})
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
        if( localStorage.getItem('userId') ==null ){
            setLoginStatus(false);
        }
        else{
            setLoginStatus(true);
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