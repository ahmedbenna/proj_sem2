import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./assets/css/style.css"

import { Link } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { CometChat } from '@cometchat-pro/chat';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
export default function HeaderPassenger() {

  const [passager, setPassager] = useState();
  const [isLoading, setIsloading] = useState(true);

  const id = JSON.parse(localStorage.getItem('idp'))



  const getUser = async () => {
    try {
      const response = await axios.get('/passager/' + id.id);
      console.log(response);
      setPassager(response.data)
      setIsloading(false)

      console.log('ppppppp', response.data)

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/passager/' + id);
        console.log(response);
        setPassager(response.data)
        setIsloading(false)

        console.log('ppppppp', response.data)

      } catch (error) {
        console.error(error);
        localStorage.removeItem('idp')
      }
    }
    getUser()
  }, [isLoading]);

  const logout = () => {
    // const isLogout = window.confirm("Do you want to log out ?");
    // if (isLogout) {

    removeAuthedInfo();
    CometChat.logout().then(
      () => {
        console.log("Logout completed successfully");
        window.location = '/'

      },error=>{
        console.log("Logout failed with exception:",{error});
      }
    );
    // }
  };

  const removeAuthedInfo = () => {
    // setUser(null);
    localStorage.removeItem("idp");
  };
  console.log('pass', passager)
  if (isLoading) {

    return <div className="App"><CircularProgress /></div>;
  }

  return (
    <div>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">

          <div className="logo">
            <h1><Link to="/"  ><span>Erba7 Wa9tek</span></Link></h1>
            {/* <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a> */}
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li><Link to="/"  className="nav-link  active" >Home</Link></li>
              <li><Link  to="/profilePasssenger" className="nav-link " ><AccountCircleIcon />  {passager.prenom} {passager.nom}</Link></li>
              <li><a className="nav-link " href="#features">Features</a></li>
              <li><a className="nav-link " href="#gallery">Gallery</a></li>
              <li><a className="nav-link " href="#team">Team</a></li>
              <li><Link to='/chatForPassenger' className="nav-link scrollto" ><QuestionAnswerOutlinedIcon/> Chat</Link></li>
              <li><Button style={{color:'white', marginLeft:'20px'}} className="nav-link " onClick={logout}><LogoutIcon /> LOGOUT </Button></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

        </div>
      </header>
    </div>
  )
}
