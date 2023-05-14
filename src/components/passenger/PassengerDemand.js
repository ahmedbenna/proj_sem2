import { CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
// import ContractDetails from './ContractDetails';
import PublicationDeatilsPassenger from './PublicationDeatilsPassenger';
import moment from 'moment';
import RideMap from '../common/RideMap';
import DemandCard from './DemandCard';
import './DemandCard.css'
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
const style = {

}

export default function PassengerDemand() {
    const idp = JSON.parse(localStorage.getItem('idp'))

    console.log(idp.id)
    const [isLoading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState(null);
    const [accept, setAccept] = React.useState(null);
    const [reject, setReject] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [selectedPub, setSelectedPub] = useState()


    useEffect(() => {

        async function getDemande() {
            try {
                const response = await axios.get('/demande/pending/passager/' + idp);
                console.log(response);
                setPending(response.data);
                console.log("pending", pending);
                // setLoading(false);
            } catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get('/demande/accepter/passager/' + idp);
                console.log(response);
                setAccept(response.data);
                console.log("accept", accept);
                // setLoading(false);
            } catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get('/demande/rejeter/passager/' + idp);
                console.log(response);
                setReject(response.data);
                console.log("reject", reject);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getDemande()
    }, [isLoading])


    if (isLoading) {

        return <div className="App"><CircularProgress /></div>;
    }
    return (
        <div>
            <div>
                {(selectedPub) ? (
                    <RideMap pub={selectedPub} />

                ) : ('')}
            </div>
            {(pending) ? (
                <>
                    <div class="col-md-6">
                        <label>Pendings</label>
                    </div>

                    {pending.map(pub =>
                        <div href='#' className='box' onClick={() => {
                            console.log("hi")
                            setSelectedPub(pub.publication)
                        }}>
                            <DemandCard pub={pub} />

                        </div>


                    )}

                </>

            ) : ('')
                (accept) ? (
                <>
                    <div class="col-md-6">
                        <label>Accepted</label>
                    </div>

                    {accept.map(pub =>
                        <div href='#' className='box' onClick={() => {
                            console.log("hi")
                            setSelectedPub(pub.publication)
                        }}>
                            <DemandCard pub={pub} />

                        </div>
                    )}

                </>
            ) : ('')
                (reject) ? (
                <>
                    <div class="col-md-6">
                        <label>Rejected</label>
                    </div>

                    {reject.map(pub =>
                        <div href='#' className='box' onClick={() => {
                            console.log("hi")
                            setSelectedPub(pub.publication)
                        }}>
                            <DemandCard pub={pub} />

                        </div>
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