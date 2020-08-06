import React, { useState } from 'react';
import { Switch, Route} from 'react-router-dom';

import styles from '../assets/styles/loggedIn.module.scss';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import Progress from './progress';
import Completed from './completedtasks';
import Pending from './pendingtasks';
import NotFound from './NotFound';
import FetchedData from './fetchedData';

const LoggedIn = (props) => {
    return ( 
        <div className={styles.container}>
            <div className={styles.main_container}>
                <div className={styles.sidebar_container} style={{width: props.expand == true ? '20%': '5%'}}>
                    <Sidebar expand={props.expand} />
                </div>
                <div className={styles.sidebar_details_container}>
                    <Switch>
                        <Route exact path="/dashboard" render={() => <FetchedData><Dashboard title="Dashboard" userLoginData={props.loginData} /></FetchedData>} />
                        <Route exact path="/progress" render={() => <FetchedData><Progress title="In Progress" /></FetchedData>} />
                        <Route exact path="/completed" render={() => <FetchedData><Completed title="Completed Tasks" /></FetchedData> } />
                        <Route exact path="/pending" render={() => <FetchedData><Pending title="Pending Tasks" /></FetchedData> } />
                        <Route path='*' exact component={NotFound} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}
 
export default LoggedIn;