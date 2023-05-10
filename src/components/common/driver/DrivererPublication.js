import { CircularProgress } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
// import ContractDetails from './ContractDetails';
import PublicationDeatils from './PublicationDeatilsDriver';



export default function DrivererPublication() {
    const idd = JSON.parse(localStorage.getItem('idd'))

    console.log(idd)
    const [isLoading, setLoading] = React.useState(true);
    const [pending, setPending] = React.useState(null);
    const [accept, setAccept] = React.useState(null);
    const [reject, setReject] = React.useState(null);

    useEffect(() => {

        async function getDemande() {
            try {
                const response = await axios.get('/demande/pending/conducteur/' + idd );
                console.log(response);
                setPending(response.data);
                console.log("pending", pending);
                // setLoading(false);
            } catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get('/demande/accepter/conducteur/' + idd );
                console.log(response);
                setAccept(response.data);
                console.log("accept", accept);
                // setLoading(false);
            } catch (error) {
                console.error(error);
            }
            try {
                const response = await axios.get('/demande/rejeter/conducteur/' + idd );
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
                                                <p class="fw-bold mb-1">{cont.provider.firstName} {cont.provider.lastName}</p>
                                                <p class="text-muted mb-0">{cont.provider.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="fw-normal mb-1">{cont.provider.speciality.label}</p>
                                        <p class="text-muted mb-0">{cont.job.title}</p>
                                    </td>
                                    <td>
                                        <PublicationDeatils c={cont} />
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
                                                <p class="fw-bold mb-1">{cont.provider.firstName} {cont.provider.lastName}</p>
                                                <p class="text-muted mb-0">{cont.provider.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="fw-normal mb-1">{cont.provider.speciality.label}</p>
                                        <p class="text-muted mb-0">{cont.job.title}</p>
                                    </td>
                                    {/* <td>
                                        <span class="badge badge-success rounded-pill d-inline">{cont.response}</span>
                                    </td> */}
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
                                                <p class="fw-bold mb-1">{cont.provider.firstName} {cont.provider.lastName}</p>
                                                <p class="text-muted mb-0">{cont.provider.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="fw-normal mb-1">{cont.provider.speciality.label}</p>
                                        <p class="text-muted mb-0">{cont.job.title}</p>
                                    </td>
                                    {/* <td>
                                        <span class="badge badge-success rounded-pill d-inline">{cont.response}</span>
                                    </td> */}
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