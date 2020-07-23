import React from 'react';
import { Switch, Route} from 'react-router-dom';

import styles from '../assets/styles/loggedIn.module.scss';
import Sidebar from './sidebar';
import Dashboard from './dashboard';
import All from './alltasks';
import Completed from './completedtasks';
import Pending from './pendingtasks';

const LoggedIn = (props) => {
    console.log(props.loginData.name);
    return ( 
        <div className={styles.container}>
            <div className={styles.main_container}>
                <div className={styles.sidebar_container}>
                    <Sidebar />
                </div>
                <div className={styles.sidebar_details_container}>
                    <Switch>
                        <Route exact path="/dashboard" render={() => <Dashboard title="Dashboard" />} />
                        <Route exact path="/all" render={() => <All title="All Tasks" />} />
                        <Route exact path="/completed" render={() => <Completed title="Completed Tasks" />} />
                        <Route exact path="/pending" render={() => <Pending title="Pending Tasks" />} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}
 
export default LoggedIn;