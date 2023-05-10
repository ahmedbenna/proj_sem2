import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import Context from "../../context";
import axios from "axios";
import Loading from "./Loading";
import { Button, CircularProgress } from "@mui/material";

const HeaderDriver = () => {
    const [driver, setDriver] = useState();
    const [isLoading, setIsloading] = useState(true);

    const id = JSON.parse(localStorage.getItem('idd'))
    const getUser = async () => {
        try {
            const response = await axios.get('/conducteur/' + id);
            console.log(response);
            
            setDriver(response.data)
            setIsloading(false)
            console.log('aaaaaaaaaaaaaaa', response.data)

        } catch (error) {
            console.error(error);
            localStorage.removeItem('idd')
        }
    }
    useEffect(() => {
        getUser()
    }, [isLoading]);
    const history = useHistory();

    const logout = () => {
        // const isLogout = window.confirm("Do you want to log out ?");
        // if (isLogout) {

            removeAuthedInfo();
            window.location = '/'
        // }
    };

    // console.error('aaa')
    const removeAuthedInfo = () => {
        // setUser(null);
        localStorage.removeItem("idd");
    };
    console.log('pass', driver)
    if (isLoading) {

        return <div className="App"><CircularProgress /></div>;
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand" >Covoi</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        <br />
                        <li className="nav-item">
                            <Link className="nav-link" to="/driverProfile"><AccountCircleIcon />  {driver.prenom} {driver.nom} </Link>
                        </li>
                        <li className="nav-item">
                            <Button color="secondary" className="nav-link" onClick={logout}><LogoutIcon /> LOGOUT </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        //   <div className="header">
        //     <div className="header__left">
        //       <span>Uber Clone</span>
        //       {(driver) ? (
        //         <div className="header__right">
        //           {/* <img src={driver.image} alt={driver.email} /> */}
        //           <span>Hello, {driver.nom} {driver.prenom} </span>
        //         </div>
        //       ) : ('')}
        //     </div>
        //     <span className="header__logout" onClick={logout}>
        //       <span>Logout</span>
        //     </span>
        //   </div>
    );
    // else 
    // return(<Loading/>)
};

export default HeaderDriver;
