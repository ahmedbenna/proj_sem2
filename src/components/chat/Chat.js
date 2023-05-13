import React, { useContext } from "react";
import { CometChatMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";

import Context from "../../context";

import { CometChat } from '@cometchat-pro/chat';


const appID = process.env.REACT_APP_COMETCHAT_APP_ID;
const region = process.env.REACT_APP_COMETCHAT_REGION;
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion
  (region).build();

CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed sucessfully");
  },
  error => {
    console.log("Initialization failed with error:", error);
  }
)


const Chat = (props) => {
  const { user, currentRide } = useContext(Context);

  const findUser = () => {
    if (!user || !currentRide) return;
    if (user.role === "passenger" && currentRide?.driver?.id) {
      return currentRide.driver.id;
    } else if (user.role === "driver" && currentRide?.requestor?.id) {
      return currentRide.requestor.id;
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CometChatMessages chatWithUser={findUser()} />
    </div>
  );
};

export default Chat;
