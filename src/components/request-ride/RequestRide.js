import React, { useContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

// import * as firebaseService from "../../services/firebase";
import * as uiService from "../../services/ui";

import Context from "../../context";
import axios from "axios";
import validator from "validator";

const RequestRide = ({ toggleModal }) => {
  const nbrRef = useRef(null);
  const priceRef = useRef(null);
  const desRef = useRef(null);
  const dateRef = useRef(null);
  const {  selectedFrom, selectedTo, setRideRequest } = useContext(Context);


  const getInputs = () => {
    const nbr = nbrRef.current.value;
    const price = priceRef.current.value;
    const des = desRef.current.value;
    const date = dateRef.current.value;
    return { nbr, price, des, date };
  };
  useEffect(() => {
    getInputs()
  }, [])


  const isValid = ({ nbr, price, des, date }) => {

    if (validator.isEmpty(nbr)) {
      uiService.alert("Please input a valide number");
      return false;
    }
    if (validator.isEmpty(price)) {
      uiService.alert("Please input your price");
      return false;
    }

  }
  const requestRide = async () => {
    try {

      const { nbr, price, des, date } = getInputs();
      // if (
      //   isValid({ nbr, price, des, date })
      // ) {
        console.log('df',selectedFrom)
        const id= JSON.parse(localStorage.getItem('idd'))

        if (id && selectedFrom && selectedTo) {
          toggleModal(false);
          uiService.showLoading();
          const ride = {
            lieuDepart: selectedFrom.label,
            lieuArrive: selectedTo.label,
            nbrePlace: nbr,
            prix: price,
            dateDepart: date,
            description: des
          };
          console.log('dfg', ride)


          const response = await axios.post('publication/conducteur/'+id
          ,{
            lieuDepart: selectedFrom.label,
            lieuArrive: selectedTo.label,
            nbrePlace: nbr,
            prix: price,
            dateDepart: date,
            description: des
          }
          );
          console.log(response);
          uiService.hideLoading()
        }
      // }
    } catch (error) {
      console.error(error);
      uiService.hideLoading()
    }
  }



  return (
    <div className="request-ride">
      <div className="request-ride__content">
        <div className="request-ride__container">
          <div className="request-ride__title" onClick={() => toggleModal(false)}>Adding a Trip</div>
          <div className="request-ride__close">
            <img
              alt="close"
              onClick={() => toggleModal(false)}
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
            />
          </div>
        </div>
        <div className="request-ride__subtitle"></div>
        <div className="request-ride__form">
          <input type="text" placeholder="Number of seats" ref={nbrRef} />
          <input type="text" placeholder="Price" ref={priceRef} />
          <input type="datetime-local" placeholder="Whene?" ref={dateRef} />
          <textarea
            className="signup__about"
            placeholder="Description"
            ref={desRef}
          ></textarea>
          <button
            className="request-ride__btn request-ride__change-btn"
            onClick={() => toggleModal(false)}
          >
            Change
          </button>
          <button className="request-ride__btn" onClick={requestRide}>
            publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestRide;
