import React from 'react'
import L from "leaflet";
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { OpenStreetMapProvider } from "leaflet-geosearch";

export default function RideMap(props) {

    const id = JSON.parse(localStorage.getItem('idd'))
    const map = useRef();

    const provider = useRef();
    const routeControl = useRef();
    const [from, setFrom] = useState()
    const [destination, setDestination] = useState()
    // const searchRef = useRef();

    // const [isFrom, setIsFrom] = useState(true);
    // const [searchResults, setSearchResults] = useState(null);

    const style = {
        marginTop: "50px",
        width: "100%",
        height: "100vh",
    };

    useEffect(() => {
        setDestination(props.destination)
        setFrom(props.from)
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



    // const onInputChanged = (e) => {
    //     const input = e.target.value;
    //     provider.current.search({ query: input }).then((results) => {
    //         setSearchResults(() => results);
    //     });
    // };

    const initProvider = () => {
        provider.current = new OpenStreetMapProvider({
            params: {
                "accept-language": "en",
                countrycodes: "tn",
            },
        });
    };

    // const onLocationSelected = (selectedLocation) => {
    //     if (selectedLocation?.label && selectedLocation?.x && selectedLocation?.y) {
    //         if (isFrom) {
    //             setFrom(() => selectedLocation);
    //             setIsFrom(() => false);
    //         } else {
    //             setDestination(() => selectedLocation);
    //             setIsFrom(() => true);
    //         }
    //         setSearchResults(() => []);
    //         searchRef.current.value = "";
    //     }
    // };

  return (
    <div>
        <div  id="map" style={style} />
    </div>
  )
}
