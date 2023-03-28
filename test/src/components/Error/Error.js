import React from 'react';
// import { InscribleContext } from '../../context/Context';
import './Error.css';

const Error = (props) => {

    //const {errorMessage, errorTitle} = useContext(InscribleContext);
    const removeError = ()=>{
        const err = document.getElementsByClassName('main-alert-box');
        const errdis = err[0];
        errdis.style.display = 'none';
    }

    return (

        <div class="main-alert-box">
            <div class="icon-of-success">
                <span class="cbk-display">X</span>
            </div>
            <span class="alert-title">
                <h2>{props.errorTitle}</h2>
            </span>
            <span class="alert-message">
                <p>{props.errorMessage}</p>
            </span>
            <button class="btn btn-outline-danger ok-btn" onClick={removeError}>
                Ok
            </button>
        </div>
    );
}

export default Error;
