import { Avatar, Button, CircularProgress, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
// import ContractDetails from './ContractDetails';
import PublicationDeatils from './PublicationDeatilsDriver';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'; import moment from 'moment';
import RideMap from '../RideMap';
//avatar____________________________
import "./assets/css/bootstrap.min.css"
import "./assets/css/fontawesome.css"
import "./assets/css/styles.css"
import Home from '../../home/Home';

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


export default function DrivererPublication() {
    const idd = JSON.parse(localStorage.getItem('idd'))

    console.log(idd)
    const [isLoading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState(null);
    const [accept, setAccept] = React.useState(null);
    const [publication, setPublication] = React.useState(null);

    useEffect(() => {

        async function getPublication() {

            try {
                const response = await axios.get('/publication/conducteur/' + idd);
                console.log(response);
                setPublication(response.data);
                console.log("publication", publication);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getPublication()
    }, [isLoading])
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    if (isLoading) {

        return <div className="App"><CircularProgress /></div>;
    }
    return (
        <div>
            <div>
                <RideMap />
            </div>
            {
                (publication) ? (
                    <>
                        <div class="col-md-6">
                            <label>Rides List</label>
                        </div>
                        <table class="table align-middle mb-0 bg-white">
                            {/* <br style={{border:'2px',color:'#0000'}}/> */}
                            {/* <thead class="bg-light">
                                <tr>
                                    <th>Driver</th>
                                    <th>Trip</th>
                                    <th>response</th>
                                    {/* <th>Position</th>
                        <th>Actions</th> */}
                            {/* </tr>
                            </thead> */}
                            <tbody>
                                {publication.map(pub =>
                                    <>

                                        <div class="history-items-container history-items-padding ">
                                            <div class="history-item">


                                                {/* <div id="map1"></div> */}

                                                <div class="border-bottom-primary thin">
                                                    <div class="status-container">
                                                        <div class="date float-left">
                                                            {moment(pub.dateDepart).calendar()}
                                                        </div>
                                                        <div class="status-none float-right text-uppercase">
                                                            {pub.prix}DT
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
                                                                    placeholder="Enter an origin location" value={pub.lieuDepart} disabled />
                                                            </div>
                                                        </div>
                                                        <div  class="href-decoration-none">
                                                            <div class="w-100 map-input-container map-input-container-bottom">
                                                                <span class="map-input-icon"><img src="../icons/circle.svg" alt="Current Location Icon" /></span>
                                                                <div style={{ height: '100px' }} class="map-input display-flex controls flex-1 align-items-center">
                                                                    {pub.lieuArrive}
                                                                </div>
                                                                <span class="dotted-line"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button  class="btn btn-primary w-100 box-shadow-0 font-weight-light text-uppercase">Show in Map</Button>
                                                </div>
                                            </div>
                                        </div>

                                    </>

                                )}
                            </tbody>
                        </table>
                    </>
                ) : ('')
            }
            

        </div>
    )
}
