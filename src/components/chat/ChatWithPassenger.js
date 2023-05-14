import React, { useContext, useState } from "react";
import { CometChatMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";

import Context from "../../context";

import { CometChat } from '@cometchat-pro/chat';
import { useLocation } from 'react-router-dom'



const ChatWithPassneger = (props) => {
    const location = useLocation()
    const [pass, setPass] = useState(null)
     
    console.log(location.state)
  

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CometChatMessages chatWithUser={String(props.id)+'p'} />
    </div>
  );
};

export default ChatWithPassneger;
