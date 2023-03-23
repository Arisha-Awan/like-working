import React, {useContext, useEffect} from 'react';
import { ethers } from 'ethers';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Registration from './components/Registration';
import Home from './components/Home';
import Login from './components/Login';
import Post from './components/Post';
import Create from './components/Create';
import { Route, Routes } from 'react-router-dom';
import {InscribleContext} from './context/Context';


function App() {

  const {CreateContract} = useContext(InscribleContext);

  useEffect(() => {
    const prov = new ethers.providers.Web3Provider(window.ethereum);
    CreateContract(prov);
    // getAllImages(contract);
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