import React, { useEffect, useState } from 'react'
import DemandCard from '../passenger/DemandCard'
import axios from 'axios'
import { Button, CircularProgress, Typography } from '@mui/material'
import RideCard from './RideCard'

export default function RidsList() {

    const [isLoading, setIsLoading] = useState(true)
    const [publist, setPublist] = useState([])
    const [expanded, setExpanded] = useState(false)
    const [dataForDisplayy, setDataForDisplayy] = useState(false)
    const dataForDisplay = expanded ? publist : publist.slice(0, 2)

    useEffect(() => {
        const getRids = async () => {
            try {
                const respons = await axios.get('/publication/')
                console.log(respons)
                setPublist(respons.data)
                setIsLoading(false)

            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        getRids()
    }, [isLoading])
    if (isLoading)
        return (<CircularProgress />)
    return (
        <div >
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant='h4'> Recent Posts</Typography>
            </div>
            <div class="py-5">
                <div class="container">

                    <div class="row">
                        {(publist) ?
                            (<>
                                {
                                    dataForDisplay.map(pub =>
                                        <div class="col-md-5">
                                            {/* <div class="card"> */}
                                            <RideCard pub={pub} />

                                            {/* </div> */}
                                        </div>)
                                }
                            </>
                            ) : ('')}


                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Show Less' : 'Show More'}
                </Button>
            </div>

            {/* <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
                <script src="https://pingendo.com/assets/bootstrap/bootstrap-4.0.0-alpha.6.min.js"></script> */}

        </div >
    )
}
