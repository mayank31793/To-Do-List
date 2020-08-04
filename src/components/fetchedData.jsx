import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const ThemeContext = createContext();

const FetchedData = (props) => {
    const [name, setName] = useState("Mayank");

    useEffect(() => {
        axios.get('https://test-9515d.firebaseio.com/taskData.json')
            .then((res) => console.log(res.data))
    },[])

    return ( 
        <div>
            <ThemeContext.Provider value={{name}}>
                {props.children}
            </ThemeContext.Provider>
        </div>
    );
}
 
export default FetchedData;