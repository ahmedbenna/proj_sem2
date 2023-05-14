import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./assets/css/style.css"
import { Link } from 'react-router-dom';
import logo from "./default.svg"

export default function HeaderGuest() {
  return (
    <div>
      <header id="header" class="fixed-top d-flex align-items-center ">
        <div class="container d-flex align-items-center justify-content-between">

          <div class="logo">
            <h1><Link to="/"  ><span>convoi</span></Link></h1>

          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li><Link to="/" className="nav-link scrollto active" >Home</Link></li>
              {/* <li><Link  to="/profilePasssenger" className="nav-link scrollto" ><AccountCircleIcon />  {passager.prenom} {passager.nom}</Link></li> */}
              <li><a className="nav-link scrollto" href="#features">Features</a></li>
              <li><a className="nav-link scrollto" href="#gallery">Gallery</a></li>
              <li><a className="nav-link scrollto" href="#team">Team</a></li>
              <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
              <li> <Link to="/loginPaasenger" className="nav-link" >Login</Link></li>

              {/* <li><Button className="nav-link scrollto" onClick={logout}><LogoutIcon /> LOGOUT </Button></li> */}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

        </div>
      </header>
    </div>
  )
}
