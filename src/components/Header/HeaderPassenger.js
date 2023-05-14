import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./assets/css/style.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
export default function HeaderPassenger() {
  return (
    <div>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">

          <div className="logo">
            <h1><a href="index.html"><span>convoi</span></a></h1>
            {/* <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid" /></a> */}
          </div>

          <nav id="navbar" className="navbar">
            <ul>
              <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
              <li><a className="nav-link scrollto" href="#about">About</a></li>
              <li><a className="nav-link scrollto" href="#features">Features</a></li>
              <li><a className="nav-link scrollto" href="#gallery">Gallery</a></li>
              <li><a className="nav-link scrollto" href="#team">Team</a></li>
              <li><a className="nav-link scrollto" href="#pricing">Pricing</a></li>          
              <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>

        </div>
      </header>
    </div>
  )
}
