import React, { useEffect, useRef, useContext, useState } from "react";
import validator from "validator";
import { useHistory } from "react-router-dom";

import withModal from "../common/Modal";
import SignUp from "../register/SignUp";

import Context from "../../context";

// import * as cometChatService from "../../services/cometchat";
// import * as firebaseService from "../../services/firebase";
import * as uiService from "../../services/ui";
import axios from "axios";

const Login = ({ toggleModal }) => {
  // const { passager, setPassager } = useContext(Context);

  const [passager, setPassager] = useState()

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const history = useHistory();

  useEffect(() => {
  //   // const authedUser = null
    const authedUser = JSON.parse(localStorage.getItem("idp"));
    // console.log('auth',authedUser)
    if (authedUser) 
      history.push("/");
  //     console.log('444')

  //   } else {
  //     setPassager(null);

  //   }
  }, []);

  // console.log('444')
  const login = async () => {
    try {
      uiService.showLoading();
      const { email, password } = getInputs();
      setPassager({
        email: email,
        password: password
      })
      if (isUserCredentialsValid(email, password)) {
        const response = await axios.post('passager/auth', {
          email: email,
          password: password
        });
        console.log('dfgdfghdfg',response);
        saveAuthedInfo(response.data);
        uiService.hideLoading();
        history.push("/");
      } else {
        uiService.hideLoading();
        uiService.alert(`Your passager's name or password is not correct`);
      }
    } catch (error) {
      uiService.hideLoading();
    }
  };

  const getInputs = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    return { email, password };
  };

  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  const saveAuthedInfo = (passager) => {
    // setPassager(passager);
    localStorage.setItem("idp", JSON.stringify(passager.id));
  };

  return (
    <div className="login__container">
      <div className="login__welcome">
        {/* <p>
          Build{" "}
          <span style={{ color: "#000000", fontWeight: "bold" }}>
            Uber Clone
          </span>{" "}
          with React
        </p> */}
      </div>
      <div className="login__form-container">
        <div className="login__form">
          <input
            type="text"
            placeholder="Email or phone number"
            ref={emailRef}
          />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <button className="login__submit-btn" onClick={login}>
            Login
          </button>
          <span className="login__forgot-password">Forgot password?</span>
          <span className="login__signup" onClick={() => toggleModal(true)}>
            Create New Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default withModal(SignUp)(Login);
