import React, {useContext, useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { ethers } from 'ethers';
import {  Post, Create, Registration, Login } from './components';
import { Route, Routes } from 'react-router-dom';
import {InscribleContext} from './context/Context';
import './App.css';

function App() {

  const {CreateContract} = useContext(InscribleContext);

  useEffect(() => {
    const prov = new ethers.providers.Web3Provider(window.ethereum);
    CreateContract(prov);
  },[]);
  return (
    <>
      <Routes>
        <Route path='/' element={<Post/>}></Route>
        <Route path='/Registration' element={<Registration/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/inscrible' element={<Post/>}></Route>
        <Route path='/new-post' element={<Create/>}></Route>
      </Routes>
    </>
  );
}

export default App;