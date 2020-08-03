import React, { useState } from 'react';
import {Switch, Route} from 'react-router-dom';

import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import Navbar from './Navbar';

const Home = () => {
    const [loginStatus, setLoginStatus] = useState(true);
    const [loginData,setLoginData] = useState({name:'',image:''});
    const handleLoginData = (responseLoginStatus,responseLoginDataName,responseLoginDataImage) => {
        setLoginStatus(!loginStatus);
        setLoginData({name:responseLoginDataName,image:responseLoginDataImage})
    }
    return ( 
        <div>
            <Navbar loginStatus={loginStatus} loginData={loginData}/>
            {loginStatus
            ?
                <LoggedIn loginData={loginData} />
            :
                <LoggedOut loginStatus={loginStatus} handleLoginData={handleLoginData} />
            }
        </div>
    );
}
 
export default Home;