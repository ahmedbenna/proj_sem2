import React, { useState, useRef, useContext } from "react";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import CloseIcon from '@mui/icons-material/Close';
import Context from "../../context";

// import * as cometChatService from "../../services/cometchat";
// import * as firebaseService from "../../services/firebase";
import * as uiService from "../../services/ui";
import { IconButton } from "@mui/material";
import axios from "axios";
import { Phone } from "@mui/icons-material";

const SignUp = ({ toggleModal }) => {
  // const [avatar, setAvatar] = useState(null);

  const aboutRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);
  const filepickerRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const roleRef = useRef(null);

  // const { cometChat } = useContext(Context);

  async function signup() {
    console.log('ddd')

    try {
      const { prenom, nom, email, password, confirmPassword, role, telephone } = getInputs();
      if (
        isSignupValid({
          // about,
          prenom,
          nom,
          email,
          password,
          confirmPassword,
          telephone,
          role,
        })
      ) {
        const id = uuidv4();
        console.log('75285', id)
        const createdAccount = { prenom, nom, email, telephone, password };
        uiService.showLoading();
        if (role == 'passenger') {
          try {
            const response = await axios.post('/passager', {
              prenom: prenom,
              nom: nom,
              email: email,
              telephone: telephone,
              password: password
            });
            console.log(response.data);
          } catch (error) {
            console.error(error)
          }

        } else if (role == 'driver') {
          try {
            const response = await axios.post('/conducteur/add', {
              prenom: prenom,
              nom: nom,
              email: email,
              telephone: telephone,
              password: password
            });
            console.log(response);
          } catch (error) {
            console.error(error)
          }

        }
        uiService.hideLoading();
        uiService.alert(
          `${email} was created successfully! Please sign in with your created account`
        );
        toggleModal(false);
      }
    } catch (error) {
      console.error("dfg");

      // uiService.hideLoading();
    }
  };

  const onAvatarUploaded = async (entity, url) => {
    // entity.image = url;
    // await firebaseService.insert({
    //   key: "users",
    //   id: entity.id,
    //   payload: entity,
    // });
    // await cometChatService.createAccount({
    //   cometChat,
    //   id: entity.id,
    //   fullname: entity.fullname,
    //   avatar: url,
    // });
  };

  const getInputs = () => {
    // const about = aboutRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const email = emailRef.current.value;
    const prenom = firstNameRef.current.value;
    const nom = lastNameRef.current.value;
    const password = passwordRef.current.value;
    const telephone = phoneRef.current.value;
    const role = roleRef.current.value;
    return { nom, prenom, email, password, confirmPassword, role, telephone };
  };

  const isSignupValid = ({
    // about,
    confirmPassword,
    email,
    prenom,
    nom,
    password,
    telephone,
    role,
  }) => {
    // if (!avatar) {
    //   uiService.alert("Please upload your avatar");
    //   return false;
    // }
    if (validator.isEmpty(prenom)) {
      uiService.alert("Please input your fullname");
      return false;
    }
    if (validator.isEmpty(nom)) {
      uiService.alert("Please input your fullname");
      return false;
    }
    if (!validator.isEmail(email)) {
      uiService.alert("Please input your email");
      return false;
    }
    if (!validator.isMobilePhone(telephone, ["ar-TN"])) {
      alert("Please input your phone number");
      return false;
    }
    if (validator.isEmpty(role)) {
      alert("Please input your role");
      return false;
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 6 })
    ) {
      uiService.alert(
        "Please input your password. You password must have at least 6 characters"
      );
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      uiService.alert("Please input your confirm password");
      return false;
    }
    if (password !== confirmPassword) {
      uiService.alert("Confirm password and password must be the same");
      return false;
    }
    // if (validator.isEmpty(about)) {
    //   uiService.alert("Please input your description");
    //   return false;
    // }
    return true;
  };

  // const uploadAvatar = (e) => {
  //   const reader = new FileReader();
  //   if (e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  //   reader.onload = (readerEvent) => {
  //     setAvatar(readerEvent.target.result);
  //   };
  // };

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__container">
          <div className="signup__title">Sign Up</div>
          <div className="signup__close">
            <IconButton aria-label="Close" onClick={() => toggleModal(false)}>
              <CloseIcon />
            </IconButton>

          </div>
        </div>
        <div className="signup__subtitle"></div>
        <div className="signup__form">
          {/* {avatar && (
            <div
              className="signup__user-avatar"
              onClick={() => filepickerRef.current.click()}
            >
              <img src={avatar} alt="avatar" />
            </div>
          )}
          {!avatar && (
            <div
              onClick={() => filepickerRef.current.click()}
              className="signup__upload-container"
            >
              Choose File
            </div>
          )}
          <input
            className="signup__upload-avatar"
            hidden
            onChange={uploadAvatar}
            ref={filepickerRef}
            type="file"
          /> */}
          <input type="text" placeholder="FirstName" ref={firstNameRef} />
          <input type="text" placeholder="LastName" ref={lastNameRef} />
          <input type="text" placeholder="Email" ref={emailRef} />
          <input type="text" placeholder="Phone" ref={phoneRef} />
          <select ref={roleRef} defaultValue="passenger">
            <option value="passenger">Passenger</option>
            <option value="driver">Driver</option>
          </select>
          <input type="password" placeholder="Password" ref={passwordRef} />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
          {/* <textarea
            className="signup__about"
            placeholder="Describe yourself here..."
            ref={aboutRef}
          ></textarea> */}
          <button className="signup__btn" onClick={signup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
