import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import Loading from "./components/common/Loading";
import LoginPassenger from "./components/login/LoginPassenger";
import PrivateRoute from "./components/common/PrivateRoute";

// import * as firebaseService from "./services/firebase";
import * as uiService from "./services/ui";

import Context from "./context";

import "./index.css";
import Landing from "./components/landing/Landing";
import LoginDriver from "./components/login/LoginDriver";
import Search from "./components/home/Search";
import SignUpDriver from "./components/register/SignUpDriver";
import SignUpPassenger from "./components/register/SignUpPassenger";
import ProfilePasssenger from "./components/passenger/ProfilePasssenger";
import EditPassengerProfile from "./components/passenger/EditPassengerProfile";
import AddRide from "./components/common/driver/AddRide";
import DriverProfile from "./components/common/driver/DriverProfile";
import EditProfileDriver from "./components/common/driver/EditProfileDriver";
import EditRide from "./components/common/driver/EditRide";
import RideMap from "./components/common/RideMap";
import Footer from "./components/common/Footer/Footer";
import Landing2 from "./components/landing/Landing2";
import Header from "./components/Header/Header";
import { CometChat } from "@cometchat-pro/chat";
import ChatWithDriver from "./components/chat/ChatWithDriver";
import ChatForPassenger from "./components/chat/ChatForPassenger";
import ChatForDriver from "./components/chat/ChatForDriver";



function App() {
  const [user, setUser] = useState(null);
  // const [cometChat, setCometChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTo, setSelectedTo] = useState(null);
  const [rideRequest, setRideRequest] = useState(null);
  const [currentRide, setCurrentRide] = useState(null);

  const fbCreatedRideRef = useRef();
  const fbCurrentRideRef = useRef();
  const lookingDriverTimeout = useRef();

  const lookingDriverMaxTime = 30000;

  useEffect(() => {
    const appID = process.env.REACT_APP_COMETCHAT_APP_ID;
    const region = process.env.REACT_APP_COMETCHAT_REGION;
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion
      (region).build();

    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed sucessfully");
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
        console.log("Initialization failed with error:", error);
      }
    )
  }, [])
  if (!isLoading)

    return (
      // <Context.Provider value={context}>
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing2} />

            {/* <Route exact path="/" component={Landing} /> */}
            <Route exact path="/search" component={Search} />

            <PrivateRoute exact path="/Home" component={Home} />

            <Route exact path="/chatWithDriver">
              <ChatWithDriver />
            </Route>

            <Route exact path="/loginPaasenger">
              <LoginPassenger />
            </Route>
            <Route exact path="/chatForPassenger">
              <ChatForPassenger />
            </Route>
            <Route exact path="/chatFroDriver">
              <ChatForDriver />
            </Route>
            <Route exact path="/loginDriver">
              <LoginDriver />
            </Route>
            {/* <Route exact path="/passengerProfile ">
            <PassengerProfile />
          </Route> */}
            {/* <Route exact path="/driverProfile ">
            <DriverProfile />
          </Route> */}
            <Route exact path="/signUpDriver">
              <SignUpDriver />
            </Route>
            <Route exact path="/signUpPassenger">
              <SignUpPassenger />
            </Route>
            <Route exact path="/editPassengerProfile">
              <EditPassengerProfile />
            </Route>
            <Route exact path="/editProfileDriver">
              <EditProfileDriver />
            </Route>
            <Route exact path="/driverProfile">
              <DriverProfile />
            </Route>
            <Route exact path="/addRide">
              <AddRide />
            </Route>
            <Route exact path="/editRide">
              <EditRide />
            </Route>


            <Route exact path="/profilePasssenger">
              <ProfilePasssenger />
            </Route>
            {/* <Route path='/profilePasssenger' element={<ProfilePasssenger />} /> */}

            <Route exact path="*">
            <Redirect to="/" />
          </Route>
          </Switch>
          <Footer />
          {/* <DriverProfile /> */}
          {/* <RideMap/> */}
        </Router>
        <Loading />
      </>

      // </Context.Provider>
    );
}

export default App;
