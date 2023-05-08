import React from 'react'
import { Link } from 'react-router-dom';

export default function HeaderGuest() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <Link to="/Landing"className="navbar-brand" href="#">Covoi</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <Link to="/Landing" className="nav-link" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
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
