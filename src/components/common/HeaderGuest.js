import React from 'react'
import { Link } from 'react-router-dom';
import background from './header.jpg'
import logo from "./cover2.png"

export default function HeaderGuest() {
    return (
        <nav style={{backgroundColor:'#003fba'}} className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
                <Link to="/"className="navbar-brand" >
                <img src={logo} height={40} />

                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" >About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" >Services</a>
                        </li>
                        <li className="nav-item">
                            <Link to="/loginPaasenger" className="nav-link" >Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
