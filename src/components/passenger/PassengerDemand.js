import { CircularProgress, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
// import ContractDetails from './ContractDetails';
import PublicationDeatilsPassenger from './PublicationDeatilsPassenger';
import moment from 'moment';



export default function PassengerDemand() {
    const idp = JSON.parse(localStorage.getItem('idp'))

    console.log(idp.id)
    const [isLoading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState(null);
    const [accept, setAccept] = React.useState(null);
    const [reject, setReject] = React.useState(null);
    const [error, setError] = React.useState(false);


    useEffect(() => {

        async function getDemande() {
            try {
                const response = await axios.get('/demande/pending/passager/' + idp );
                console.log(response);
                setPending(response.data);
                console.log("pending", pending);
                // setLoading(false);
            } catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get('/demande/accepter/passager/' + idp );
                console.log(response);
                setAccept(response.data);
                console.log("accept", accept);
                // setLoading(false);
            } catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get('/demande/rejeter/passager/' + idp );
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

    // const handleCancelRide = async (id)=>{
    //     setError(false)
    //     // setLoading(true)
    //     try{
    //         const response = await axios.delete('/demande/'+id)
    //         console.log(response)
    //         // setLoading(false)
    //     }catch(error){
    //         console.log(error)
    //         setError(true)
    //         // setLoading(false)

    //     }
    // }
    if (isLoading) {

        return <div className="App"><CircularProgress /></div>;
    }
    return (
        <div>
            {(pending) ? (
                <> 
                <div class="col-md-6">
                    <label>Pendings</label>
                </div>
                    <table class="table align-middle mb-0 bg-white">
                        <thead class="bg-light">
                            <tr>
                                <th>Driver</th>
                                <th>Trip</th>
                                {/* <th>response</th> */}
                                {/* <th>Position</th>
                        <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {pending.map(cont =>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">

                                            <div class="ms-3">
                                                <p class="fw-bold mb-1">{cont.conducteur.prenom} {cont.conducteur.nom}</p>
                                                <p class="text-muted mb-0">{cont.conducteur.email}</p>
                                                <p class="text-muted mb-0">{moment(cont.publication.dateDepart).calendar()}</p>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="fw-normal mb-1">{cont.publication.lieuDepart}</p>
                                        <p class="text-muted mb-0">{cont.publication.lieuArrive}</p>
                                    </td>
                                    <td>
                                        
                                        {/* <span onClick={handleCancelRide(cont.id)} class="badge badge-danger rounded-pill d-inline">Cancle</span> */}
                                        {(error)?(<Typography style={{color:'red'}} > error</Typography>):('')}
                                    </td>
                                    <td>
                                        {/* <PublicationDeatilsPassenger c={cont} /> */}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>

            ) : ('')
            (accept)?(
                <> 
                <div class="col-md-6">
                    <label>Pendings</label>
                </div>
                    <table class="table align-middle mb-0 bg-white">
                        <thead class="bg-light">
                            <tr>
                            <th>Driver</th>
                                <th>Trip</th>
                                <th>response</th>
                                {/* <th>Position</th>
                        <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {accept.map(cont =>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">

                                            <div class="ms-3">
                                                <p class="fw-bold mb-1">{cont.conducteur.prenom} {cont.conducteur.nom}</p>
                                                <p class="text-muted mb-0">{cont.conducteur.email}</p>
                                                <p class="text-muted mb-0">{moment(cont.publication.dateDepart).calendar()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {/* <p class="fw-normal mb-1">{cont.publicqtion.lieuDepart}</p>
                                        <p class="text-muted mb-0">{cont.publication.lieuArrive}</p> */}
                                    </td>
                                    <td>
                                        <span class="badge badge-danger rounded-pill d-inline">Cancle</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ):('')
            (reject)?(
                <> 
                <div class="col-md-6">
                    <label>Pendings</label>
                </div>
                    <table class="table align-middle mb-0 bg-white">
                        <thead class="bg-light">
                            <tr>
                            <th>Driver</th>
                                <th>Trip</th>
                                <th>response</th>
                                {/* <th>Position</th>
                        <th>Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {reject.map(cont =>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">

                                            <div class="ms-3">
                                                <p class="fw-bold mb-1">{cont.conducteur.prenom} {cont.conducteur.nom}</p>
                                                <p class="text-muted mb-0">{cont.conducteur.email}</p>
                                                <p class="text-muted mb-0">{moment(cont.publication.dateDepart).calendar()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {/* <p class="fw-normal mb-1">{cont.publicqtion.lieuDepart}</p>
                                        <p class="text-muted mb-0">{cont.publication.lieuArrive}</p> */}
                                    </td>
                                    <td>
                                        <span class="badge badge-danger rounded-pill d-inline">Cancle</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ):('')
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