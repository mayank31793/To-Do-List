import React,{ createContext, useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';

export const ExpandContext = createContext();

const NavbarContext = (props) => {

    const [expandSidebar,setExpandSidebar] = useState(false)
    const handleExpand = () => {
        console.log('this is the end')
        setExpandSidebar(!expandSidebar)
    }

    return ( 
        <div>
            <ExpandContext.Provider value={{setExpandSidebar,handleExpand}}>
                {propTypes.children}
            </ExpandContext.Provider>
        </div>
    );
}
 
export default NavbarContext;