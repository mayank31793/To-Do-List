import React, { useState } from 'react';

import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import Navbar from './Navbar';

const Home = () => {
    const [loginStatus, setLoginStatus] = useState(null);
    const [expand, setExpand] = useState(true);
    const [loginData,setLoginData] = useState({name:'',image:''});

    const handleLoginData = (responseLoginStatus,responseLoginDataName,responseLoginDataImage,userId) => {
        setLoginData({name:responseLoginDataName,image:responseLoginDataImage,userId:userId})
        if( localStorage.getItem('userId') !=null ){
            setLoginStatus(true);
            console.log('The user is logged in',loginStatus);
        }
    }

    const handleExpand = () => {
        setExpand(!expand)
        console.log(expand);
    }

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setLoginStatus(false);
        console.log('The user is logged out',loginStatus);
    }

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