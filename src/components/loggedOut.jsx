import React, { useState } from 'react';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const LoggedOut = (props) => {
    const responseAuth = (response) => {
        if('graphDomain' in response){
            props.handleLoginData(!props.loginStatus,response.name,response.picture.data.url);
        }
        else if('profileObj' in response){
            props.handleLoginData(!props.loginStatus,response.profileObj.name,response.profileObj.imageUrl);
        }
        else{
            props.handleLoginData(props.loginStatus,null,null);
        }
    }

    const componentClicked = (data) => {
        console.log(data);
    }

    return ( 
        <div>
            <p>this is Logged Out</p>
            <button onClick={props.handleLoginStatus}>Login</button>
                                <GoogleLogin 
                                    clientId="146469123782-kqf593qh32a6k7t5dq667miunu5sek33.apps.googleusercontent.com"
                                    buttonText="Login With Google"
                                    onSuccess={responseAuth}  
                                    onFailure={responseAuth}
                                    cookiePolicy={'single_host_origin'}
                                />
                                <FacebookLogin
                                    appId="706223930200877"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    onClick={componentClicked}
                                    callback={responseAuth} 
                                />
        </div>
    );
}
 
export default LoggedOut;