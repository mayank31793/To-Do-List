import React, { useState } from 'react';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import styles from '../assets/styles/loggedOut.module.scss';

const LoggedOut = (props) => {
    const responseAuth = (response) => {
        if('graphDomain' in response){
            props.handleLoginData(!props.loginStatus,response.name,response.picture.data.url,response.id);
            console.log(response);
            localStorage.setItem('userId',response.id)
        }
        else if('profileObj' in response){
            props.handleLoginData(!props.loginStatus,response.profileObj.name,response.profileObj.imageUrl,response.profileObj.googleId);
            console.log(response);
            localStorage.setItem('userId',response.profileObj.googleId)
        }
        else{
            props.handleLoginData(props.loginStatus,null,null);
        }
    }

    const componentClicked = (data) => {
        console.log(data);
    }

    return ( 
        <div className={styles.container}>
            <div className={styles.main_container}>
                <div className={styles.image_container}>
                    <div className={styles.image_div}>
                        <img src="https://vil.xlri.ac.in/emdp/assets/images/login.svg" alt="login image" />
                    </div>
                </div>
                <div className={styles.loginform_container}>
                    <div className={styles.login_form}>
                        <p className={styles.paragraph}>SignUp / SignIn with</p>
                        <div className={styles.google_login}>
                            <GoogleLogin 
                                clientId="146469123782-kqf593qh32a6k7t5dq667miunu5sek33.apps.googleusercontent.com"
                                buttonText="Login With Google"
                                onSuccess={responseAuth}  
                                onFailure={responseAuth}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <p className={styles.paragraph}>---- OR ----</p>
                        <div className={styles.facebook_login}>
                            <FacebookLogin
                                appId="706223930200877"
                                autoLoad={true}
                                fields="name,email,picture"
                                onClick={componentClicked}
                                callback={responseAuth} 
                            />
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}
 
export default LoggedOut;