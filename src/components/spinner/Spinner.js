import React from "react";
import spinnerImg from '../../assets/img/spinner.gif';
function Spinner() {
  return (
    <React.Fragment>
        <img src={spinnerImg} alt="" className="d-block m-auto" style={{width: '80px'}}/>
    </React.Fragment>
  );
}

export default Spinner;
