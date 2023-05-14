import React, { useEffect } from 'react'
import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import { CometChat } from '@cometchat-pro/chat';

export default function ChatForPassenger() {
    const [isLoading, setLoading] = React.useState(true);

    useEffect(() => {
        

        const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
        const uid = String(JSON.parse(localStorage.getItem('idp'))) + 'p'
        console.log('uid',uid)

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
    }, [])
    if (!isLoading)
        return (
            <div id="row" style={{ height: "100vh", width: "100vw", display: "flex", overflow: "hidden" }}>
                <CometChatUI />
            </div >
        )
}
