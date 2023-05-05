import axios from 'axios';
import React, { useRef, useState } from 'react'

export default function Landing() {

    const fromRef = useRef(null);
    const destinationRef = useRef(null);

    const [ result, setResult] = useState(null)

    const getInputs = () => {
       
        const from = fromRef.current.value;
        const destination = destinationRef.current.value;
        return { from, destination};
      };


    const search = async () => {
        const { from, destination } = getInputs();
        try{
            const response = await axios.get('publication/')
            console.log(response)
            setResult(response.data)
        }
        
        catch (error){
            console.log(error)
        }
    }
    return (
        <div className="s013" style={{backgroundColor:'#232223'}}>
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
                    <button onClick={search}  className="btn-search" type="button">SEARCH</button>
                </div>
            </form>
            
        </div>
    )
}
