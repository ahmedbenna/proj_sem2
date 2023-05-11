import React from 'react'
import AddressPicker from '../../address-picker/AddressPicker'
import { useRef } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import L from "leaflet";
import { useCallback } from 'react';
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Button } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export default function EditRide(props) {


    const location = useLocation()

    const id = JSON.parse(localStorage.getItem('idd'))
    const map = useRef();
    const routeControl = useRef();
    const [from, setFrom] = useState()
    const [yf, setYf] = useState()
    const [xf, setXf] = useState()
    const [destination, setDestination] = useState()
    const [xd, setXd] = useState()
    const [yd, setYd] = useState()
    const [isLoading, setIsLoading] = useState(false);

    const [isFrom, setIsFrom] = useState(true);
    const [price, setPrice] = useState(null);
    const [seat, setSeat] = useState(null);
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const provider = useRef();
    const searchRef = useRef();
    // const { from, destination, user, currentRide } = useContext(Context);
    // console.log('aaaa',passager)
    const style = {
        marginTop: "50px",
        width: "100%",
        height: "100vh",
    };

    const getPub = ()=>{
        console.log('location',location)

        setFrom(props.pub.lieuDepart)
        setXf(props.pub.xd)
        setYf(props.pub.yd)
        setDestination(props.pub.lieuArrive)
        setXd(props.pub.xa)
        setYd(props.pub.xa)
        setPrice(props.pub.prix)
        setSeat(props.pub.nbrePlace)
        setDate(props.pub.dateDepart)
        setDescription(props.pub.description)
    }

    useEffect(() => {
        getPub()
        initMap();
        initRouteControl();
        initProvider();
    }, []);




    const drawRoute = useCallback((from, to) => {
        if (shouldDrawRoute(from, to) && routeControl && routeControl.current) {
            const fromLatLng = new L.LatLng(from.y, from.x);
            const toLatLng = new L.LatLng(to.y, to.x);
            routeControl.current.setWaypoints([fromLatLng, toLatLng]);
        }
    }, []);

    useEffect(() => {
        if (shouldDrawRoute(from, destination)) {
            drawRoute(from, destination);
        }
    }, [from, destination, drawRoute]);

    const shouldDrawRoute = (from, destination) => {
        return (
            from?.label &&
            destination?.label &&
            from?.x &&
            destination?.x &&
            from?.y &&
            destination?.y
        );
    };

    const initMap = () => {
        map.current = L.map("map", {
            center: [36.900791, 10.178942],
            zoom: 13,
            layers: [
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en", {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                }),
            ],
        });
    };

    const initRouteControl = () => {
        routeControl.current = L.Routing.control({
            show: true,
            fitSelectedRoutes: true,
            plan: false,
            lineOptions: {
                styles: [
                    {
                        color: "blue",
                        opacity: "0.7",
                        weight: 6,
                    },
                ],
            },
            router: L.Routing.mapbox('pk.eyJ1IjoiOWE3dDYiLCJhIjoiY2xiZWF1MWdlMDluOTNvcGF6Zmx3bng2ayJ9.8bB7_aVExETntLYL9F0fOA'),
        })
            .addTo(map.current)
            .getPlan();
    };





    //_______________________________



    const onInputChanged = (e) => {
        const input = e.target.value;
        provider.current.search({ query: input }).then((results) => {
            setSearchResults(() => results);
        });
    };

    const initProvider = () => {
        provider.current = new OpenStreetMapProvider({
            params: {
                "accept-language": "en",
                countrycodes: "tn",
            },
        });
    };

    const onLocationSelected = (selectedLocation) => {
        if (selectedLocation?.label && selectedLocation?.x && selectedLocation?.y) {
            if (isFrom) {
                setFrom(() => selectedLocation);
                setIsFrom(() => false);
            } else {
                setDestination(() => selectedLocation);
                setIsFrom(() => true);
            }
            setSearchResults(() => []);
            searchRef.current.value = "";
        }
    };

    const addRide = async () => {
        setIsLoading(true)
        try {
            const response = await axios.put('publication/' + props.id
                , {
                    lieuDepart: from.label,
                    xd:from.x,
                    yd:from.y,
                    lieuArrive: destination.label,
                    xa:destination.x,
                    ya:destination.y,
                    nbrePlace: seat,
                    prix: price,
                    dateDepart: date,
                    description: description
                }
            );
            setIsLoading(false)
            window.location='/driverProfile'

            console.log(response);
        } catch (error) {
            console.error("add", error)
        }

    }
    console.log('result', from)
    return (
        <div>
            <div id="map" style={style} />
            {/* <AddressPicker /> */}
            <div className="address">
                <div className="address__title" >
                    <div >
                        <h3 style={{ textAlign: 'center' }}>Add Ride</h3>

                    </div>
                    <div className="address__title-container">

                        <p className="address__title-from" onClick={() => setIsFrom(true)}>
                            {from && from.label
                                ? from.label
                                : "Pickup location ?"}
                        </p>
                        <p className="address__title-to" onClick={() => setIsFrom(false)}>
                            {destination && destination.label
                                ? destination.label
                                : "Destination ?"}
                        </p>
                    </div>
                </div>
                <div className="search">
                    <input
                        className="search__input"
                        type="text"
                        placeholder={
                            isFrom ? "Add a pickup location" : "Enter your destination"
                        }
                        onChange={onInputChanged}
                        ref={searchRef}
                    />
                    <div className="search__result">
                        {searchResults &&
                            searchResults.length !== 0 &&
                            searchResults.map((result, index) => (
                                <div
                                    className="search__result-item"
                                    key={index}
                                    onClick={() => onLocationSelected(result)}
                                >
                                    <div className="search__result-icon">
                                        <svg
                                            title="LocationMarkerFilled"
                                            viewBox="0 0 24 24"
                                            className="g2 ec db"
                                        >
                                            <g transform="matrix( 1 0 0 1 2.524993896484375 1.0250244140625 )">
                                                <path
                                                    fillRule="nonzero"
                                                    clipRule="nonzero"
                                                    d="M16.175 2.775C12.475 -0.925 6.475 -0.925 2.775 2.775C-0.925 6.475 -0.925 12.575 2.775 16.275L9.475 22.975L16.175 16.175C19.875 12.575 19.875 6.475 16.175 2.775ZM9.475 11.475C8.375 11.475 7.475 10.575 7.475 9.475C7.475 8.375 8.375 7.475 9.475 7.475C10.575 7.475 11.475 8.375 11.475 9.475C11.475 10.575 10.575 11.475 9.475 11.475Z"
                                                    opacity="1"
                                                ></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <p className="search__result-label">{result.label}</p>
                                </div>
                            ))}
                    </div>
                    {/* <input
          className="search__input"
          type="text"

        // onChange={onInputChanged}
        // ref={searchRef}

        /> */}
                    <input className="search__input"
                        type="text" placeholder="Number of seats" value={seat} onChange={e => setSeat(e.currentTarget.value)} />
                    <input className="search__input"
                        type="text" placeholder="Price" value={price} onChange={e => setPrice(e.currentTarget.value)} />
                    <input className="search__input"
                        type="datetime-local" placeholder="Whene?" value={date} onChange={e => setDate(e.currentTarget.value)} />
                    <textarea
                        className="signup__about"
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.currentTarget.value)}
                    ></textarea>

                    {(isLoading == false) ? (
                        <Button variant='contained' onClick={addRide} > Add </Button>

                    ) : (
                        <>loading</>
                    )}



                </div>
            </div>
        </div>
    )
}
