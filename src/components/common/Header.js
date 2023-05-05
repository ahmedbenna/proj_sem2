import React from 'react'
import HeaderDriver from './HeaderDriver';
import HeaderGuest from './HeaderGuest';
import HeaderPassenger from './HeaderPassenger';


function Header() {
    return (
        localStorage.getItem('idp') ?
            <HeaderPassenger />
            : localStorage.getItem('idd') ?
                <HeaderDriver />
                : <HeaderGuest />
    )
    
};
export default Header;


