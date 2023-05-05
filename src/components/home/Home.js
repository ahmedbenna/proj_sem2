import React, { useEffect, useRef, useContext, useCallback } from "react";
import L from "leaflet";

import AddressPicker from "../address-picker/AddressPicker";
import HeaderPassenger from "../common/HeaderPassenger";
import RideDetail from "../ride-detail/RideDetail";
import RideList from "../ride-list/RideList";

import Context from "../../context";
import HeaderDriver from "../common/HeaderDriver";
import HeaderGuest from "../common/HeaderGuest";

require("leaflet-routing-machine");

const Home = () => {
  const map = useRef();
  const routeControl = useRef();

  const { selectedFrom, selectedTo, user, currentRide } = useContext(Context);
  // console.log('aaaa',passager)
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

  const renderSidebar = () => {
    const isPassenger = JSON.parse(localStorage.getItem('idp'));
    const isDriver = JSON.parse(localStorage.getItem('idd'));
    if (isDriver) {
      return <AddressPicker />;
    }
    // if (isPassenger && currentRide) {
    //   return (
    //     <RideDetail
    //       user={currentRide.driver}
    //       isDriver={false}
    //       currentRide={currentRide}
    //     />
    //   );
    // }
    // if (!isPassenger && !currentRide) {
    //   return <RideList />;
    // }
    // if (!isPassenger && currentRide) {
    //   return (
    //     <RideDetail
    //       user={currentRide.requestor}
    //       isDriver={true}
    //       currentRide={currentRide}
    //     />
    //   );
    // }
    return <></>;
  };

  // const renderHeader = () => {
  //   const isPassenger = JSON.parse(localStorage.getItem('idp'));
  //   const isDriver = JSON.parse(localStorage.getItem('idd'));
  //   if (isPassenger) {
  //     return <HeaderPassenger />;
  //   }
  //   else
  //   if (isDriver) {
  //     return (
  //       <HeaderDriver />
  //     );
  //   }else{
  //     <HeaderGuest/>
  //   }
  //   return <></>;
  // };


  return (
    <>
      {/* {(isPassenger)?( <HeaderPassenger />):(isDriver)?(<HeaderDriver/>):('')} */}
      {/* {renderHeader()} */}
      <div id="map" style={style} />
      {renderSidebar()}
    </>
  );
};

export default Home;
