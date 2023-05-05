import React, { useEffect, useRef, useState } from 'react'
import SearchCard from './SearchCard';
import axios from 'axios';

export default function Search() {

  const [result, setResult] = useState(null)
  
  const fromRef = useRef(null);
  const destinationRef = useRef(null);

  const getInputs = () => {
       
    const from = fromRef.current.value;
    const destination = destinationRef.current.value;
    return { from, destination};
  };


  const search = async () => {
    const { from, destination } = getInputs();
    try {
      const response = await axios.get('publication/')
      console.log(response)
      setResult(response.data)
    }

    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

  }, [])
  return (
    <div>
      <form>
        <fieldset>
          <legend>QUICK FIND YOUR TRIP</legend>
        </fieldset>
        <div className="inner-form">
          <div className="left">
            <div className="input-wrap first">
              <div className="input-field first">
                <label>From</label>
                <input type="text" ref={fromRef} placeholder="ex: Tunis, Souse, Djerba" />
              </div>
            </div>
            <div className="input-wrap second">
              <div className="input-field second">
                <label>Destination</label>
                <input type="text" ref={destinationRef} />
              </div>
            </div>
          </div>
          <button onClick={search} className="btn-search" type="button">SEARCH</button>
        </div>
      </form>
      <div className="visit-country">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="items">
                {(result) ? (<SearchCard pub={null} />
                ) : (
                  <h3>
                    NO Result
                  </h3>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
