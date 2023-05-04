import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Context from "../../context";
import axios from "axios";
import Loading from "./Loading";

const Header = () => {
  const [ passager, setPassager ] = useState();
  const [ isLoading, setIsloading ] = useState(true);

  const id = localStorage.getItem('id')
  const getUser = async () => {
    try {
      const response = await axios.get('/passager/' + id);
      console.log(response);
      setIsloading(false)
      setPassager(response.data)
      console.log('ppppppp',response.data)

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser()
  }, [isLoading]);
  const history = useHistory();

  const logout = () => {
    const isLogout = window.confirm("Do you want to log out ?");
    if (isLogout) {

      removeAuthedInfo();
      history.push("/login");
    }
  };

  // console.error('aaa')
  const removeAuthedInfo = () => {
    // setUser(null);
    localStorage.removeItem("id");
  };
  console.log('pass',passager)
  if (!isLoading)

    return (
      <div className="header">
        <div className="header__left">
          <span>Uber Clone</span>
          {(passager) ? (
            <div className="header__right">
              {/* <img src={passager.image} alt={passager.email} /> */}
              <span>Hello, {passager.nom} {passager.prenom} </span>
            </div>
          ) : ('')}
        </div>
        <span className="header__logout" onClick={logout}>
          <span>Logout</span>
        </span>
      </div>
    );
  // else 
  // return(<Loading/>)
};

export default Header;
