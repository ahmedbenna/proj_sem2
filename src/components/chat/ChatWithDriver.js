import React, { useContext, useEffect, useState } from "react";
import { CometChatMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";

import Context from "../../context";

import { CometChat } from '@cometchat-pro/chat';

import { useLocation } from 'react-router-dom'


const ChatWithDriver = () => {

  const location = useLocation()
  const [pass, setPass] = useState(null)
  const [driver, setDriver] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
  const uid = String(JSON.parse(localStorage.getItem('idp'))) + 'p'


  useEffect(() => {
    console.log(location)
    setDriver(location.state.driver)
    CometChat.login(uid, authKey).then(
      user => {
        console.log("User logged in successfully", { user });
        setLoading(false)
        // window.location.replace("/")
      },
      error => {
        // setErr(true)
        console.log("Login ailed", { error });
      }
    )
  }, [location.state, isLoading])
  if (!isLoading)

    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <CometChatMessages chatWithUser={String(driver.id) + 'd'} />
      </div>
    );
};

export default ChatWithDriver;
