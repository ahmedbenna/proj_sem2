import { Avatar, Button, Card, CircularProgress, Divider, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
// import ContractDetails from './ContractDetails';
// import PublicationDeatils from './PublicationDeatilsDriver';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import moment from 'moment';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

//avatar____________________________
import "../common/driver/assets/css/bootstrap.min.css"
import "../common/driver/assets/css/fontawesome.css"
import "../common/driver/assets/css/styles.css"
// import Home from '../../home/Home';
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import DemandRide from './DemandRide';
import EditNoteIcon from '@mui/icons-material/EditNote';
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}


export default function DemandCard(props) {
    const idd = JSON.parse(localStorage.getItem('idd'))

    console.log(idd)


    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Card sx={{ minWidth: 275, margin: '50px' }}>
            <div style={{ padding: '50px' }}>
                <div class="history-items-container history-items-padding ">
                    <div class="history-item">

                        <div class="border-bottom-primary thin">
                            <div class="status-container">
                                <div class="date float-left">
                                    {moment(props.pub.publication.dateDepart).calendar()}
                                </div>
                                <div class="status-none float-right text-uppercase">
                                    {props.pub.publication.prix}DT
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>

                        <div class="addresses-container position-relative">
                            <div class="height-auto">
                                <div class="w-100 map-input-container map-input-container-top">
                                    <span class="fas fa-location-arrow location-icon-rotate  map-input-icon"></span>
                                    <div class="map-input display-flex" style={{ height: '100px' }}>
                                        <input class="controls flex-1 font-weight-light" type="text"
                                            placeholder="Enter an origin location" value={props.pub.publication.lieuDepart} disabled />
                                    </div>
                                </div>
                                <div class="href-decoration-none">
                                    <div class="w-100 map-input-container map-input-container-bottom">
                                        <span class="map-input-icon"><img src="../icons/circle.svg" alt="Current Location Icon" /></span>
                                        <div style={{ height: '100px' }} class="map-input display-flex controls flex-1 align-items-center">
                                            {props.pub.publication.lieuArrive}
                                        </div>
                                        <span class="dotted-line"></span>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div style={{ padding: '5px' }}>
                            <Typography variant='h6'> <DriveEtaIcon /> Driver: {props.pub.conducteur.prenom} {props.pub.conducteur.nom}</Typography>
                        </div>
                        <div style={{ padding: '5px' }}>
                            <Typography variant='body2' style={{ color: 'black' }} > <AirlineSeatReclineNormalIcon /> Available Seats: {props.pub.publication.nbrePlace}</Typography>

                            <Divider />



                        </div>
                        <div style={{ padding: '5px' }}>

                            <Typography variant='body2' style={{ color: 'black' }}><EditNoteIcon /> Description: {props.pub.publication.description}</Typography>
                        </div>
                        <div style={{
                            float: 'right',
                            width: '25 %'
                        }}>
                            <Link
                                to={{
                                    pathname: "/chatWithDriver",
                                    state: {
                                        driver: props.pub.conducteur
                                    },
                                }}
                            >
                                <Button variant="contained" color="primary" ><QuestionAnswerOutlinedIcon /> Chat with driver</Button>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>
        </Card >
    )
}
