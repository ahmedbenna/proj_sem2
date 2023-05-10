import React from 'react'

import "./assets/passengerProfile.css"
// import 'bootstrap/dist/js/bootstrap.bundle.min';

// import { useEffect, useState } from 'react'
import { CircularProgress, Button } from '@mui/material';
import axios from 'axios';
// import ClientContractsList from './ClientContractsList';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Avatar from './assets/avatar.png'
import PassengerPublication from './PassengerPublication';



export default function PassengerProfile() {
    const idp = JSON.parse(localStorage.getItem('idp'))

    const [loading, setLoading] = React.useState(true);
    const [passenger, setPassenger] = React.useState(null);
    React.useEffect(() => {
        async function getClient() {
            try {
                const response = await axios.get('/passager/' + idp);
                console.log(response);
                setPassenger(response.data);
                console.log("ccccc", passenger);
                setLoading(false);
            } catch (error) {
                console.error("dfgfdfd",error);
            }
        }
        getClient()
    }, [loading])
    console.log('pppppp',passenger)
    if (loading) {

        return <div ><CircularProgress /></div>
    }
    return (

        <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={Avatar} alt="" />
                            {/* <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file" />
                            </div> */}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                            <h5>
                                {passenger.prenom} {passenger.nom}
                            </h5>
                            <Link to='/editPassengerProfile'>
                                <Button >Edit Profile </Button>
                            </Link>

                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Contracts</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <div class="col-md-2">
                        <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                    </div> */}
                </div>
                <div class="row">
                    {/* <div class="col-md-4">
                        <div class="profile-work">
                            <p>WORK LINK</p>
                            <a href="">Website Link</a><br />
                            <a href="">Bootsnipp Profile</a><br />
                            <a href="">Bootply Profile</a>
                            <p>SKILLS</p>
                            <a href="">Web Designer</a><br />
                            <a href="">Web Developer</a><br />
                            <a href="">WordPress</a><br />
                            <a href="">WooCommerce</a><br />
                            <a href="">PHP, .Net</a><br />
                        </div>
                    </div> */}
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>First Name</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{passenger.prenom} </p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Last Name</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{passenger.nom}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{passenger.email}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Phone</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p>{passenger.telephone}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Birthday</label>
                                    </div>
                                    <div class="col-md-6">
                                    <p>{moment(passenger.dateDeNaissance).format("dddd, MMMM Do YYYY")}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <Link to='/search'>
                                    <Button> search a provider</Button>
                                </Link>
                                <PassengerPublication />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
