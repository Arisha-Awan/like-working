import React from "react";

//INTERNAL IMPORT
import"./Error.css";

const Error = ({ error }) => {
  return (
    <div className="Error">
      <div className="Error_box">
        <h1>Please Fix This Error & Reload Browser</h1>
        {error}
      </div>
    </div>
  );
};

export default Error;
