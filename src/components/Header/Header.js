import React from 'react'
import HeaderDriver from './HeaderDriver';
import HeaderGuest from './HeaderGuest';
import HeaderPassenger from './HeaderPassenger';


function Header() {
    return (
        <div style={{ paddingBottom: '80px' }}>
            {localStorage.getItem('idp') ?
                <HeaderPassenger />
                : localStorage.getItem('idd') ?
                    <HeaderDriver />
                    : <HeaderGuest />
            }
        </div>
    )

};
export default Header;


