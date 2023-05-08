import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Context from "../../context";
import axios from "axios";
import Loading from "./Loading";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom";

const HeaderPassenger = () => {
  const [passager, setPassager] = useState();
  const [isLoading, setIsloading] = useState(true);

  const id = JSON.parse(localStorage.getItem('idp'))



  const getUser = async () => {
    try {
      const response = await axios.get('/passager/' + id.id);
      console.log(response);
      setPassager(response.data)
      setIsloading(false)

      console.log('ppppppp', response.data)

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/passager/' + id);
        console.log(response);
        setPassager(response.data)
        setIsloading(false)

        console.log('ppppppp', response.data)
  
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [isLoading]);


  const history = useHistory();

  const logout = () => {
    // const isLogout = window.confirm("Do you want to log out ?");
    // if (isLogout) {

      removeAuthedInfo();
      window.location = '/'
      // }
  };

  // console.error('aaa')
  const removeAuthedInfo = () => {
    // setUser(null);
    localStorage.removeItem("idp");
  };
  console.log('pass', passager)
  if (isLoading) {

    return <div className="App"><CircularProgress /></div>;
}

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
  
        <a className="navbar-brand" href="#">Covoi</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
            <br/>
            <li className="nav-item">
              <a className="nav-link" href="#"><AccountCircleIcon/>  {passager.prenom} {passager.nom} </a>
            </li>
            <li className="nav-item">
              <Button color="secondary"  className="nav-link" onClick={logout}><LogoutIcon/> LOGOUT </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    // <div className="header">
    //   <div className="header__left">
    //     <span>Uber Clone</span>
    //     {(passager) ? (
    //       <div className="header__right">
    //         {/* <img src={passager.image} alt={passager.email} /> */}
    //         <span>Hello, {passager.nom} {passager.prenom} </span>
    //       </div>
    //     ) : ('')}
    //   </div>
    //   <span className="header__logout" onClick={logout}>
    //     <span>Logout</span>
    //   </span>
    // </div>
  );
  // else 
  // return(<Loading/>)
};

export default HeaderPassenger;
