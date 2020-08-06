import React, { useState } from 'react';
import {Switch, Route} from 'react-router-dom';

import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import Navbar from './Navbar';

const Home = () => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [expand, setExpand] = useState(true);
    const [loginData,setLoginData] = useState({name:'',image:''});

    const handleLoginData = (responseLoginStatus,responseLoginDataName,responseLoginDataImage,userId) => {
        setLoginStatus(!loginStatus);
        setLoginData({name:responseLoginDataName,image:responseLoginDataImage,userId:userId})
    }

    const handleExpand = () => {
        setExpand(!expand)
        console.log(expand);
    }

    return ( 
        <div>
            <Navbar loginStatus={loginStatus} loginData={loginData} handleExpand={handleExpand} />
            {loginStatus
            ?
                <LoggedIn loginData={loginData} expand={expand} />
            :
                <LoggedOut loginStatus={loginStatus} handleLoginData={handleLoginData} />
            }
        </div>
    );
}
 
export default Home;