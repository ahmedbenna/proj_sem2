import axios from 'axios';
import React, { useRef, useState } from 'react'

import "./css/main.css"
// import landingimg from "./images/carSharing"
import { Link } from 'react-router-dom';
import RidsList from './RidsList';
// import './assets/css/templatemo-woox-travel.css';
// import './assets/css/owl.css';
// import './assets/css/animate.css';

// require( "./assets/js/isotope.min.js")
// require("./assets/js/tabs.js")
// require( "./assets/js/owl-carousel.js")
// require( "./assets/js/wow.js")
// require( "./assets/js/popup.js")
// require( "./assets/js/custom.js")


// require( "./vendor/jquery/jquery.min.js")
// require( "./vendor/bootstrap/js/bootstrap.min.js")


{/* <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.min.js"></script> */}


export default function Landing() {

    const fromRef = useRef(null);
    const destinationRef = useRef(null);

    const [result, setResult] = useState(null)
    const [from, setFrom] = useState("")
    const [destination, setDestination] = useState("")

    // setFrom(fromRef.current.value)
    // setDestination(destinationRef.current.value)

    const getInputs = () => {

        const from = fromRef.current.value;
        const destination = destinationRef.current.value;
        setFrom(from)
        setDestination(destination)

        return { from, destination };

    };


    const search = async () => {
        const { from, destination } = getInputs();
        try {
            const response = await axios.get('publication/')
            console.log(response)
            setResult(response.data)
        }

        catch (error) {
            console.log(error)
        }
    }
    return (
        <div>

        
        <div className="s013" >
            <form style={{ marginTop: '250px' }}>
                <fieldset style={{  textShadow: '2px 2px 2px #000000'}}>
                    <div >
                        <legend style={{ color: '#ffffff' }}>QUICK FIND YOUR TRIP</legend>
                    </div>
                </fieldset>
                <div className="inner-form" style={{ padding: '10px', backgroundColor: '#232223' }}>
                    <div className="left" >
                        <div className="input-wrap first">
                            <div className="input-field first">
                                <label>From</label>
                                <input type="text" value={from} onChange={e => setFrom(e.currentTarget.value)} placeholder="ex: Tunis, Souse, Djerba" />
                            </div>
                        </div>
                        <div className="input-wrap second">
                            <div className="input-field second">
                                <label>Destination</label>
                                <input type="text" value={destination} onChange={e => setDestination(e.currentTarget.value)} />
                            </div>
                        </div>
                    </div>
                    <Link to='/search' state={{ from: from, destination: destination }}>
                        <button className="btn-search" type="button">SEARCH</button>
                    </Link>
                </div>
            </form>

        </div>
        <RidsList/>
        </div>
    )
}
