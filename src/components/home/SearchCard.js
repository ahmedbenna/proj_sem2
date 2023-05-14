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
// import RideMap from '../RideMap';
//avatar____________________________
import "../common/driver/assets/css/bootstrap.min.css"
import "../common/driver/assets/css/fontawesome.css"
import "../common/driver/assets/css/styles.css"
// import Home from '../../home/Home';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DemandRide from './DemandRide';
import EditNoteIcon from '@mui/icons-material/EditNote';

import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
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


export default function DrivererPublication(props) {
    const idd = JSON.parse(localStorage.getItem('idd'))

    console.log(idd)
    const [isLoading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState(null);
    const [accept, setAccept] = React.useState(null);
    const [publication, setPublication] = React.useState(null);
    const [selectedPub, setSelectedPub] = useState()
    useEffect(() => {


        // getPublication()
    }, [isLoading])
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    // async function getPublication() {

    //     try {
    //         const response = await axios.get('/publication/conducteur/' + idd);
    //         console.log(response);
    //         setPublication(response.data);
    //         console.log("publication", publication);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const handleDelete = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await axios.delete('/publication/' + idd)
    //         console.log(response)
    //         getPublication()
    //         setLoading(false)
    //     }
    //     catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }

    // }
    // if (isLoading) {

    //     return <div className="App"><CircularProgress /></div>;
    // }
    return (
        <Card sx={{ minWidth: 275, margin: '50px' }}>
            <div style={{ padding: '50px' }}>
                <div class="history-items-container history-items-padding ">
                    <div class="history-item">


                        {/* <div id="map1"></div> */}

                        <div class="border-bottom-primary thin">
                            <div class="status-container">
                                <div class="date float-left">
                                    {moment(props.pub.dateDepart).calendar()}
                                </div>
                                <div class="status-none float-right text-uppercase">
                                    {props.pub.prix}DT
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
                                            placeholder="Enter an origin location" value={props.pub.lieuDepart} disabled />
                                    </div>
                                </div>
                                <div class="href-decoration-none">
                                    <div class="w-100 map-input-container map-input-container-bottom">
                                        <span class="map-input-icon"><img src="../icons/circle.svg" alt="Current Location Icon" /></span>
                                        <div style={{ height: '100px' }} class="map-input display-flex controls flex-1 align-items-center">
                                            {props.pub.lieuArrive}
                                        </div>
                                        <span class="dotted-line"></span>
                                        {/* <Typography>{props.pub.conducteur.prenom}{props.pub.conducteur.nom}</Typography> */}


                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div style={{ padding: '5px' }}>
                            <Typography variant='h6'> <DriveEtaIcon /> Driver: {props.pub.conducteur.prenom} {props.pub.conducteur.nom}</Typography>
                        </div>
                        <div style={{ padding: '5px' }}>
                            <Typography variant='body2' style={{ color: 'black' }} > <AirlineSeatReclineNormalIcon /> Available Seats: {props.pub.nbrePlace}</Typography>

                            <Divider />



                        </div>
                        <div style={{ padding: '5px' }}>

                            <Typography variant='body2' style={{ color: 'black' }}><EditNoteIcon /> Description: {props.pub.description}</Typography>
                        </div>
                        <div style={{
                            float: 'left',
                            width: '25 %'
                        }}>

                            <DemandRide pub={props.pub} />
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
                                <Button variant="contained" color="primary" ><QuestionAnswerOutlinedIcon /> Chat</Button>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>
        </Card>
    )
}
