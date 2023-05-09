import React, { useCallback, useEffect, useRef, useState } from 'react'

import L from "leaflet";

require("leaflet-routing-machine");

export default function SearchCard() {


    const map = useRef();
    const routeControl = useRef();

    const [selectedFrom, setSelectedFrom] = useState()
    const [selectedTo, setSelectedTo] = useState()

    useEffect(() => {

    }, [])

    const style = {
        marginTop: "50px",
        width: "100%",
        height: "100vh",
    };

    useEffect(() => {
        initMap();
        initRouteControl();
      }, []);
    
      const drawRoute = useCallback((from, to) => {
        if (shouldDrawRoute(from, to) && routeControl && routeControl.current) {
          const fromLatLng = new L.LatLng(from.y, from.x);
          const toLatLng = new L.LatLng(to.y, to.x);
          routeControl.current.setWaypoints([fromLatLng, toLatLng]);
        }
      }, []);

    useEffect(() => {
        if (shouldDrawRoute(selectedFrom, selectedTo)) {
            drawRoute(selectedFrom, selectedTo);
        }
    }, [selectedFrom, selectedTo, drawRoute]);
    const shouldDrawRoute = (selectedFrom, selectedTo) => {
        return (
            selectedFrom?.label &&
            selectedTo?.label &&
            selectedFrom?.x &&
            selectedTo?.x &&
            selectedFrom?.y &&
            selectedTo?.y
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
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="item">
                    <div className="row">
                        <div className="col-lg-4 col-sm-5">
                            <div className="image">
                                <div id="map" style={style} />
                            </div>
                            <div className="col-lg-8 col-sm-7">
                                <div className="right-content">
                                    <ul className="info">
                                        <li><i className="fa fa-location"></i> From</li>
                                        <li> Destination</li>
                                        <li> Price</li>
                                    </ul>
                                    {/* <span>Europe</span> */}
                                    {/* <div className="main-button">
                              <a href="about.html">Explore More</a>
                            </div> */}
                                    {/* <p>Woox Travel is a professional Bootstrap 5 theme HTML CSS layout for your website. You can use this layout for your commercial work.</p> */}
                                    <ul className="info">
                                        <li><i className="fa fa-user"></i> name</li>
                                        <li> Email</li>
                                        <li> Phone</li>
                                        <li> Description</li>

                                    </ul>
                                    <div className="text-button">
                                        <a href="about.html">Reserve <i className="fa fa-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
