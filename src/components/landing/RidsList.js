import React, { useEffect, useState } from 'react'
import DemandCard from '../passenger/DemandCard'
import axios from 'axios'
import { Button, CircularProgress, Typography } from '@mui/material'
import RideCard from './RideCard'
import AOS from 'aos';
import 'aos/dist/aos.css';
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
        <>

            <div className="col-lg-3 col-md-6 mt-5 mt-md-0">



                {(publist) ?
                    (<>
                        {
                            dataForDisplay.map(pub =>
                                <div  >
                                    {/* <div class="card"> */}
                                    <RideCard pub={pub} />

                                    {/* </div> */}
                                </div>)
                        }
                    </>
                    ) : ('')}


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
        </>
    )

}
