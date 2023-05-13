import React from "react";
import "./assets/css/style.css"
function heroWave() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="hero-waves"
            preserveAspectRatio="none"
            viewBox="0 24 150 28"
        >
            <defs>
                <path
                    id="wave-path"
                    d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
                ></path>
            </defs>
            <use
                x="50"
                y="3"
                fill="rgba(255,255,255, .1)"
                xlinkHref="#wave-path"
                className="0"
            ></use>
            <use
                x="50"
                fill="rgba(255,255,255, .2)"
                xlinkHref="#wave-path"
                className="0"
            ></use>
            <use x="50" y="9" fill="#fff" xlinkHref="#wave-path" className="0"></use>
        </svg>
    );
}

export default heroWave;
