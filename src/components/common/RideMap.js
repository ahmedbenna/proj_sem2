import React, { useEffect, useRef, useState } from 'react'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import marker from './marker.png'



export default function RideMap(props) {

    useEffect(() => {
        var container = L.DomUtil.get("map");

        if (container != null) {
            container._leaflet_id = null;
        }
        var map = L.map("map").setView([36.900791, 10.178942], 8);
        L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
            {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: "mapbox/outdoors-v12",
                tileSize: 512,
                zoomOffset: -1,
                accessToken:
                    "pk.eyJ1IjoiOWE3dDYiLCJhIjoiY2xiZWF1MWdlMDluOTNvcGF6Zmx3bng2ayJ9.8bB7_aVExETntLYL9F0fOA",
            }
        ).addTo(map);


        const carIcon = new L.Icon({
            iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
            iconRetinaUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
            iconSize: [60, 55],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76],
        })
        // L.marker([51.5, -0.09], {icon: carIcon}).addTo(map);

        if (props.pub) {
            L.Routing.control({
                // marker : carIcon,
                // icon: carIcon,
                waypoints: [
                    L.latLng(props.pub.yd, props.pub.xd),
                    L.latLng(props.pub.ya, props.pub.xa)
                ],
                routeWhileDragging: true,
                lineOptions: {
                    styles: [
                        {
                            color: "blue",
                            opacity: "0.7",
                            weight: 6,
                        },
                    ],
                },
                // carIcon
            }).addTo(map);
        }


        // L.Marker.prototype.options.icon = DefaultIcon;
        // var marker = L.marker([51.5, -0.09]).addTo(map);
        // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    }, [props.pub]);
    return <div id="map" style={{ height: "500px", width: '100%' }}></div>;
}
