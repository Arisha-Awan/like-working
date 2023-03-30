import React, { useState } from 'react';
import './Model.css';

const Model = ({
 openBox,
 functionName,
 address  
}) => {

  const [name, setName] = useState("");
  // const [userAddress, setUserAddress] = useState("");
  return (
    <div className='main-model-container'>
      <h2>Create Account</h2>
      <div className="name">
      <label htmlFor="username">Enter Name:</label>
      <input 
      type="text" 
      className='input form-control' 
      name='username' 
      placeholder='Your username' 
      onChange={(e)=> setName(e.target.value)}
      required/>
      </div>
      {/* <input type="text" className='input' name='address' value={address} disabled="true"/> */}
      <button className='btn btn-primary' onClick={() => functionName(name)}>Create</button>
      <button className='btn btn-outline-primary' onClick={() => openBox(false)}>Cancle</button>
    </div>
  )
};

export default Model;