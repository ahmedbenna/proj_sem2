import { Button, Card, CircularProgress, Divider, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
// import ContractDetails from './ContractDetails';
import PublicationDeatils from './PublicationDeatilsDriver';
import RideMap from '../RideMap';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

export default function DemandList() {
    const idd = JSON.parse(localStorage.getItem('idd'))

    console.log(idd)
    const [isLoading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState([]);
    const [accept, setAccept] = React.useState([]);
    const [reject, setReject] = React.useState(null);
    const [selectedPub, setSelectedPub] = useState(null)

    async function getDemande() {
        try {
            const response = await axios.get('/demande/pending/conducteur/' + idd);
            console.log(response);
            setPending(response.data);
            console.log("pending", pending);
            // setLoading(false);
        } catch (error) {
            console.error(error);
        }
        try {
            const response = await axios.get('/demande/accepter/conducteur/' + idd);
            console.log(response);
            setAccept(response.data);
            console.log("accept", accept);
            // setLoading(false);
        } catch (error) {
            console.error(error);
        }
        try {
            const response = await axios.get('/demande/rejeter/conducteur/' + idd);
            console.log(response);
            setReject(response.data);
            console.log("reject", reject);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {


        getDemande()
    }, [isLoading])

    const handleDelete = async (id) => {
        setLoading(true)
        try {
            const response = await axios.delete('/demande/reject' + id)
            console.log(response)
            getDemande()
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    const acceptDemand = async (id) => {
        setLoading(true)
        try {
            const response = await axios.delete('/demande/accepter' + id)
            console.log(response)
            getDemande()
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    if (isLoading) {

        return <div className="App"><CircularProgress /></div>;
    }
    return (
        <div>
            <div>
                <RideMap pub={selectedPub} />
            </div>
            {
                (pending != []) ? (
                    <>
                        <div class="col-md-6">
                            <label>Pending Rides List</label>
                        </div>

                        {pending.map(pub =>
                            <>
                                <Card sx={{ padding: '20px', minWidth: 275, margin: '50px' }}>

                                    <div class="history-items-container history-items-padding ">
                                        <div class="history-item">


                                            {/* <RideMap pub={pub} /> */}

                                            <div class="border-bottom-primary thin">
                                                <div class="status-container">
                                                    <div class="date float-left">
                                                        {moment(pub.publication.dateDepart).calendar()}
                                                    </div>
                                                    <div class="status-none float-right text-uppercase">
                                                        {pub.publication.prix}DT
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
                                                                placeholder="Enter an origin location" value={pub.publication.lieuDepart} disabled />
                                                        </div>
                                                    </div>
                                                    <div class="href-decoration-none">
                                                        <div class="w-100 map-input-container map-input-container-bottom">
                                                            <span class="map-input-icon"><img src="../icons/circle.svg" alt="Current Location Icon" /></span>
                                                            <div style={{ height: '100px' }} class="map-input display-flex controls flex-1 align-items-center">
                                                                {pub.publication.lieuArrive}
                                                            </div>
                                                            <span class="dotted-line"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ padding: '5px' }}>
                                                <Typography variant='h6'> <PersonIcon /> Client: {pub.passager.prenom} {pub.passager.nom}</Typography>
                                                <Typography variant='h6'> <EmailIcon /> Email: {pub.passager.email}</Typography>                                            </div>
                                            <div style={{ padding: '5px' }}>
                                                <Typography variant='body2' style={{ color: 'black' }} > <AirlineSeatReclineNormalIcon /> Available Seats: {pub.nbrePlace}</Typography>
                                                <Divider />
                                            </div>
                                            <div>
                                                <div>
                                                    <div style={{
                                                        float: 'right',
                                                        background: 'blue',
                                                        width: '25 %'
                                                    }}>
                                                        {/* <Link to='/editRide' state={{ pub: pub }}> */}
                                                        <Button onClick={() => acceptDemand(pub.id)} variant='contained'>Accept</Button>
                                                        {/* </Link> */}
                                                    </div>
                                                    <div style={{ alignContent: 'flex-end' }}>
                                                        <Button onClick={() => handleDelete(pub.id)} variant='contained' style={{ backgroundColor: 'red' }} > reject</Button>

                                                    </div>
                                                </div>
                                                <div style={{ padding: '20px' }}>
                                                    <Button href='#' onClick={() => setSelectedPub(pub.publication)} style={{ color: 'white' }} class="btn btn-primary w-100 box-shadow-0 font-weight-light text-uppercase">Show in Map</Button>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Card>

                            </>

                        )}

                    </>
                ) : ('')
            }
            {
                (accept != []) ? (
                    <>
                        <div class="col-md-6">
                            <label>Accept Rides List</label>
                        </div>

                        {accept.map(pub =>
                            <>
                                <Card sx={{ minWidth: 275, margin: '50px' }}>

                                    <div class="history-items-container history-items-padding ">
                                        <div class="history-item">


                                            {/* <RideMap pub={pub} /> */}

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
                                                    <div class="href-decoration-none">
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
                                            <div style={{ padding: '5px' }}>
                                                <Typography variant='h6'> <PersonIcon /> Client: {pub.passager.prenom} {pub.passager.nom}</Typography>
                                                <Typography variant='h6'> <EmailIcon /> Email: {pub.passager.email}</Typography>                                            </div>
                                            <div style={{ padding: '5px' }}>
                                                <Typography variant='body2' style={{ color: 'black' }} > <AirlineSeatReclineNormalIcon /> Available Seats: {pub.nbrePlace}</Typography>
                                                <Divider />
                                            </div>
                                            <div>
                                                <div>
                                                    <div style={{
                                                        float: 'right',
                                                        background: 'blue',
                                                        width: '25 %'
                                                    }}>
                                                        <Link to='/editRide' state={{ pub: pub }}>
                                                            <Button variant='contained'>edit</Button>
                                                        </Link>
                                                    </div>
                                                    <div style={{ alignContent: 'flex-end' }}>
                                                        <Button onClick={handleDelete} variant='contained' style={{ backgroundColor: 'red' }} > delete</Button>

                                                    </div>
                                                </div>
                                                <div style={{ padding: '20px' }}>
                                                    <Button href='#' onClick={() => setSelectedPub(pub)} style={{ color: 'white' }} class="btn btn-primary w-100 box-shadow-0 font-weight-light text-uppercase">Show in Map</Button>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Card>

                            </>

                        )}

                    </>
                ) : ('')
            }
            {
                (reject !== null) ? (
                    <>
                        <div class="col-md-6">
                            <label>Rejected Rides List</label>
                        </div>

                        {reject.map(pub =>
                            <>
                                <Card sx={{ minWidth: 275, margin: '50px' }}>

                                    <div class="history-items-container history-items-padding ">
                                        <div class="history-item">


                                            {/* <RideMap pub={pub} /> */}

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
                                                    <div class="href-decoration-none">
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
                                            <div style={{ padding: '5px' }}>
                                                <Typography variant='h6'> <PersonIcon /> Client: {pub.passager.prenom} {pub.passager.nom}</Typography>
                                                <Typography variant='h6'> <EmailIcon /> Email: {pub.passager.email}</Typography>
                                            </div>
                                            <div style={{ padding: '5px' }}>
                                                <Typography variant='body2' style={{ color: 'black' }} > <AirlineSeatReclineNormalIcon /> Available Seats: {pub.nbrePlace}</Typography>
                                                <Divider />
                                            </div>
                                            <div>
                                                <div>
                                                    <div style={{
                                                        float: 'right',
                                                        background: 'blue',
                                                        width: '25 %'
                                                    }}>
                                                        <Link to='/editRide' state={{ pub: pub }}>
                                                            <Button variant='contained'>edit</Button>
                                                        </Link>
                                                    </div>
                                                    <div style={{ alignContent: 'flex-end' }}>
                                                        <Button onClick={handleDelete} variant='contained' style={{ backgroundColor: 'red' }} > delete</Button>

                                                    </div>
                                                </div>
                                                <div style={{ padding: '20px' }}>
                                                    <Button href='#' onClick={() => setSelectedPub(pub)} style={{ color: 'white' }} class="btn btn-primary w-100 box-shadow-0 font-weight-light text-uppercase">Show in Map</Button>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Card>

                            </>

                        )}

                    </>
                ) : ('')
            }


        </div>
    )
}
{/* <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <img
                                    src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                                    class="rounded-circle"
                                    alt=""
                                    style={{ width: '45px', height: '45px' }}
                                />
                                <div class="ms-3">
                                    <p class="fw-bold mb-1">Alex Ray</p>
                                    <p class="text-muted mb-0">alex.ray@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">Consultant</p>
                            <p class="text-muted mb-0">Finance</p>
                        </td>
                        <td>
                            <span class="badge badge-primary rounded-pill d-inline"
                            >Onboarding</span
                            >
                        </td>
                        <td>Junior</td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-link btn-rounded btn-sm fw-bold"
                                data-mdb-ripple-color="dark"
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="d-flex align-items-center">
                                <img
                                    src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                                    class="rounded-circle"
                                    alt=""
                                    style={{ width: '45px', height: '45px' }}
                                />
                                <div class="ms-3">
                                    <p class="fw-bold mb-1">Kate Hunington</p>
                                    <p class="text-muted mb-0">kate.hunington@gmail.com</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="fw-normal mb-1">Designer</p>
                            <p class="text-muted mb-0">UI/UX</p>
                        </td>
                        <td>
                            <span class="badge badge-warning rounded-pill d-inline">Awaiting</span>
                        </td>
                        <td>Senior</td>
                        <td>
                            <button
                                type="button"
                                class="btn btn-link btn-rounded btn-sm fw-bold"
                                data-mdb-ripple-color="dark"
                            >
                                Edit
                            </button>
                        </td>
                    </tr> */}